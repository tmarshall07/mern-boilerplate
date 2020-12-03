# App Boilerplate
This is a boilerplate project that uses the following stack:
- `MongoDB` - database (along with `mongoose`)
- `Expressjs` - handles the backend and server
- `AdminBro` - admin panel located at `/admin`
- `React` - bootstrapped with `create-react-app`
- `Typescript`
- `Rebass` - super low-level front end framework for styles

## Getting started
Install dependencies in the root as well as the client:
```
yarn
cd client
yarn
```

Then to start the server (in root)
```
node server
```

And in a separate terminal, start the client
```
cd client
yarn start
```
The client will be available at `localhost:3000`, and is proxying the server at `localhost:8080`.

### Database
Change `DATABASE_NAME` in `/services/mongo.js` to your database name, and the `MONGO_ATLAS_URL` to the correct cluster url.

Locally, you'll want to make sure that your mongodb is up and running, generally you can start it with
```
sudo mongod
```
but depending on your setup you may need to specifically include the path to the db, e.g.
```
sudo mongod --dbpath /usr/local/var/mongodb
```

### `.env`
A `.env` file should be added to the root of the repo, the variables are made available in `server.js`, and should at least include the following:
```
PORT=8080
NODE_ENV=dev

DB_USER={MONGO_DB_USER}
DB_PASSWORD={MONGO_DB_PASSWORD}

SESSION_SECRET={SOME_LONG_HASH}
COOKIE_PASSWORD={SOME_LONG_HASH}
```

### Admin panel
The admin panel cane be accessed at `/admin`. All users have access to the admin panel by default.

### Builds

To build the client
```
cd client
yarn build
```
You can then test the live setup by setting `NODE_ENV` to `production`, starting the server, and going to `http://localhost:{PORT}`
