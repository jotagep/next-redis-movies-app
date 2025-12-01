# Verflix (Next.js / Redux / Redis / Jest / Storybook)

DEMO: [WEB](https://verflix.vercel.app/)

A Netflix clone created using Next.js, Redux and Redis that allows you to discover popular movies.
All data has been powered by [The Movie Database API](https://developers.themoviedb.org/3/)

**Tech stack**: Next.js, Redux Toolkit, Redis (Upstash), TypeScript, Jest, React Testing Library, Tailwind CSS, Storybook

## Development

Install the dependencies

```bash
npm install
```

And once all dependencies have been installed you can start the server

```bash
npm run dev
```

## Folder Structure

This project is organized following a "feature folder" structure:

- **/lib**:
  - **/movieApi**: fetching functions and TS Interfaces for TMDB Api
  - **/redis**: Redis client
- **/pages**: Main next js folder
- **/components**: Shared UI components
- **/features**
  - **/PopularMovies**: Components for the Popular Movies page &reducer
  - **/SearchMovies**: Components for Search Bar & reducer
  - **/FavoriteMovies**: Components for Favorite page & reducer
  - **/SelectedMovies**: Components for Selected Movie page & reducer
- **/utils**: shared functions
- **/hooks**: custom react hooks

Additionally, Storybook static output is published under `public/storybook` (see Scripts below).

## Testing Setup

This project uses **Jest** and **React Testing Library** for unit testing. The Jest setup is configured for JSDOM and TypeScript.

## Scripts

- `npm run dev` - Start Next.js in development
- `npm run build` - Build Next.js and export Storybook to `public/storybook`
- `npm start` - Start the Next.js production server
- `npm run lint` / `npm run lint:fix` - Lint code / fix issues
- `npm run format` / `npm run format:check` - Format with Prettier / check formatting
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run storybook` - Run Storybook locally on `http://localhost:6006`
- `npm run build-storybook` - Build Storybook to `storybook-static`
- `npm run export-storybook` - Copy `storybook-static` to `public/storybook`

## Storybook

Run interactive component docs locally:

```bash
npm run storybook
```

Build and publish static Storybook to be served by Next.js:

```bash
npm run build-storybook
npm run export-storybook
```

After `npm run build`, Storybook is automatically exported to `public/storybook`.

## Test Structure

Tests are co-located with their components/features:

```text
components/
├── ButtonLink/
├── CardMovie/
├── ...

features/
├── PopularMovies/
├── SearchMovies/
├── FavoriteMovies/
├── SelectedMovie/
└── ...

hooks/
├── useScrollY.ts
└── ...
```
