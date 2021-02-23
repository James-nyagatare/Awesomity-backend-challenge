

[![Build Status](https://travis-ci.org/James-nyagatare/Awesomity-backend-challenge.svg?branch=develop)](https://travis-ci.org/James-nyagatare/Awesomity-backend-challenge) [![Coverage Status](https://coveralls.io/repos/github/James-nyagatare/Awesomity-backend-challenge/badge.svg)](https://coveralls.io/github/James-nyagatare/Awesomity-backend-challenge) [![Maintainability](https://api.codeclimate.com/v1/badges/37357a9c012a3bf90790/maintainability)](https://codeclimate.com/github/James-nyagatare/Awesomity-backend-challenge/maintainability)

![Eum1dLHXUAEWRIT](https://user-images.githubusercontent.com/67368268/108912822-d2615000-7631-11eb-80f2-8a2062e2299b.jpg)

Todo App - List, task and reminder.
=======

 Todo app is a task management app to help you stay organized and manage your day-to-day. You can use Todo app to make shopping lists or task lists, take notes, record collections, plan an event, or set reminders to increase your productivity and focus on what matters to you.


# Pre-Requisites 
- Postgresql installed
- Database created

# How to Install and run the application 

- Clone the repo on [Github](https://github.com/James-nyagatare/Awesomity-backend-challenge) using `git clone https://github.com/James-nyagatare/Awesomity-backend-challenge.git`
(Have git installed, get it [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
- run `npm install`
- Add the `.env` file with reference to `.env.example` and make sure `.env` is in the base folder.
- Run `npm run migrate` to create db migrations 
- Run `npm start` to start development server
- Run `npm test` to run the tests

# API Documentation 

- [Swagger Documentation on Heroku](https://todo-app-awesomity.herokuapp.com/api/v1/documentation)

| Description        | Method    |  Category     | EndPoint                
|--------------------|---------- | --------------|----------------------
| Register User      | **POST**  | Users         | `/api/v1/users/signup`  
| Verify User        | **GET**   | Users         | `/api/v1/users/verifyEmail/:token` 
| Login User         | **POST**  | Users         | `/api/v1/users/login`   
| Sends reset link   | **POST**  | Users         | `/api/v1/users/forgotPassword` 
| Reset User Password| **PATCH** | Users         | `/api/v1/auth/resertPassword/:token` 
| Creates a todo     | **POST**  | Todos         | `/api/v1/todos` 
| Get all todos      | **GET**   | Todos         | `/api/v1/todos` 
| Retrieve a todo    | **GET**   | Todos         | `/api/v1/todos/:id`
| search and download todos       | **GET** | Todos        | `/api/v1/todos/export`
| Updates a todo        | **PATCH** | Todos      | `/api/v1/todos/:id`
| Deletes a todo    | **DELETE**  | Todos   | `/api/v1/todos/:id`

Test the above endpoints in your favorite API client, I strongly recommend [Postman](https://www.postman.com/)

# Docker

## Setting Up Docker

1. Install Docker on your pc using instruction [here](https://docs.docker.com/install/). Make sure it's running well

2. Navigate to the directory where you want to copy this repo,clone it by running `git clone <link of the repo>`

3. Follow the `.env.example` file to setup your environment and populate with corresponding values

4. In your root directory run `docker build -t <your username>/todo-app .` to build your docker image

5. Run `docker images` to assure that image was successfully created

6. Run `docker run -p <given port>:5000 -d <your username>/<image name>` to run your image

## Run app on Docker

1. Run `docker-compose build` to create and start containers

2. Run `docker ps` to get container ID

3. Run `docker exec -it <container id> sh` to enter container

4. Make sure that 5000 Port is not in use else where if it is the case turn off the other server first

5. Test endpoint using postman using route `http://localhost:5000/<endpoind route>`
# Technologies Used

- NodeJs / Express
- Postresql Database with Sequelize as ORM
- Mocha / Chai for testing
- Swagger for API Documentation 
- Continuous integration: [Travis-Ci](https://travis-ci.org/github/James-nyagatare/Awesomity-backend-challenge)
- ES6 Transpiler: [Babel](https://babeljs.io/)
- Maintainability: [Code climate](https://codeclimate.com/github/James-nyagatare/Awesomity-backend-challenge)
- Js linter: [Eslint](https://eslint.org/)

# Deployments

- Visit the App on [Heroku](https://todo-app-awesomity.herokuapp.com/)

# Contributing

In case you have an idea how this app can be improve I am pleased to invited to contribute on it. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

# Contact

### [App email](noreply.toodoapp@gmail.com)
### [Personal email](nyagatarejames@gmail.com)

# Author 
## [James Nyagatare](https://github.com/James-nyagatare/)
