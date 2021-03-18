import React from 'react';
import { Image, Text, View } from 'react-native';
import { Movie } from '../models/Movie';
import styles from './Card.styles';

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: movie.Poster }} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieTitle}>{movie.year}</Text>
        </View>
        <Text style={styles.movieDescription}>{movie.Plot}</Text>
      </View>
    </View>
  );
};

export default Card;
