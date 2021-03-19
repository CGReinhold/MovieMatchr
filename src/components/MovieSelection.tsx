import React, { useState, useRef } from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Actions } from 'react-native-router-flux';
import { Movie } from '../models/Movie';
import Button from './Button';
import Card from './Card';
import styles from './MovieSelection.styles';

interface MovieSelectionProps {
  onLike(movie: Movie): void;
  onDislike(movie: Movie): void;
  movies: Movie[];
}

const MovieSelection: React.FC<MovieSelectionProps> = ({ onLike, onDislike, movies }) => {
  const swiper = useRef<any>();

  const handleLike = async (likeIndex: number) => onLike(movies[likeIndex]);
  const handleLikeButton = () => swiper.current.swipeRight();

  const handleDislike = (dislikeIndex: number) => onDislike(movies[dislikeIndex]);
  const handleDislikeButton = () => swiper.current.swipeLeft();

  const handleMovieTap = (tapIndex: number) => Actions.movieInfo({ movie: movies[tapIndex] });

  const handleListOpen = () => Actions.movieMenu();
  const handleUserOpen = () => Actions.userInfo();

  const renderCard = (movie: Movie) => {
    if (!movie) return null;
    return <Card movie={movie} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          ref={swiper}
          containerStyle={styles.swiperContainer}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          disableTopSwipe
          disableBottomSwipe
          onTapCard={handleMovieTap}
          cards={movies}
          renderCard={renderCard}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: styles.leftOverlayLabel,
                wrapper: styles.leftOverlayWrapper,
              },
            },
            right: {
              title: 'WATCH',
              style: {
                label: styles.rightOverlayLabel,
                wrapper: styles.rightOverlayWrapper,
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button size={45} onPress={handleListOpen}>
          <Image
            style={styles.sideButtonImage}
            source={require('../../images/menu.png')}
          />
        </Button>
        <Button size={70} onPress={handleDislikeButton}>
          <Image
            style={styles.dislikeImage}
            source={require('../../images/close.png')}
          />
        </Button>
        <Button size={70} onPress={handleLikeButton}>
          <Image
            style={styles.likeImage}
            source={require('../../images/popcorn.png')}
          />
        </Button>
        <Button size={45} onPress={handleUserOpen}>
          <Image
            style={styles.sideButtonImage}
            source={require('../../images/user.png')}
          />
        </Button>
      </View>
    </View>
  );
};

export default MovieSelection;
