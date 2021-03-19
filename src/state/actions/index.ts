import { Movie } from '../../models/Movie';
import { Partner } from '../../models/Partner';
import { ActionType } from '../action-types';

export interface LoadUserAction {
  type: ActionType.LOAD_USER;
  payload: {
    userID: string;
    partners: Partner[];
    likedMovies: Movie[];
    dislikedMovies: string[];
  };
}

export interface AddUserToSyncAction {
  type: ActionType.ADD_USER_TO_SYNC;
  payload: string; // partner ID
}

export interface LikeMovieAction {
  type: ActionType.LIKE_MOVIE;
  payload: Movie;
}

export interface DislikeMovieAction {
  type: ActionType.DISLIKE_MOVIE;
  payload: string;
}

export interface AddMatchMovie {
  type: ActionType.ADD_MATCH_MOVIE;
  payload: {
    movie: Movie;
    partner: string;
  };
}

export interface RemoveMatchMovie {
  type: ActionType.REMOVE_MATCH_MOVIE;
}

export interface AddMovieToPartner {
  type: ActionType.ADD_MOVIE_TO_PARTNER;
  payload: {
    movie: Movie;
    partner: string;
  };
}

export type Action =
  | LoadUserAction
  | AddUserToSyncAction
  | LikeMovieAction
  | DislikeMovieAction
  | AddMatchMovie
  | RemoveMatchMovie
  | AddMovieToPartner;
