import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { store } from '../state';

export const useMovieSubscriber = () => {
  const onMovieFound = (movie: Movie) => {
    console.log('movie match', movie);
  };

  useEffect(() => {
    const { userID } = store.getState().user;

    const subscriber = firestore()
      .collection(userID)
      .onSnapshot(
        (data) => {
          const changes = data.docChanges();

          const { partners, likedMovies } = store.getState().user;
          changes.forEach((change) => {
            console.log('change DATA', change.doc.data());
            console.log('change ID', change.doc.id);

            const likedMovie = likedMovies.find(
              (movie) => movie.imdbID === change.doc.id,
            );

            if (likedMovie) {
              const movieData = change.doc.data();
              if (movieData) {
                // TODO: descobrir alguma forma de disparar para cima que teve um mach no filme
                // TODO: salvar na lista de filmes de parceiros
              }
            }
          });
        },
        (e) => console.error(e),
      );

    return () => subscriber();
  }, []);
};
