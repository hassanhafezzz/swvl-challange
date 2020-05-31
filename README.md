This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Swvl ride tracking simulator

A react app that simulates Swvl's ride tracking,
[live demo here](https://hassan-swvl-challenge.netlify.app/).

![](demo.gif)

## Features

- 🖌 Draw a route with predefined stations using google maps direction service.
- 🚌 Display bus/ drive and trip info.
- 💡 Display real Eta for each station from google maps directions api.
- 🗺 The bus mimics the real movement on the map.
- 👨🏻‍💻 Add booking with pre-filled input form with validation on each input.
- ✨ Ability to fill all 12 seats on the bus with just one click.
- ⌚️ Ability to control the time of the simulation.
- 💃🏻 Real time update on bus passengers status upon arrival on every station.
- 🕵🏻‍♂️ Reloading the browser doesn't affect the ride.
- 🤝 Ability to reset and start all over again with new passengers.
- 📈 After the ride is completed some stats are shown.
- 🎨 App is fully responsive.

## Tech approach

- **Create React app** for scaffolding the app.
- **Context API** for state management.
- **CSS modules** for styles and reduce CSS critical path.
- **React Google Maps**.
- **Formik** for form validation.
- **RequestAnimationFrame** for bus animation and maximizing the performance.
- **React Chart.js** for displaying stats.
- **React testing library** for UI testing and snapshots.
- Built a simple accessible modal.
- Built a simple caching layer for the app.
- The app uses **pre-commit hooks** to fix linting issues and optimize image
  sizes

## Deployment

This app is deployed using Netlify on https://hassan-swvl-challenge.netlify.app/

## Installation

- **Clone the repo**

  `$ git clone https://github.com/hassanhafezzz/swvl-challange`

- **Install dependencies**

  `$ yarn install`

- **Add your google API key to the env** please check `.env` file to see how.

- **Start the server**

  `$ yarn start`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.
