<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="logo.png" width="200px" />
</h1>

<h2 align="center">
Project made in Rockeatseat bootcamp. This project has a back-end, front-end and mobile applications for gyms and their students. It has a wide range of features, like admin login, plans, students enrollments, students help orders, etc.
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leorrodrigues/gymPoint?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/leorrodrigues/gymPoint/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/leorrodrigues/gymPoint?style=social">
  </a>
</p>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

The front-end app is used by gym owners, allowing to register, list, edit and delete students, plans, enrollments and answer the students help orders.

While the mobile app is used by the gym' students, allowing them to make chick-in in the gym with a maximum 5 check-ins during 5 consecutive days and send help orders to the gym's owners. Moreover, the student can list the past check-ins and help orders with their current status.

### Prerequisites

-   [NodeJS](https://nodejs.org/en/) - Environment runtime.
-   [Yarn](https://yarnpkg.com/en/docs/install) - Packager manager.
-   [Docker](https://docs.docker.com/install/) - Make it easier to create, deploy, and run applications by using containers.
- [PostgreSQL](https://hub.docker.com/_/postgres) - A docker image for PostgreSQL database.
- [MongoDB](https://hub.docker.com/_/mongo) - A docker image for MongoDB database.
- [Redis](https://hub.docker.com/_/redis/) - A docker image for Redis database.
  
After accomplish all the prerequisites, clone the repository in your machine.

```
$> git clone https://github.com/jopcmelo/gostack-gympoint.git
```

### Running the application

A step by step instructions to get the application running in development environment.

#### Databases

The application needs the PostgreSQL, MongoDB and Redis running in your local machine, to download the docker images for these DB run the 3 following instructions.

```
$> $ docker run --name mongo_gympoint -p 27017:27017 -d -t mongo   
```
This instruction download a mongoDB image, configuring the container to use the port 27017 and gives him the name "mongo_gympoint".

```
$ docker run --name redis_gympoint -p 6379:6379 -d -t redis:alpine
```
This instruction download a redis image, configuring the container to use the port 6379 and gives him the name "redis_gympoint".

```
$ docker run --name db_gympoint -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
This instruction download a postgreSQL image, configuring the container to use the port 5432 and gives him the name "mongo_gympoint" with password docker.

#### Back-end

The back-end has some dependencies that need to be installed through Yarn.

```
$> cd ./backend/ && yarn
```

To get the back-end running, execute:

```
$> yarn dev
```

The back-end has a e-mail develivery when the student's question is answered or new enrollment is made. The mailtrap is used to check the sent emails in development enrionment. To see the mailtrap emails, update the MAIL_USER and MAIL_PASS variable in .env file of the backend folder with your credentials. 

#### Front-end

The front-end has some dependencies that need to be installed through Yarn.

```
$> cd ./frontend/ && yarn
```

To get the front-end running, execute:

```
$> yarn start
```

Then open your browser in localhost:3000 and use the default admin login and password.

```bash
# Credentials
user: admin@gympoint.com
password: 123456
```

#### Mobile

> The mobile version has been tested in Android environment,  iOS environment may suffer instability and malfunction.

The mobile application needs an android virtual or physical device available in the local machine. 

First, you need to update the variable LOCALHOST_IP in .env file in mobile folder with the IP of your machine.

To run the mobile app, execute:

```
$> cd ./mobile && react-native start --reset-cache
```

After the graph dependencie be loaded, run the following command in a separeted terminal.

```
$> cd ./mobile && reacct-native run-android
```

After that, the app will be available in your android device. To login in the mobile app, just enter with some student ID.

## Built With

-   [Express](http://www.dropwizard.io/1.0.2/docs/) - A restful API framework
-   [ReactJS](https://pt-br.reactjs.org/) - A front-end library to build user interfaces
-   [React Native](https://facebook.github.io/react-native/) - A mobile library to build native apps to Android and iOS

## Authors

-   **Leonardo Rosa Rodrigues** - _Full-stack developer_ - [GitHub profile](https://github.com/leorrodrigues)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Axios
-   ExpressJS
-   Sequelize ORM
-   Mongoose
-   Background mail sendling with Redis
-   Mail Trap
-   Multer
-   JWT
-   Docker
-   React / React Hooks / ReactJS / React Native
-   Reactotron
-   React Navigation / React Router DOM
-   React Toastify
-   Redux / Redux Saga / Redux Persist
-   Flux Archtecture
-   ESLint
-   Prettier
-   Styled Components
-   Rocketseat/Unform
-   .env
-   Etc
