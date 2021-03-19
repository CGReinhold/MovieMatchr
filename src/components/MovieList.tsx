import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { Movie } from '../models/Movie';
import styles from './MovieList.styles';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const moviePress = (movie: Movie) => {
    Actions.movieInfo({ movie });
  };

  if (!movies.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyLabel}>You sill don't have liked movies</Text>
      </View>
    );
  }

  const renderMovie = ({ item }: { item: Movie }) => {
    return (
      <TouchableWithoutFeedback onPress={() => moviePress(item)}>
        <View style={styles.movieItemContainer}>
          <Image source={{ uri: item.Poster }} style={styles.moviePoster} />
          <View>
            <Text style={styles.movieTitle}>{item.Title}</Text>
            <Text style={styles.movieDescription}>
              {item.Country} - {item.Year}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item: Movie) => item.imdbID}
      />
    </View>
  );
};

export default MovieList;
