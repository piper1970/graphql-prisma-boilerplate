## Boilerplate code for setting up graphql-prisma server
This project holds a bare-boned system for deploying a graphql-prisma server.

---

A graphql server offers an alternative to a restful endpoint calls, allowing massive data to be consumed in a single call, instead of making multiple restful calls.

---

### Configurations required

A `config` folder at the root of the project dietory is expected, with the files `dev.env`, `test.env` and `(optional) prod.env`. 
Each files should hold the properties `PRISMA_ENDPONT`, `PRISMA_SECRET`, and `JWT_SECRET`, such as
```
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=yabbadabbadoo
JWT_SECRET=picnicbasket
```
__Note__: this project is optimized to be run using Heroku cloud services.

Before running, the following should be done:
1. Yarn install to install all necessary dependencies
1. Add nessary config settings for dev/test
1. From prisma directory, run `docker-compose up`
    - Assuming you have installed docker.  If not, what are you waiting for?
    - This will set a running local prisma service.
1. Back in the project root directory, run the following:
    - `yarn run get-schema` 
1. Go back to prisma directory and from run the following commands:
    - `prisma deploy -e ../config/dev.env`
    - `prisma deploy -e ../config/test.env`

1. Run service, or unit tests
    - `yarn run start-dev` for dev services
    - `yarn test` for unit tests.

---

##### A user component is already setup for authentication and login purposes.  The rest is ready to create.