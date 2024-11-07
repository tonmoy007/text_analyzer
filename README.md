# Description

A text analyzer tool. Your task will be to create
an application that read, write, update, and delete texts from/to the database.

# Project setup
## Prerequisites
* Docker 
* Docker compose plugin

### Start by cloning repository
```bash
$ git clone git@github.com:tonmoy007/text_analyzer.git
```
### Environment
```bash
$ cp .env.example .env
```
### Running database

```bash
# database setup
$ docker compose -f db.docker-compose.yml up -d

```
### Install Dependencies
```bash
# install dependencies
$ npm install
```
### Running Prisma Migration
```bash
$ npx prisma migrate dev
```
### Running Prisma Seed Example User
```bash
$ npx prisma db seed
```

## Run tests

```bash
# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

```bash
# Also can be run using docker compose directly
$ docker compose up -f docker-compose.yml up -d
```

