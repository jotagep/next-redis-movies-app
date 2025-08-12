# Verflix (Next.js / Redux / Redis / Jest)

DEMO: [WEB](https://verflix.vercel.app/)

A Netflix clone created using Next.js, Redux and Redis that allows you to discover popular movies.
All data has been powered by [The Movie Database API](https://developers.themoviedb.org/3/)

**Tech stack**: Next.js, Redux(Toolkit), Redis, Typescript, Jest, React Testing Library, Scss modules, Tailwind

### Development

Install the dependencies

```bash
$ npm install
```

And once all dependencias has been installed you can start the server

```bash
$  npm run dev
```

### Folder structure

This project is organized following a "feature folder" structure:

- **/lib**:
  - **/movieApi**: fetching functions and TS Interfaces for TMDB Api
  - **/redis**: Redis client
- **/pages**: Main next js folder
- **/components**: Component shared by pages
- **/feautures**
  - **/PopularMovies**: Components for the Popular Movies page &reducer
  - **/SearchMovies**: Components for Search Bar & reducer
  - **/FavoriteMovies**: Components for Favorite page & reducer
  - **/SelectedMovies**: Components for Selected Movie page & reducer
- **/utils**: shared functions
- **/hooks**: custom react hooks

### Testing Setup

This project uses **Jest** and **React Testing Library** for unit testing.

### Scripts

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Test Structure

Tests are co-located with their components/features:

```
components/
├── __tests__/          # Component tests
├── ButtonLink.tsx
├── Loading.tsx
└── ...

features/
├── PopularMovies/
│   ├── __tests__/      # Feature tests
│   ├── GridPopularMovies.tsx
│   └── ...
└── ...

hooks/
├── __tests__/          # Hook tests
├── useScrollY.ts
└── ...
```
