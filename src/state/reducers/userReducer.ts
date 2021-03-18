import { Movie } from '../../models/Movie';
import { Partner } from '../../models/Partner';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export interface UserState {
  userID: string;
  partners: Partner[];
  likedMovies: Movie[];
  matchedMovie: {
    movie: Movie;
    partner: string;
  } | null;
}

const initialState: UserState = {
  userID: '',
  partners: [],
  likedMovies: [],
  matchedMovie: null,
};

const reducer = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {
    case ActionType.LOAD_USER:
      return { ...state, ...action.payload };
    case ActionType.ADD_USER_TO_SYNC:
      return {
        ...state,
        partners: [...state.partners, { ID: action.payload, movieIDs: [] }],
      };
    case ActionType.LIKE_MOVIE:
      return { ...state, likedMovies: [...state.likedMovies, action.payload] };
    case ActionType.ADD_MATCH_MOVIE:
      return { ...state, matchedMovie: action.payload };
    case ActionType.REMOVE_MATCH_MOVIE:
      return { ...state, matchedMovie: null };
    case ActionType.ADD_MOVIE_TO_PARTNER:
      return {
        ...state,
        partners: state.partners.map((partner) => {
          if (partner.ID === action.payload.partner) {
            return {
              ID: partner.ID,
              movieIDs: [...partner.movieIDs, action.payload.movie.imdbID],
            };
          }
          return partner;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
