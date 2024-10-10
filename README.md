## Table of Contents

1. [Features](#features)
2. [Usage](#usage)
3. [Installation](#installation)
4. [Testing](#testing)
5. [Learn More](#learn-lore)
6. [License](#license)

## Features

1. Modeling/solving of specific and general linear programs!
2. HIGHS and GLPK Solver supported!
3. LP and GMPL input languages supported!
4. Intuitive to use through guided input and issue highlighting!
5. Optimized for running in webbrowser. Runs in frontend only. No backend!
6. Export and Import functions for general linear problems provided!
7. Currently supports the languages english and german!
8. Usable on mobile devices as well!

## Usage

<div align="center">
  <a href="https://projektstudium-22dwf1.github.io/ip-solver-online/"><strong>Optimize your solutions now!</strong></a>
</div>


## Installation

To get the project running locally, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- NPM

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Projektstudium-22DWF1/ip-solver-online.git
   cd ip-solver-online

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Run the project**:
   ```bash
   npm start
   ```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Testing

### Unit Tests

1. **Run unit tests**:
   ```bash
   cd ip-solver-online
   npm test
   ```

2. **Select which tests to run**

   Press **a** to run all tests or choose other options that are shown to you


### End-to-End Tests

Make sure to run the project locally on localhost:3000 **before running the E2E-Test**.  

Open a second terminal window and follow the steps below.  

1. **Install cypress**

   ```bash
   cd ip-solver-online
   npm install cypress --save-dev
   ```

2. **Open Cypress**

   ```bash
   npx cypress open
   ```

3. **Follow the UI**

   Select **E2E Testing**, then **choose the webbrowser** you want to test the application in. Hit **Start E2E Testing in xxxxx**.  

The E2E Test are now running. You can **click the spec.cy.js file** to visually see the E2E Test.

## Learn More

This project was bootstrapped with Create React App (https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)** due to dependencies covered by the GPL license.

### Dependencies Licenses

- This project also includes dependencies licensed with **MIT License** and **Apache License 2.0**.

Please see the individual dependency licenses for more details.
