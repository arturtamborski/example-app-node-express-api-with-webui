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
const __filename = fileURLToPath(import.meta.url);

// hi, if you're reading this - that's a place where the error came from :)
// normally, you'd not see such an obvious comment about some problem
// but we understand that the recruitment process may be stressful
// and we don't want to do this any more difficult for you than it needs to be
// so if you hit this error, it means you're on a correct path!
// the error is a simple typo, i'm sure you'll know what's up...
// const __dirname = dirname(__filenameeeeee);
const __dirname = dirname(__filename);

const app = express();
app.use(favicon(path.join(__dirname, 'app', 'public', 'img', 'favicon.ico')));
app.use(express.static(__dirname + '/app/public'));
app.use(urlencoded({ extended: true }));
app.use(json());

// settings for Ejs
app.set('views', path.join(`${__dirname}/app/views`));
app.set('view engine', 'ejs');

// TODO: bonus point if you actually spent some time reading the source code :)
// this part is intentionally commented out to not cause another set of problems
// the app requires DB connection at startup, but as you may have noticed,
// that's not super conventient for the service startup process (local testing).
// Can you propose a better solution to have this code and not interrupt local testing?

// Connecting to the database
// connect(process.env.DB_URL, {
//   useNewUrlParser: true,
// }).then(() => {
//   console.log('Successfully connected to the database');
// }).catch((err) => {
//   console.log('Could not connect to the database. Exiting now...', err);
//   process.exit();
// });

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
