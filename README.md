# NextJs Template

## Prerequisites

Before you begin, ensure you have met the following requirements:

- NodeJs v20.9.0
- Docker

### NextJS version
- v14.0.4
## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Installation

Clone the repo and install dependencies:

```bash
git clone [your-repo-url]
cd [your-repo-name]
npm install
```

### Environment Setup

This section follows [Default Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables) from official NextJS docs.

- In general only one .env.local file is needed. However, sometimes you might want to add some defaults for the development (next dev) or production (next start) environment.

- Next.js allows you to set defaults in .env (all environments), .env.development (development environment), and .env.production (production environment).

- .env.local always overrides the defaults set.

_Good to know: .env, .env.development, and .env.production files should be included in your repository as they define defaults. .env\*.local should be added to .gitignore, as those files are intended to be ignored. .env.local is where secrets can be stored, **DO NOT store secrets in the .env.development or .env.production file, instead use .env.local for this purpose**._

Environment variables are looked up in the following places, in order, stopping once the variable is found.

1.  process.env
2.  .env.$(NODE_ENV).local
3.  .env.local (Not checked when NODE_ENV is test.)
4.  .env.$(NODE_ENV)
5.  .env

For example, if NODE_ENV is development and you define a variable in both .env.development.local and .env, the value in .env.development.local will be used.

_Good to know: The allowed values for NODE_ENV are production, development and test._


### Running the App

To run the app locally:

```bash
npm run dev
```
**Run the app using Docker**

```bash
docker compose -f docker-compose.[env-name].yml --env-file .env.[env-name].local up
```
There is no need to run `npm install`

_The container is configured to use anonymous volumes in development mode, this way the node_modules are persisted internally so that the dependencies are installed once._

### Accessing the Storybook

To view the Storybook:

```bash
npm run storybook
```

### Opening a Console in the Docker Container

To open a shell inside the Docker container:

```bash
./scripts/exec.sh -f [docker-compose-file] sh
```

Replace `[docker-compose-file]` with your Docker Compose file name.
