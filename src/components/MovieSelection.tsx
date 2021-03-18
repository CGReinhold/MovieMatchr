import React, { useState, useRef } from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Actions } from 'react-native-router-flux';
import { Movie } from '../models/Movie';
import Button from './Button';
import Card from './Card';
import styles from './MovieSelection.styles';

const CARDS: Movie[] = [
  {"title":"Ma Rainey's Black Bottom","year":"2020","Rated":"R","Released":"18 Dec 2020","Runtime":"94 min","Genre":"Drama, Music","Director":"George C. Wolfe","Writer":"Ruben Santiago-Hudson (screenplay by), August Wilson (based on the play written by)","Actors":"Viola Davis, Chadwick Boseman, Colman Domingo, Glynn Turman","Plot":"During a recording session, tensions rise between Ma Rainey, her ambitious horn player and the white management determined to control the uncontrollable \"Mother of the Blues\".","Language":"English","Country":"USA","Awards":"Nominated for 2 Golden Globes. Another 36 wins & 129 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNTBlZGY1OTAtN2RjMC00ZThiLWFiZmUtN2VkOGMxNmMyYjQwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Metacritic","Value":"87/100"}],"Metascore":"87","imdbRating":"7.1","imdbVotes":"23,189","imdbID":"tt10514222","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},
  {"title":"Outside the Wire","year":"2021","Rated":"R","Released":"15 Jan 2021","Runtime":"114 min","Genre":"Action, Adventure, Fantasy, Sci-Fi","Director":"Mikael Håfström","Writer":"Rob Yescombe (screenplay by), Rowan Athale (screenplay by), Rob Yescombe (story by)","Actors":"Anthony Mackie, Damson Idris, Enzo Cilenti, Emily Beecham","Plot":"In the near future, a drone pilot sent into a war zone finds himself paired with a top-secret android officer on a mission to stop a nuclear attack.","Language":"English","Country":"Hungary, USA","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BNmM2MWQ0NzktNzU0OS00MjYzLTkxNDYtMzliNTA5ZmNkMmZlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.4/10"},{"Source":"Metacritic","Value":"45/100"}],"Metascore":"45","imdbRating":"5.4","imdbVotes":"31,656","imdbID":"tt10451914","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},
  {"title":"Borat Subsequent Moviefilm","year":"2020","Rated":"R","Released":"23 Oct 2020","Runtime":"95 min","Genre":"Comedy","Director":"Jason Woliner","Writer":"Sacha Baron Cohen (screenplay by), Anthony Hines (screenplay by), Dan Swimer (screenplay by), Peter Baynham (screenplay by), Erica Rivinoja (screenplay by), Dan Mazer (screenplay by), Jena Friedman (screenplay by), Lee Kern (screenplay by), Sacha Baron Cohen (story by), Anthony Hines (story by), Dan Swimer (story by), Nina Pedrad (story by), Sacha Baron Cohen (based on character created by)","Actors":"Sacha Baron Cohen, Maria Bakalova, Tom Hanks, Dani Popescu","Plot":"Follow-up film to the 2006 comedy centering on the real-life adventures of a fictional Kazakh television journalist named Borat.","Language":"English, Bulgarian, Hebrew, Romanian","Country":"UK, USA","Awards":"Nominated for 3 Golden Globes. Another 23 wins & 33 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNmY3OTdkOWEtNjc2ZC00OTZmLWI5OWItMjdjYjRkNTExNDNhXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.7/10"},{"Source":"Metacritic","Value":"68/100"}],"Metascore":"68","imdbRating":"6.7","imdbVotes":"105,607","imdbID":"tt13143964","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},
  {"title":"Avengers: Infinity War","year":"2018","Rated":"PG-13","Released":"27 Apr 2018","Runtime":"149 min","Genre":"Action, Adventure, Sci-Fi","Director":"Anthony Russo, Joe Russo","Writer":"Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Stan Lee (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by), Joe Simon (Captain America created by), Jack Kirby (Captain America created by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Jim Starlin (Thanos,  Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Steve Englehart (Mantis created by), Don Heck (Mantis created by)","Actors":"Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans","Plot":"The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.","Language":"English","Country":"USA","Awards":"Nominated for 1 Oscar. Another 46 wins & 73 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"68/100"}],"Metascore":"68","imdbRating":"8.4","imdbVotes":"839,788","imdbID":"tt4154756","Type":"movie","DVD":"31 Jul 2018","BoxOffice":"$678,815,482","Production":"Marvel Studios","Website":"N/A","Response":"True"},
  {"title":"Mank","year":"2020","Rated":"R","Released":"04 Dec 2020","Runtime":"131 min","Genre":"Biography, Comedy, Drama","Director":"David Fincher","Writer":"Jack Fincher (screen play by)","Actors":"Gary Oldman, Amanda Seyfried, Lily Collins, Tom Pelphrey","Plot":"1930's Hollywood is reevaluated through the eyes of scathing social critic and alcoholic screenwriter Herman J. Mankiewicz as he races to finish the screenplay of Citizen Kane (1941).","Language":"English, German, Latin","Country":"USA","Awards":"Nominated for 6 Golden Globes. Another 27 wins & 161 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BZTllMjI0ZGYtM2FmZC00ZmY4LTlkNTYtZThlOWQ1OGQyZTA3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Metacritic","Value":"79/100"}],"Metascore":"79","imdbRating":"7.1","imdbVotes":"38,316","imdbID":"tt10618286","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},
];

interface MovieSelectionProps {
  onLike(movie: Movie): void;
}

const MovieSelection: React.FC<MovieSelectionProps> = ({ onLike }) => {
  const [index, setIndex] = useState(0);
  const swiper = useRef<any>();

  const handleLike = async (likeIndex: number) => {
    onLike(CARDS[likeIndex]);
  };

  const handleLikeButton = () => {
    swiper.current.swipeRight();
  };

  const handleDislike = () => {
    console.log('disliked');
  };

  const handleDislikeButton = () => {
    swiper.current.swipeLeft();
  };

  const handleMovieTap = (tapIndex: number) => {
    const movie = CARDS[tapIndex];
    Actions.movieInfo({ movie });
  };

  const handleListOpen = () => {
    Actions.movieMenu();
  };

  const handleUserOpen = () => {
    Actions.userInfo();
  };

  const renderCard = (movie: Movie) => {
    return <Card movie={movie} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          ref={swiper}
          containerStyle={styles.swiperContainer}
          onSwiped={() => setIndex((current) => current + 1)}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          disableTopSwipe
          disableBottomSwipe
          onTapCard={handleMovieTap}
          cards={CARDS}
          cardIndex={index}
          renderCard={renderCard}
          onSwipedAll={() => console.log('swiped all')}
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
