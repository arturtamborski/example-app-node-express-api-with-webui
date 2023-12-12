## example-app-node-express-api-with-webui

It’s a simple nodejs application which serves API and WEB UI on the same port.

It’s built with Express js and MongoDB database, and we’d like to deploy it to ECS, which means we need it to be dockerized.


Your task is to write a Dockerfile for it, starting with simple encapsulation of the app, and ending with whatever you think should be in there to consider it as a well implemented.

Example goals to achieve:

- docker container should support multiplatform runtimes (arm / amd)
- docker container builds in cache-friendly way
- container is optimised for size
- container exposes appropriate ports
- container is built in a golden-image pattern
- container supports graceful shutdown (assume code already supports SIGQUIT appropriately)
- anything else that you think should be a part of well implemented Dockerfile


Above description is intentionally short. We expect questions, discussion and general cooperation, in the same way as in daily work.


Application uses the following environment variables:
- PORT - number on which nodejs should listen for requests
- DB_URL - mongodb connection string with login and password embedded in it
