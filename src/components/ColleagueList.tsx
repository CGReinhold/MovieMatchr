import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Partner } from '../models/Partner';
import styles from './ColleagueList.styles';

const ColleagueList: React.FC = () => {
  const { partners, likedMovies } = useTypedSelector(({ user }) => user);

  const partnerPress = (partner: Partner) => {
    const movies = likedMovies.filter((movie) =>
      partner.movieIDs.includes(movie.imdbID),
    );
    Actions.movieList({ movies });
  };

  const renderPartner = ({ item }: { item: Partner }) => {
    return (
      <TouchableWithoutFeedback onPress={() => partnerPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.partnerID}>{item.ID}</Text>
          <View style={styles.movieCountContainer}>
            <Text style={styles.movieCount}>{item.movieIDs.length}</Text>
            <Text style={styles.movieLabel}>Movies</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  if (!partners.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyLabel}>You sill don't have any colleague</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={partners}
        renderItem={renderPartner}
        keyExtractor={(item: Partner) => item.ID}
      />
    </View>
  );
};

export default ColleagueList;
