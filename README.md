# Xmartlabs' NextJS Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

* Node 20.8.1
* NPM 10.1.0
* NextJS 13

## Creating a Project

TBD

## Contributing

Install dependencies:

```sh
npm install
```

Then, copy the environment variables file and define the variables as needed:

```sh
cp .env.example .env.local
```

Request the variables from team members.

You're ready! Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

* `src/app`: the typical directory for NextJS pages. This project uses Next's App Router. Read on for information on how layouts work on this project.
  * `src/app/api`: all API routes go here.
* `src/common`: all components used across pages go here.
* `src/helpers`: TS code that does not really fit anywhere else goes here. Think helper functions that do not render React components.
* `src/networking`: logic related to networking is stored here. Mostly files used by the frontend (the API service, controllers).
  * `src/networking/controllers`: these are classes defined on the frontend that serve as touch points with the backend. They organize requests to the backend centrally and around a specific concern (user-related endpoints go together).
* `src/stories`: Storybook stories for components.
* `src/types`: Store here types that are used end-to-end. These applies specifically to data that is exchanged between client and server (e.g. the `User` model).

## Layouts

Our pages are flattened (mostly) inside the `app` directory. This means that each page needs its own layout. But fear not! There's a `BaseLayout` component that makes adding a layout easy. Simply create a layout file that renders that component and that's it!

This code renders a layout that has a navbar and a footer.

```ts
// src/app/pages/my-new-page/layout.tsx
import { BaseLayout } from '@/common/base-layout/base-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BaseLayout withNavbar withFooter>{children}</BaseLayout>
}
```

## Zod Schemas

In order to validate schemas and have a resilient type system, this projec uses [Zod](https://zod.dev/) to define and validate schemas for data (not to be confused with the database schema). All Zod schemas are stored in the `src/types` directory. To create a new schema (e.g. the `Foo` schema), create a type file like so:

```ts
// src/types/foo.ts
import { z } from "zod";

export const Foo = z.object({
  bar: z.string(),
  baz: z.number(),
});

export type Foo = z.infer<typeof Foo>
```

## Error Handling
