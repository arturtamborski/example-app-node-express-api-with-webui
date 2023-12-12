import express, { urlencoded, json } from 'express';

import path from 'path';
import favicon from 'serve-favicon';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { connect } from 'mongoose';

import { listUserUI, editUserUI } from './app/controllers/user.controller.js';
import { listTaskUI, editTaskUI } from './app/controllers/task.controller.js';
import v1UserRouter from './app/routes/user.routes.js';
import v1TaskRouter from './app/routes/task.routes.js';

// helpers
const filename = fileURLToPath(import.meta.url);
const dirname = dirname(filename);

const app = express();
app.use(favicon(path.join(dirname, 'app', 'public', 'img', 'favicon.ico')));
app.use(express.static(dirname + '/app/public'));
app.use(urlencoded({ extended: true }));
app.use(json());

// settings for Ejs
app.set('views', path.join(`${dirname}/app/views`));
app.set('view engine', 'ejs');

// Connecting to the database
connect(process.env.DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

app.use("/v1/users", v1UserRouter);
app.use("/v1/tasks", v1TaskRouter);

app.get('/users-ui/', listUserUI);
app.get('/users-ui/edit/:userId', editUserUI);
app.get('/tasks-ui/user/:userId', listTaskUI);
app.get('/tasks-ui/edit/:taskId', editTaskUI);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
