<img src="public/chuck_norris_PNG19.png" alt="Pens in a Darth Vader themed cup" width="50%" />

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Node.js CI](https://github.com/romulobordezani/chuck-norris-facts/actions/workflows/nodejs.yml/badge.svg)](https://github.com/romulobordezani/chuck-norris-facts/actions/workflows/nodejs.yml)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

# Chuck Norris' facts search interface
This is a [`challenge`](./CHALLENGE.md) made with 🧡, hoping to join Nuuvem team and:  
 * [`TypeScript`](https://www.typescriptlang.org/)
 * [`React.js`](https://reactjs.org/) + [`Next.js`](https://nextjs.org/)
 * [`SASS`](https://sass-lang.com/)
 * [`Node.js`](https://nodejs.org/en/) + [`Expressjs`](https://expressjs.com/)


 Started with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## On Github
Available at [https://github.com/romulobordezani/chuck-norris-facts](https://github.com/romulobordezani/chuck-norris-facts), with all it's commits telling the whole developmet history, issues, bugs fixed and `Github actions`.

## At AWS:
Available at: [https://d37bjw0zvp9al3.cloudfront.net/](https://d37bjw0zvp9al3.cloudfront.net/)

## Getting Started

First, ensure you have `Node ^14` up and running.

Optional, but recommended, [`install yarn`](https://yarnpkg.com/getting-started/install) to use all the power of Webpack 5 with Yarn Pnp.

```bash
npm install -g yarn
```

#### Install NPM packages

```bash
npm install
# or (recommended)
yarn
```

#### Running

```bash
npm run dev
# or (recommended)
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/search/index.tsx`. The page auto-updates as you edit the file.

#### BFF

[API routes](https://nextjs.org/docs/api-routes/introduction) where used to avoid CROSS domain issues and add an extra layer of monitoring and reports based on logs.

Avaliable endpoints:

| url | file |
| ------------- | ------------- |
|    [http://localhost:3000/api/chuck-norris-facts/jokes/search?query=joke](http://localhost:3000/api/chuck-norris-facts/jokes/search?query=joke)       |   `pages/api/chuck-norris-facts/jokes/search/index.ts`   | 
|    [http://localhost:3000/api/chuck-norris-facts/jokes/:id](http://localhost:3000/api/chuck-norris-facts/jokes/LQDsZuk2RhSu3DKHpxE7Gw)       |   `pages/api/chuck-norris-facts/jokes/[id].ts`   | 


> The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


#### ENV vars
Locally, the [app will inject](https://nextjs.org/docs/basic-features/environment-variables) all vars wrote down in the `/.env` file.

All .env files suffixed with .local are ignored by github, what makes them a good place to secrets while running locally, preventing them to get exposed.

In production you can pass secrets via environment vars as usually.

> In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_. For example: **NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk**


## Code quality

To ensure code quality, [`Husky`](https://www.npmjs.com/package/husky) is set up and will run tests and lint the code before commits, if it fails, will abort the commit.

> You can by pass Husky verifications with `--no-verify` at the end of your git command, but Chuck Norris **doesn't** recommend this approuch. 🤠

#### Tests
```bash
npm run test
# or (recommended)
yarn test
```


#### Lint + Type Script validations
```bash
npm run lint
# or (recommended)
yarn lint
```
 
## Achievements 
* SSR html and meta tags generation to share the jokes on social media
* Hybrid routing system, that works as SSR and SPA
* BFF made with Typescript, with an interceptor based gateway, integrated with the Routing system
* Deploy on AWS serverless
* Full Code Quality control, stoping bad commits, blocking Pull Requests with no passing tests and lint
* 100% test coverage
* BDD (Behavior Driven Development) implemmented based on accessibility roles
* Does **NOT** use any design system as Material Ui, Bootstrap or any similar to show some CSS skills 
* Using only Breakpoint SASS as Responsiveness Framework, with support to DPI and orientation 📱💻🖥 
* PWA Service Worker, to have a better control of caching and allow users to install offline on mobile.


## ROADMAP 

Following, a list of stuff I would like to do, but there is no more time...

* Auto-complete in the search box.
* Pagination, would be nice to add a pagination but I couldn't find any information about it in the API and got out of time.
* Log rotation system, integrated with some monitoring tool like SPlunk, Kibana + Elastic Search, New Relic etc.
* Github badge with code coverage on README.md
* Add internationalization with i18n, supporting multiple languages
