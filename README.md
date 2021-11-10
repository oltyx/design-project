# Quick Start
I.D.E. - WebStorm 

0. Install Node.js and execute `npm install --global yarn`

1. To install dependecies: `yarn install`

2. To start the front-end server: `yarn start`

# System Description
The current system is intended to be a lightweight web app, thus it has been built in the form of a Single Page Application (SPA). 

The user interface has no back-end API to the Energy Management System (EMS), therefore dummy data has been used for generating the graph on the Schedule page. 

The user needs to connect to the system using a QR code. 
# Global Architecture and Design

## Frameworks and Tools

## Design Overview
### Styling
### Responsive Design	

## Repository structure

## Components
### Start 
### Schedule
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

# Testing	

# Deployment	

# Support	

# Typedocs	
