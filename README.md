## Verflix (Next.js / Redux / Redis)

DEMO: [WEB](https://verflix.vercel.app/)

A Netflix clone created using Next.js, Redux and Redis that allows you to discover popular movies.
All data has been powered by [The Movie Database API](https://developers.themoviedb.org/3/)

**Tech stack**: Next.js, Redux(Toolkit), Redis, Typescript, Scss modules, Tailwind

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
