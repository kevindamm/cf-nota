# Implementation of Mic Memo on Cloudflare Workers and Nuxt.js 3

<!--
A full description of this source code can be found in the about/ path of the
online demo of [Mic Memo](https://micmemo.kevindamm.com).
-->

Also see the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)
to learn more about the serving framework.

## Setup (for running your own instance)

Make sure to install dependencies:

```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Deploying

Before deploying you will need to have a few things set up:

* Registered for a Cloudflare Account
* Enrolled in the Workers Paid plan (different than the Pro plan)
  * this unlocks Durable Objects and AI features
* Set up the D1 database and R2 bindings

...
