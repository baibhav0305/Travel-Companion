# Travel Companion

Travel Companion is a web app that serves you the basic details about your next trip's destination : )

## Features

- An overview on your destination
- Best restaurants
- Next 3 days' weather forecast
- Location on the map and its surroundings
- Latest news and information

## Live

https://travel-companion69.herokuapp.com/

## Demo
https://youtu.be/1-L4OyI_qx4

## Tech Stack

**Client:** ReactJs, Redux-Toolkit

_Additional NPM packages_

- axios
- mapbox-gl
- react-toastify
- react-router-dom

**Server:** Node, Express

_Additional NPM packages_

- cors
- dotenv
- nodemon
- bcryptjs
- mongoose
- concurrently

**Database:** MongoDB

_Authentication and Authorization:_ JWT Authentication

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`

## To Run Locally

Clone the project

```bash
  git clone https://github.com/<username>/Travel-Companion.git
  npm install
```

For client side

```bash
  cd client
  npm install
```

Start

```bash
  npm run dev
```
