# scratchpay_challenge
Project developed as a challenge for scratchpay, the goal is to call some endpoints containing a list of clinics and perform some actions on the result.
## Assumptions
ASSUMPTION: There was no reliable way to determine duplicate clinics amongst results from different providers. For example "Scratchpay Test Pet Medical Center" which was returned by both providers might actually be from different clinics, since one is a vet and other is a dental.
So in order to avoid missing results, ALL CLINICS RETURNED FROM DIFFERENT PROVIDERS WERE CONSIDERED TO BE DIFFERENT.
With more information on which providers should be considered for duplicate names, and information on actual duplicates we could prevent returning duplicate clinics.

ASSUMPTION: Results should be collected even if one of the providers is down. Considering results only for active providers

ASSUMPTION: We were not allowed to create a database, therefore saving results and storing them on proper index systems was not considered

## Features
- Commit lint is enforced by husky, using Conventional Commits, se [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more information
- Code coverage is enforced at at least 95% using jest
- Swagger documentation is generated using [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).
- Routes are automatically generated per resource file, see `src/routes.js`
- Eslint and prettier are installed and using airbnb convention for style
- Environment variables are validated to ensure configuration is in place
- Development can be done by locally or inside containers, due to having a separate volume to node_modules
- All parameters for endpoints are validated using Joi
- Apis for fetching clinics are configurable ans scalable
- There are debug configurations for 

## Quick start

- Clone the repo and install dependencies
```bash
git clone https://github.com/alonmota/scratchpay_challenge.git
cd scratchpay_challenge
npm install
```
This will setup eslint husky and prettier

Copy .env.sample to a .env file and change whatever values are needed
```bash
cp .env.example .env
```

To run the app in a container run
```bash
npm run docker:up
```
Or to run the node instance locally run 
```bash
npm run dev
```

By default the application is deployed at port 3000, which can be changed in the .env file
If the app is running and there were no changes to default port navigate to http://localhost:3000/docs to see the docs

To start the app for production
```bash
npm start
```
or using docker
```bash
npm run docker:prod
```

Linting, vscode code should auto lint on saving files, to manually lint files

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm lint:fix

# run prettier
npm prettier

# fix prettier errors
npm prettier:fix
```

## Test
run
```bash
npm test
```
To get test results and coverage

## API Documentation
To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/docs` in your browser. 

### API Endpoints

Available routes:
- `GET /api/clients` - Search for clients
Available filters:
- - Filter by name: `GET /api/clients?name=<FRAGMENT_OF_NAME>` -> example: `GET /api/clients?name=Clin`
- - Filter by state: `GET /api/clients?name=<STATE_UF|STATE_NAME>` -> example: `GET /api/clients?state=CA` | `GET /api/clients?state=California`
- - Filter by availability: `GET /api/clients?availability=<HH:mm|from:HH:mm, to:HH:mm>` -> example: `GET /api/clients?availability=09:50` | `GET /api/clients?availability=from:09:50, to:10:40`
## Error Handling
Errors follow default javascript error class, where first param is always an optional message, and other param is options.

## License
[MIT](LICENSE)
