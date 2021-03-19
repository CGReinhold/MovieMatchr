import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import MovieSelection from '../components/MovieSelection';
import { useActions } from '../hooks/use-actions';
import { useMovieSubscriber } from '../hooks/use-movie-subscriber';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Movie } from '../models/Movie';
import { takeRandom } from '../utils/ListUtils';
import { movies as allMovies } from '../constants/all-movies';
import styles from './MovieSwiper.styles';

const MovieSwiper: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { likeMovie, dislikeMovie, keepPlaying } = useActions();
  useMovieSubscriber();
  const { matchedMovie, likedMovies, dislikedMovies } = useTypedSelector(({ user }) => user);

  const getFilteredMovies = (): Movie[] => {
    return allMovies.filter((movie) => 
      !likedMovies.find(m => m.imdbID === movie.imdbID) && 
      !dislikedMovies.includes(movie.imdbID)
    );
  }

  const incrementMovieList = () => {
    const nextMovie = getRandomMovies(1);
    setMovies((movies) => [...movies, ...nextMovie]);
  }

  const getRandomMovies = (count: number): Movie[] => {
    const filteredMovies = getFilteredMovies();
    return takeRandom(filteredMovies, count);
  }

  useEffect(() => {
    const startingMovies = getRandomMovies(10);
    setMovies(startingMovies);
  }, []);

  const handleLikeMovie = (movie: Movie) => {
    likeMovie(movie);
    incrementMovieList();
  };

  const handleDislikeMovie = (movie: Movie) => {
    dislikeMovie(movie);
    incrementMovieList();
  }

  return (
    <View style={styles.container}>
      <MovieSelection onLike={handleLikeMovie} onDislike={handleDislikeMovie} movies={movies} />
      {matchedMovie && (
        <View style={styles.matchContainer}>
          <Text style={styles.matchTitle}>It's a match!</Text>
          <Image
            source={{ uri: matchedMovie.movie.Poster }}
            style={styles.matchPoster}
            resizeMode="contain"
          />
          <Text style={styles.matchDescription}>
            {matchedMovie.partner} also wants to watch this movie!
          </Text>
          <TouchableWithoutFeedback onPress={keepPlaying}>
            <View style={styles.keepPlayingContainer}>
              <Text style={styles.keepPlayingText}>Keep Playing</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default MovieSwiper;
