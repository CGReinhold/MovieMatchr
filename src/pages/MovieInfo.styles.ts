import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieImage: {
    aspectRatio: 1,
    width: '100%',
  },
  movieInfo: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  movieTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  movieCountry: {
    fontSize: 14,
    marginBottom: 5,
  },
  moviePlot: {
    fontSize: 16,
    marginBottom: 5,
  },
  movieActors: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default styles;
