## Comments

Please see TODO below for a list of things I would do if more time.

I used Create React App for this project (the typescript version). Please see below for instructions on how to start it, but basically you'll need to `npm install` and then `npm start`. Let me know if you have any questions!

The task is in TypeScript.

I've taken the opportunity to try out some recent ideas. Please let me know what you think!

In particular, the domain/index.ts file contains some types that restrict what can be called and what can be stored in state. The idea being to prevent the program from getting into a bad state via compile time errors.
The main mechanism for this is

`type Country = NewCountry | SavedCountry`

SavedCountry contains id and some metadata that NewCountry doesn't have. SavedCountry can be edited but NewCountry can't. etc.

I probably spent too long on that part and not enough time on other bits. There's also some scrappy code here and there that needs tidying.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODO

- Disallow numbers that start with 0, e.g. 01
- Error handling
- Loading per country rather than all countries + sort loading when changing order
- Accessibility
- browser targeting and testing
- optimistic updates
- are you sure 'delete'
- More tests
- Much nicer styling! Let me know if you want to see some examples of my work.
- Make it look like we're not using form fields for the editable rows.
- Block any actions that might break things while loading


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## DataTruth Programming Task

In order to be considered for the developer position, you must complete the following task.

*Note: This task should take approx. 2 - 3 hours. However, you have up to 24hrs after you fork the repo to submit your work.*

### Preparation

Before starting this task, we recommend that you have:

- Your favourite computer and development tools / IDE to hand;
- A few hours of un-distracted time ahead of you;
- Access to the internet;
- A mug of hot coffee (or tea, if you prefer!).

### In this task, you may use:

- Any combination of technologies, frameworks and techniques you like;
- The internet, including Google, Stackoverflow etc to help with the task;
- Any type of data store.

You may also ask us any general questions you might have about the task.

## The Task

1. Fork this repository on Github (if you don't know what that means or how to do it, Google is your friend);
2. Create a *src* folder to contain your code;
3. In the *src* directory, create a simple app to allow a basic Olympic Medals Table to be displayed in a browser or on a device;
4. The app should allow:
 - Countries to be added to a table, along with the TOTAL number of medals the country won during the last Olympic Games; and
 - Rows to be sorted in descending order of medals won, either automatically or manually by the user.
5. Commit and Push your code to your new repository;
6. Send us a pull request;
7. Your code will be reviewed by one of our senior technical team and we will get back to you.

If you wish to supply instructions on how to run or understand the construction of your app, then please provide those in a new README.md file within a docs folder.

If you can provide a link to view or download a demo of your app to go along with your code, then all the better.

#### *Feel free to use any combination of technologies, frameworks and techniques you prefer.*

### For bonus points:

If you find the task above easy, then feel free to improve your app. Here are some ideas:

- Add counts for each type of medal (Gold, Silver, Bronze) and make the countries order by Gold first, Silver next and Bronze thereafter;
- Add country flag icons/images to the country names;
- Allow editing and/or deleting of countries from the list.

### Any questions?

Please just ask.

Good luck and thanks for taking the time to complete this task!
