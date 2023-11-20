# EduDocs

Send documents to sign

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installing Dependencies](#installing-dependencies)
    - [Running the Angular App](#running-the-angular-app)
    - [Running the Node.js Server](#running-the-nodejs-server)

## Overview

EduDocs is a cloud-based electronic signature for Edusign solution that allows users to sign and send documents electronically.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [Angular CLI](https://angular.io/cli) (Angular Command Line Interface)

## Getting Started

### Installing Dependencies

Navigate to the project's root directory and install the dependencies for both the Angular app and the Node.js server.

```bash
# Install Angular CLI globally (if not installed)
npm install -g @angular/cli

# Install Node.js dependencies
cd client  # Change to the Angular app directory
npm install

cd ../server  # Change to the Node.js server directory
npm install
```

### Running the Angular App

Edit the file `client/src/environments/environment.ts` if you need to change the api url:

```typescript
export const environment = {
  production: true,
  apiUrl: 'http(s)://{API_HOST:API_PORT}/api',
};
```

Start the Angular development server. The app will be available at `http://localhost:4200/`.

```bash
cd client
npm run start
```

### Running the Node.js Server

Create a `.env` file based on `.env.example` :

```dotenv
PORT=
TOKEN=
USER_ID=
```

Start the Node.js server. Your server will be running at `http://localhost:8000/`.

```bash
cd server
npm run debug
```

## Testing client

```bash
cd client
npm run test # for unit test
npm run e2e # for e2e test
```

## Testing server

```bash
cd server
npm run test
```
