import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import MovieList from './MovieList';

const MyMovies: React.FC = () => {
  const movies = useTypedSelector(({ user }) => user.likedMovies);

  return <MovieList movies={movies} />;
};

export default MyMovies;
