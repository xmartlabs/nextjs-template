# NextJs Template

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v20.9.0
- Docker

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Installation

Clone the repo and install dependencies:

```bash
git clone [your-repo-url]
cd [your-repo-name]
npm install
```

### Running the App

Using Docker
Production Mode
To run the app in a Docker container in production mode:

```bash
docker compose up
```

For development mode with hot reloading (ensure you run `npm run build` first):

```bash
docker compose -f docker-compose.override.yml up
```

Without Docker
To run the app locally without Docker:

```bash
npm run dev
```

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
