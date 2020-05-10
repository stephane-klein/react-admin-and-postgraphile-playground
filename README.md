# React-Admin and  Postgraphile playground

This project is based on:

- [postgraphile](https://www.graphile.org/postgraphile/)
- [React-Admin](https://github.com/marmelab/react-admin)
- [`BowlingX/ra-postgraphile`](https://github.com/BowlingX/ra-postgraphile) (see https://github.com/graphile/graphile.github.io/issues/224)

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/) (version `18.06.1-ce`)
- [Docker Compose](https://docs.docker.com/compose/) (version `1.22.0`)
- [nodejs](https://nodejs.org/en/) (version `v12.10.0`)

[Homebrew](https://brew.sh/index_fr) instructions:

```sh
$ brew cask install docker
$ brew install git node yarn
```

## Getting started

Git clone this project a working directory, next:

```
$ ./scripts/up.sh
```

You can browse in database with [graphiql](https://github.com/graphql/graphiql) on this page: http://127.0.0.1:5000/graphiql

Now that the backend has been started, go to [`frontend/`](frontend/) to start the « Contact Web Frontend ».
