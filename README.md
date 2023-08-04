# project-name-api

API for project-name platform

## Run BE local

1. First of all, you need to get .env file from team member

2. Install project-name with docker

```bash
  npm run docker:up
```

Host: http://localhost:3000

Swagger: http://localhost:3000/swagger

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

Coverage test

```bash
  npm run test:cov
```


## Reset docker
1. Remove all container
```bash
  npm run docker:down
```

2. Create all container

```bash
  npm run docker:up
```

## Update node_modules volume
Incase you pull latest change and there were some npm packages installed, but in your local hasn't updated. You need to follow this steps to update your node_modules in your local.

1. Runs a new command in a running container

```bash
  npm run docker:exec
```

2. Update package

```bash
  npm i
```

## Before push code

Run format and lint

```bash
  npm run format
  npm run lint
```