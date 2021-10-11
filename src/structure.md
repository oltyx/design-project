Proposed file structure, sourced from https://hackernoon.com/creating-awesome-spas-with-react-66b4e2043621

```
src
├── assets #All the media/styles/fonts/helper_functions:p
│   ├── profile-steering
│   ├── objects
│   └── styles
├── components #controller+view Layer
│   ├── pages #top-level pages
│   └── widgets #children
├── data #Data Layer
│   └── models #Backbone.Model
├── routes #React router routes
├── App.css #unruly mess
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
└── registerServiceWorker.js #end unruly mess 
```