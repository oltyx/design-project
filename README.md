# Quick Start
I.D.E. - WebStorm 

0. Install Node.js and execute `npm install --global yarn`

1. To install dependecies: `yarn install`

2. To start the front-end server: `yarn start`

# System Description

# Global Architecture and Design

## Frameworks and Tools

## Design Overview
### Styling
### Responsive Design	

## Repository structure

## Components
### Start 
This is the initial page when the web app is started and it only allows users to proceed to the next page.
### Schedule
This page is used for the scheduling of the charging session. The user can enter their preferences and see the planned session together with the price and CO2 emissions.
If the user requests 0 kWh of energy or does not select a charging mode, the UI should reject the session and ask the user to set the energy and/or mode.

### Session
### Feedback

# Testing	

# Deployment
Hosting is done using Firebase. In order to preview execute `yarn build` and `firebase hosting:channel:deploy branch-preview-name` and to release in production use `firebase deploy --only hosting`. For more information please refer to the Firebase [documentation](https://firebase.google.com/docs/hosting/test-preview-deploy).

# Further Development	

## Extending Components
To add a new component for a new feature, make a .tsx file in the widgets package and export a function that returns the type of the widget you make. 
Within this function, you can return an HTML literal with the markup of the widget.
Hooks and values for this widget can be initialized in this function, whereas the model (the blueprint for the properties of the component) can be defined as an interface above.\
This procedure is similar for the styled components.

To insert a widget into a page, you can start using the widget with an HTML tag.\
To add a new page to the application, add a `<Route>` tag with the corresponding URI template to `App.tsx`.\
To modify the content of widgets, you can go to the page and access the content of the component there.

## Data structures across modules
In case the same data structure is used in multiple modules, it is better to centralize a definition of this data structure in the models package.

## Adding API calls
The recommended way to implement API calls is within custom hooks, similar to `useProgress`.
The connection to the API itself can be defined in the api package, which also allows for multiple APIs to work with the UI.

## Adding a stylesheet
You can write a .scss file (stylesheet) to house styling rules. The stylesheets can inherit properties from each other, 
which means that you do not have to duplicate style values but instead can set them as variables to call back elsewhere.

# Documentation
In order to document our code we use [TypeDoc](https://typedoc.org/). And the Documentation can be found in [here](https://documentation-chargeview.web.app/).
To generate new documentation simply execute `yarn docs`
