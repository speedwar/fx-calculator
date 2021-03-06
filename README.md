
# FX Calculator

Currency Calculator with Reactjs / Redux.
Test currency rate will be replaced with OpenRate API after 26th Feb 2020.

## Demo site

**Netlify** is used for automating CI/CD for this side project.
> [https://infallible-poincare-283125.netlify.com](https://infallible-poincare-283125.netlify.com)

## Nodejs
Ensure you have node / npm installed in your local environment.
If you are experiencing a difficulty to install with package manager, please switch to below versions.

Version
> `node 13.3.0`
> `npm 6.13.1`

## Comfirmed test cases
- [x] AUD/JPY
- [x] AUD/USD
- [x] USD/JPY
- [x] NOK/USD
- [x] KRW/USD - No rate
- [] USD cross inverse convertion

## Available Scripts

In the project directory, you can run:

> `npm start`

To skip unit test, run

> `npm run start:ff`

Runs the app in the development mode.
The page will reload if you make edits.
You will also see any lint errors in the console.

> `npm run dev`

Launches the jest test runner

> `npm run test`

Update exisiting snapshots

> `npm run test:update`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

> `npm run build`
> `npm run build:prod`

### Unit testing

Used Jest Testing Framework. Simply run `npm test` to test components.
run `npm run test:update` to update snapshots.
Test must be passed to initialise `npm run build`.

## Comment
To be added

## Versioning

### v0.5.0
* Added basic jest unit testing
* Added logic for NOK/USD conversion

### v0.4.0
* UI improvement
* Added error messages for unavailable rates

### v0.3.0
* Replaced text input field to dropdown field
