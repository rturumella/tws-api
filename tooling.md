# Globally Installed
These tools should be installed using `npm install -g`

* foreman: `nf`
* node-supervisor

# Env Files

Create a `.env` file in the root of the `tws-api` repo. Include the following
variables:

* `NODE_ENV`
* `PG_HOST`
* `PG_DATABASE`
* `PG_USER`
* `PG_PASSWORD`
* `LOG_LEVEL`

These will be accessible from `process.env.$var` inside the node process
