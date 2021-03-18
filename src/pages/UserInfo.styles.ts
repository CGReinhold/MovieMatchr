import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
    tintColor: 'gray',
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
  },
  code: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  friendTitle: {
    marginTop: 50,
    fontSize: 20,
  },
  inputContainer: {
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 25,
    width: '70%',
  },
});

export default styles;
