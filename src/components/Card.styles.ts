import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 30,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardTextContainer: {
    flexDirection: 'column',
    backgroundColor: '#00000099',
    alignItems: 'flex-start',
    padding: 20,
  },
  titleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  movieDescription: {
    fontSize: 16,
    color: 'white',
  },
});

export default styles;
