import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Movie } from '../models/Movie';
import styles from './MovieInfo.styles';

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: movie.Poster }}
          style={styles.movieImage}
          resizeMode="contain"
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieCountry}>
            {movie.Country} - {movie.year}
          </Text>
          <Text style={styles.moviePlot}>{movie.Plot}</Text>
          <Text style={styles.movieActors}>{movie.Actors}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieInfo;
