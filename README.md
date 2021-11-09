# Quick Start
I.D.E. - WebStorm 

0. Install Node.js and execute `npm install --global yarn`

1. To install dependecies: `yarn install`

2. To start the front-end server: `yarn start`

# System Description

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
The next paraghraphs provide overview of styling techniques used in the project, as well as describe how responsiveness of the pages was achieved. 
### Styling
The [styles](./src/styles) folder contains scss files for each of the main component (and styles for all child components), as well global styling variables for light mode ([lightMode.scss](./src/styles/lightMode.scss)) and dark mode ([darkMode.scss](./src/styles/darkMode.scss)). Currently the application operates on light mode only.

The individual scss files for the main pages (Start, Schedule, Session and Feedback) are constructed using nested classes. This specifies the class name of the elements precisely and ensures that they would not be overwritten by accident. In the example below the .feedbackForm element is wrapped inside the .feedback parent element: 

```css
feedback.scss file

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

```Javascript
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
### Schedule
### Session
### Feedback


# Testing	

# Deployment	

# Support	

# Typedocs	
