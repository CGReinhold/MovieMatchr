import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { store } from '../state';
import { ActionType } from '../state/action-types';
import { useActions } from './use-actions';

export const useMovieSubscriber = () => {
  const { setMovieToPartners } = useActions();

  const onSnapshot = async (
    data: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ): Promise<void> => {
    const changes = data.docChanges();

    const { partners, likedMovies } = store.getState().user;
    changes.forEach(async (change) => {
      const likedMovie = likedMovies.find(
        (movie) => movie.imdbID === change.doc.id,
      );

      if (likedMovie) {
        const peopleThatLiked = change.doc.data();
        if (peopleThatLiked) {
          const idsPeopleThatLiked = Object.keys(peopleThatLiked);
          const friendsThatLiked = partners.filter((partner) =>
            idsPeopleThatLiked.includes(partner.ID),
          );

          let showMatchPopup = false;

          await setMovieToPartners(
            partners,
            friendsThatLiked.map((f) => f.ID),
            likedMovie,
          );

          friendsThatLiked.forEach((friend) => {
            if (!friend.movieIDs.includes(likedMovie.imdbID)) {
              store.dispatch({
                type: ActionType.ADD_MOVIE_TO_PARTNER,
                payload: { movie: likedMovie, partner: friend.ID },
              });

              if (!showMatchPopup) {
                showMatchPopup = true;
                store.dispatch({
                  type: ActionType.ADD_MATCH_MOVIE,
                  payload: { movie: likedMovie, partner: friend.ID },
                });
              }
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    const { userID } = store.getState().user;

    const subscriber = firestore()
      .collection(userID)
      .onSnapshot(onSnapshot, (e) => console.error(e));

    return () => subscriber();
  }, []);
};
