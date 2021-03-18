import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { Dispatch } from 'redux';
import firestore from '@react-native-firebase/firestore';
import { USER_ID, USER_MOVIES, USER_PARTNERS } from '../../constants/User';
import { randomString } from '../../utils/RandomUtils';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { UserState } from '../reducers/userReducer';
import { Movie } from '../../models/Movie';
import { Partner } from '../../models/Partner';

const getUserID = async () => {
  const userId = await AsyncStorage.getItem(USER_ID);
  if (!userId) {
    const newUserId = randomString(8);
    await AsyncStorage.setItem(USER_ID, newUserId);
    return newUserId;
  }

  return userId;
};

const getLikedMovies = async (): Promise<Movie[]> => {
  const likedMovies = await AsyncStorage.getItem(USER_MOVIES);
  if (!likedMovies) {
    return [];
  }

  return JSON.parse(likedMovies);
};

const getPartners = async (): Promise<Partner[]> => {
  const partners = await AsyncStorage.getItem(USER_PARTNERS);
  if (!partners) {
    return [];
  }

  return JSON.parse(partners);
};

const setMovieToPartners = async (
  partners: Partner[],
  partnersToUpdate: string[],
  movie: Movie,
): Promise<void> => {
  const updatedPartners = partners.map((partner) => {
    if (
      partnersToUpdate.includes(partner.ID) &&
      !partner.movieIDs.includes(movie.imdbID)
    ) {
      return {
        ...partner,
        movieIDs: [...partner.movieIDs, movie.imdbID],
      };
    }
    return partner;
  });

  await AsyncStorage.setItem(USER_PARTNERS, JSON.stringify(updatedPartners));
};

const loadUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    const userID = await getUserID();
    const likedMovies = await getLikedMovies();
    const partners = await getPartners();
    dispatch({
      type: ActionType.LOAD_USER,
      payload: { userID, likedMovies, partners },
    });
    Actions.movieSwiper();
  };
};

const addUserToSync = (partnerID: string) => {
  return async (
    dispatch: Dispatch<Action>,
    getState: () => { user: UserState },
  ) => {
    const { partners } = getState().user;
    if (!partners.find((partner) => partner.ID === partnerID)) {
      dispatch({ type: ActionType.ADD_USER_TO_SYNC, payload: partnerID });

      await AsyncStorage.setItem(
        USER_PARTNERS,
        JSON.stringify([...partners, { ID: partnerID, movieIDs: [] }]),
      );
    }
  };
};

const saveOnFirebase = async (movie: Movie, userID: string) => {
  firestore()
    .collection(userID)
    .doc(movie.imdbID)
    .set({ ['self']: true }, { merge: true })
    .then(() => {
      console.log('Movie added!');
    })
    .catch((error) => {
      console.error(error);
    });
};

const saveOnPartnersFirebase = async (
  movie: Movie,
  userID: string,
  partners: Partner[],
) => {
  partners.forEach((partner) => {
    firestore()
      .collection(partner.ID)
      .doc(movie.imdbID)
      .set({ [userID]: true }, { merge: true })
      .then(() => {
        console.log('Movie added!');
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const hasMatches = async (
  movie: Movie,
  userID: string,
  partners: Partner[],
): Promise<string[]> => {
  const movieData = await firestore()
    .collection(userID)
    .doc(movie.imdbID)
    .get();

  const userMatch = movieData.data();

  if (userMatch) {
    const usersWithLikes = Object.keys(userMatch);
    return partners
      .filter((partner) => usersWithLikes.includes(partner.ID))
      .map((partner) => partner.ID);
  }

  return [];
};

const likeMovie = (movie: Movie) => {
  return async (
    dispatch: Dispatch<Action>,
    getState: () => { user: UserState },
  ) => {
    const { userID, likedMovies, partners } = getState().user;

    if (!likedMovies.find((m) => m.imdbID === movie.imdbID)) {
      dispatch({ type: ActionType.LIKE_MOVIE, payload: movie });

      const updatedMovies = [...likedMovies, movie];
      await AsyncStorage.setItem(USER_MOVIES, JSON.stringify(updatedMovies));
    }

    await saveOnFirebase(movie, userID);
    await saveOnPartnersFirebase(movie, userID, partners);

    const matches = await hasMatches(movie, userID, partners);

    if (matches.length > 0) {
      dispatch({
        type: ActionType.ADD_MATCH_MOVIE,
        payload: { movie, partner: matches[0] },
      });

      matches.forEach((match) => {
        dispatch({
          type: ActionType.ADD_MOVIE_TO_PARTNER,
          payload: { movie, partner: match },
        });
      });

      await setMovieToPartners(partners, matches, movie);
    }
  };
};

const keepPlaying = () => {
  return { type: ActionType.REMOVE_MATCH_MOVIE };
};

export const actionCreators = {
  loadUser,
  addUserToSync,
  likeMovie,
  keepPlaying,
  setMovieToPartners,
};
