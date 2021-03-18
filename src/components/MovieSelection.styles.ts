import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
  },
  swiper: {
    flex: 1,
  },
  swiperContainer: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 20,
  },
  sideButtonImage: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  dislikeImage: {
    height: 30,
    width: 30,
  },
  likeImage: {
    height: 35,
    width: 35,
  },
  rightOverlayLabel: {
    backgroundColor: 'transparent',
    borderColor: 'green',
    color: 'green',
    borderWidth: 2,
  },
  rightOverlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 30,
  },
  leftOverlayLabel: {
    backgroundColor: 'transparent',
    borderColor: 'red',
    color: 'red',
    borderWidth: 2,
  },
  leftOverlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
});

export default styles;
