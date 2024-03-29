# chargEView - User interface for smart EV charging
Design Project, BrainChargers

Authors:\
Alex Olteanu, s1990675\
Alexandra Iosif, s2189496\
Aydan Allahverdiyeva, s1933906\
Ivo Broekhof, s2185970

Supervisor: Marco Gerards

Course code: 202001048\
November, 2021

# Visit the app
[**Live web app**](https://design-project-c4242.web.app/)

# Quick Start

0. Install Node.js and execute `npm install --global yarn`

1. To install dependencies: `yarn install`

2. To start the front-end server: `yarn start`


# System Description
The current system is intended to be a lightweight web app, thus it has been built in the form of a Single Page Application (SPA). 

The user interface has no back-end API to the Energy Management System (EMS), therefore dummy data has been used for generating the graph on the Schedule page. 

The user needs to connect to the system using a QR code. 
# Global Architecture and Design
This section provides an overview of the entire system and its functionalities.
The section covers frameworks and tools used during the development of the web application, as well as describes styling, reporository structres and provides throughout description of the main components.
## Frameworks and Tools
Below is the Table of all frameworks and tools used during the product implementation.

Framework/Library  | Usage
------------------ | -----------------
React              | Functional components to build UI
Typescript         | Static typing for Javascript
React Hook Form    | Hook for functional components to handle the state of the form
Reactstrap         | React Bootstrap 4 library
Material UI        | React Component Library
Typedoc            | Documentation generator
Firebase           | Deployment of the UI
Cypress            | Unit & System Testing
## Design Overview
The next paragraphs provide overview of styling techniques used in the project, as well as describe how responsiveness of the pages was achieved. 
### Styling
The [styles](./src/styles) folder contains scss files for each of the main component (and styles for all child components), as well global styling variables for light mode ([lightMode.scss](./src/styles/lightMode.scss)) and dark mode ([darkMode.scss](./src/styles/darkMode.scss)). Currently the application operates on light mode only.

The individual scss files for the main pages (Start, Schedule, Session and Feedback) are constructed using nested classes. This specifies the class name of the elements precisely and ensures that they would not be overwritten by accident. In the example below the .feedbackForm element is wrapped inside the .feedback parent element: 

```css
example from feedback.scss file

.feedback {
    display: flex;
    align-items: center;
    background: $global_background_color;
    flex-direction: column;

    ...

    .feedbackForm {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }

    ...
}
```

To achieve smooth behaviour of the [Time Selector](./src/components/widgets/TimeSelector.tsx), its style was defined separetly in [timeSelector.scss](.src/components/styles/timeSelector.scss).

Inline styling was used in cases when the element needed minor touching, but not be overwritten completely. For example to increase/decrease `margin`/ `padding` or align texts in the center.

### Responsive Design	
The web appication resizes to a smartphone screen. This was achieved using Flexbox properties in the CSS. Most of the components are defined using `Container, Row, Column` components from `reactstrap`. Please consider the example below:

```javascript
<Container>
    <Row>
        <Column>
        ... content
        </Column>
    </Row>
</Container>
```
The [App.scss](./src/App.tsx) and [index.scss](./src/index.scss) files overwrite styling of html and body to allow content spread at full screen. Most of the `Container`'s also use `display: flex` property to align and justify the content. 

## Repository structure
Please refer below for the detailed overview of the Repository structure. 

    .
    ├── cypress                         # Compiled files 
    |    ├── ...
    |    └── integration                # Cypress testing files for each main component
    |             
    ├── docs                            # Typedoc documentation files
    ├── public                          # Public files (e.g. car image)
    ├── src                             # Source folder 
    |    ├── api                        # Mock api file
    |    ├── assets                     # Profile Steering files
    |    ├── components                 # React components 
    |    |   ├── pages                  # Main React pages/components
    |    |   ├── styled                 # Styled MUI/Reactstrap components
    |    |   └── widgets                # Complex styled components used on the main pages
    |    ├── data                       # Dummy data
    |    ├── hooks                      # Hook for the mock API
    |    ├── styles                     # SCSS files
    |    ├── index.tsx                  # Entry point of the web application
    |    └── ...
    ├── test                            # Manual testing
    ├── firebase.json                   # Firebase config file
    |── package.json                    # Project's metadata
    ├── package-lock.json               # NPM files dependency tree (DO NOT EDIT DIRECTLY)
    |── tsconfig.json                   # Typescript config file
    |── cypress.json                    # Cypress config file
    |── README.md                       # Manual file
    └── ...
## Components
### Start 
This is the initial page when the web app is started and it only allows users to proceed to the next page.
### Schedule
This page is used for the scheduling of the charging session. The user can enter their preferences and see the planned session together with the price and CO2 emissions.
If the user requests 0 kWh of energy or does not select a charging mode, the UI should reject the session and ask the user to set the energy and/or mode.

#### Navbar
This component houses the price and emissions elements.

#### TimeSelector
This component records the departure time of the user. It consists of an hour and minute part, which can be changed by the user with the respective up and down arrow buttons.

#### EnergySelector
This component has a slider and displays the selected amount of energy in kWh as well as the estimated range in km.

#### ModeSelector
This component consists of two buttons, each representing the charging modes (fast and solar).

#### Graph
This component contains the graph, displaying the predicted solar power and the scheduled charging power against time.

### Session
This component keeps track of the charging session. The state of charging is updated through a progress bar and a table. This page supports three phases, with the following distinctions:

1.	If the charging session is in progress:

-	The user will be able to see the selected departure time on top of the screen.
-	The progress bar will be green, ranging from 0 to 99%.
-	There will be a “Stop” button.
2.	If the charging session has finished:

-	The user will see the finished charging time on top of the screen.
-	The green progress bar will be filled 100%.
-	There will be a “Finish” button.
3.	If the charging session has been aborted:

-	The user will see the aborted time on top of the screen.
-	The progress bar will stop and become red.
-	There will be a “Finish” button.

The “Stop” button triggers the pop-up which asks for a confirmation of the abortion. The pop-up comes with two button options: “Yes” and “Cancel”. In case the user choose “Yes”, the session page will be in the abortion phase described above. If “Cancel” is picked, the session will still be in progress, remaining in the same phase. 

The “Finish” button will redirect the user to the Feedback page.

The table shows the expected finish time of charging at the top, followed by the progress state of the requested energy from the user, taken from the Schedule page, in the form of both kWh and km charged. The charging mode, price, and CO2 emissions of the charging session are also displayed in the table.
### Feedback
The Feedback component stores the feedback from users after each charging session. [React-Hook-Form](https://react-hook-form.com/) manages the state of the form. There are several possible scenarios of user interaction: 

1. User submits feedback.
-  "Thank you for your feedback" alert is displayed. User is redirected to the start page after timeout. Form is saved with entered input values.

2. User submits empty feedback.
-  "Please rate us next time" alert is displayed. User is redirected to the start page after timeout. No form is saved.

3. User exits.
-  "Please rate us next time" alert is displayed. User is redirected to the start page after timeout. No form is saved.

To prevent empty form submission, the boolean `hasFeedback` determines if any feedback was submitted. If the form is dirty (if any of the fields are not the same as default values anymore) and if user did not touch any of the fields, then the `hasFeedback` is set to `true`. 

The form consists of 3 fields (Controlled Components): 
1. "5-bolt" Rating - [CustomRating](./src/components/widgets/CustomRating.tsx) 
2. Suggested Comments (only one could be chosen) - [Comments](./src/components/widgets/Comments.tsx) 
3. Text Field for additional remarks - [TextField](./src/components/styled/TextField.tsx)

Each field is wrapped in [Controller](https://react-hook-form.com/api/usecontroller/controller) with control of the form passed as `context.control` via `useFormContext()`.

None of the fields of the Feedback Form are mandatory. The Suggested Comments component dynamically generates Radioboxes depending on the number of elemnets in the `values` prop inherited from [Feedback](./src/components/pages/Feedback.tsx). So in order to change number of suggested comments or their values, the only modification that needs to be made is add/change/remove elements of `commmentValues` array in the Feedback page. 

If in future it will be decided to allow users to choose one or more suggested comments, radiobox need to be substituted with checkboxes. For that [Checkbox](./src/components/styled/Checkbox.tsx) styled component was defined (which is currently unused).

# Testing
System testing is done in [Cypress](https://www.cypress.io/) and all the test files can be found in this directory

    cypress              # Compiled files 
     ├── ...
     └── integration    # Cypress testing files for each main component

# Deployment
Hosting is done using Firebase. 
1. In order to build and release in production use `yarn deploy app`
2. To generate the documentation and host it use `yarn deploy docs`

For more information please refer to the Firebase [documentation](https://firebase.google.com/docs/hosting/test-preview-deploy).

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
The code was documented using [TypeDoc](https://typedoc.org/) and can be found in [here](https://documentation-chargeview.web.app/).
1. To generate new documentation simply execute `yarn docs`. 
2. To deploy the new documentation you can use `yarn deploy docs`
