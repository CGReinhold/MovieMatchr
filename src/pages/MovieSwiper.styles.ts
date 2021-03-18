import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matchContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.9,
    paddingBottom: 30,
  },
  matchTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
  },
  matchDescription: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  matchPoster: {
    aspectRatio: 1,
    width: '80%',
  },
  keepPlayingContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  keepPlayingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default styles;
