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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  partnerID: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  movieCountContainer: {
    alignItems: 'center',
  },
  movieCount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  movieLabel: {
    fontSize: 20,
  },
});

export default styles;
