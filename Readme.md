# Authentication App

It's a secure Authentication full stack application
that uses:

Backend : Expressjs, Sqlite, jsonwebtoken, bcrypt

Frontend : React, Zustand, MaterialUI, Axios, react-toastify

## Installation

install node

on ubuntu

```bash
  sudo apt get install node
```

get node installation on mac and windows here : https://nodejs.org/en/download/package-manager/current

on ubuntu
install git

```bash
  sudo apt get install git-all
```

follow instructions here for other OS:
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

get the repository

```bash
  git clone https://github.com/dinaharison/curesuremedicotest.git
  cd ./curesuremedicotest
```

install the backend

```bash
  cd ./backend
  npm install
```

install the frontend

```bash
  cd ./frontend
  npm install
```

## Run the app

Both frontend and backend are separate apps.

to run the backend:

```bash
  cd ./backend
  npm start
```

to run the frontend:

```bash
  cd ./frontend
  npm run dev
```

## API Reference

#### login

This endpoint is used to sign a user in using jwt

```http
  POST /login
```

#### register

This endpoint is used to register a user

```http
  POST /register
```

#### user

An example of protected endpoint using a jwt middleware to secure user's data

```http
  POST /user
```
