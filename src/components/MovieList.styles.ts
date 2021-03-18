import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabel: {
    textAlign: 'center',
  },
  movieItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  moviePoster: {
    height: 50,
    width: 50,
    marginRight: 25,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  movieDescription: {
    fontSize: 16,
  },
});

export default styles;
