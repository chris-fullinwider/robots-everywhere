This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.


# Mondo Robot Engineering Skills Test Submission
- Thanks for reviewing my interview project, I hope there's not too much spaghetti :)
- Deployed Application: https://secret-hamlet-00392.herokuapp.com/

## Technologies Used
- HTML, CSS, Typescript, React, Redux, Hooks, Redux-toolkit


## Local Development
- **Pre-requisites:**
  - node (recommended > 10)

- **Optional:**
  - docker

### Folder Structure
- all React components and stylesheets reside in ./src/components
- everything to do with application data and updating state for that data lives in ./features/{DOMAIN}
  - EXCEPT for the setup -- redux setup implementation is in ./src/app

### Setup
- clone this repository to your machine
- navigate to the root directory
- run `npm install` or `yarn install`

### Development Workflow
- from the project  root directory
- run `npm start` or `yarn start` to initiate the dev server
  - this will serve the application on port 3000 with Hot Module Reloading enabled
- open a browser to `localhost:3000`

### Docker Workflow
- **Pre-requisites:**
  - docker

- from the project  root directory
- run `docker build -t {DESIRED_IMAGE_NAME} .`
- once the image is built, run:
  - `docker run --rm -e "PORT=80" -it -p 8080:80 {DESIRED_IMAGE_NAME}`
  - the ngninx server will receive the $PORT environment variable when building the image and inject it into Dockerfile
  - then the Dockerfile injects $PORT via sed command on `nginx.conf` during image build
  - the internal app is serving itself on port 80
  - the docker container forwards that internal port to the container's port 8080
  - the numbers are just for fun, and can be replaced with nearly any valid port value
- open a browser to `localhost:8080`

## Deployment
**Pre-requisites:**
- heroku CLI tools

### Process
- create a heroku account
- download Heroku CLI tools
- login to heroku account via CLI
- navigate to root directory in a terminal:
  - `heroku create` -- generates a heroku app and responds with the identifier for that app
  - `heroku container:push web --app {HEROKU_APP_NAME}` -- build and push docker container to heroku app container registry
  - `heroku container:release web --app {HEROKU_APP_NAME}` -- deploys the most recent container build to the app

## Design Decisions
- there is much that could be done to improve this codebase, however, I was mostly focused on a mostly smooth user experience and solid functionality
- some of the UI will not fit to spec around colors and some alignment issues here and there
  - putting the correct color theme in never got prioritized in my head, so apologies for the basic material UI colors
  - i've simply run out of time to polish
- unit tests were NOT implemented for this project as the time investment didn't seem worthwhile
- material ui is awesome
- component structure is somewhat questionable in places
  - particularly LoginForm RegistrationForm and RobotTile -- these all do way too much and could easily be broken out into more discrete units
- the DropzoneArea I used was a legitimate pain to work with
  - sizing via css was somewhat tricky
  - IT'S INTERIOR UPLOAD STATE CANNOT BE RESET MANUALLY! (without a hack that broke other stuff, so I stopped going down that route)
- i think the status management for each slice (statuses in ./src/features/constants) is manageable for the current scale of the application, but would need to be refactored to scale up
- i managed redux through the `createSlice` methodology and it was probably the best learning to come out of this project for me
  - i had never seen or heard of a redux slice before, but it came baked into `create-react-app`
    - the more i understood it, the more i liked it
  - the last time i did redux development, we were writing out ALL of the reducers and actions by hand
  - this methodology gives a really nice visual flow for what happens with async actions
  - i will not be going back
- all of the `{prefix}API` files could easily be turned into a nodejs service
  - considering the base MondoRobot API does not exactly service this app specifically, it would make sense for a middleman API to sit between the frontend and the MondoRobot API to do all of the mapping, input validation and conversion.
  - considering all of that functionality is nicely wrapped up into three files, I'm fine leaving them in the frontend for now
  - again, if this was a real frontend, i would move all of the business logic, data manipulation, input validation to a pass-through/transformation API service
  - INPUT VALIDATION!... i didn't do it
    - yet another planned feature that had to be ruthelessly de-prioritized
    - i guess we will have to trust the user
- i wanted to implement nice transitions between ui states as well as toast messages that pop up when specific states occur to help the user along
- and a final quality of life change that is needed is a better eslint implementation with husky pre-commit check and auto-lint-fix for all of the files
- also, navigation with back / forward button causes errors
  - doesn't break the app, though

- i'm not sure i met the last couple bullets for the 'end user experience'
  > • The application should immediately reflect changes when a vote is cast (UI + voting results)
  > • For the purposes of this exercise, is not required to reflect admin changes (creating or removing robots) immediately to the end user. BONUS: It would be great to see how you would solve that problem.
  - the ui should always be accurate for the logged in user, however, if another user votes, i do not have anything in place to dynamically update the first user's ui
  - for both of these issues, I would lift my API files into a separate service and implement a websocket between the server and frontend to keep all of the end users synced up on votes and robots
    - it's probably slightly more complicated than this to maintain and ensure that everybody is synced, but websockets is where i would start
