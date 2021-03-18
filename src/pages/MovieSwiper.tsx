import React from 'react';
import { Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import MovieSelection from '../components/MovieSelection';
import { useActions } from '../hooks/use-actions';
import { useMovieSubscriber } from '../hooks/use-movie-subscriber';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Movie } from '../models/Movie';
import styles from './MovieSwiper.styles';

const MovieSwiper: React.FC = () => {
  const { likeMovie, keepPlaying } = useActions();
  useMovieSubscriber();
  const matchedMovie = useTypedSelector(({ user }) => user.matchedMovie);

  const handleLikeMovie = (movie: Movie) => {
    likeMovie(movie);
  };

  return (
    <View style={styles.container}>
      <MovieSelection onLike={handleLikeMovie} />
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
