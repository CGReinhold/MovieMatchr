import React, { useState, useRef } from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Actions } from 'react-native-router-flux';
import { Movie } from '../models/Movie';
import Button from './Button';
import Card from './Card';
import styles from './MovieSelection.styles';

const CARDS: Movie[] = [
  { title:"The Lion King",year:"1994","Rated":"G","Released":"24 Jun 1994","Runtime":"88 min","Genre":"Animation, Adventure, Drama, Family, Musical","Director":"Roger Allers, Rob Minkoff","Writer":"Irene Mecchi (screenplay by), Jonathan Roberts (screenplay by), Linda Woolverton (screenplay by), Burny Mattinson (story), Barry Johnson (story), Lorna Cook (story), Thom Enriquez (story), Andy Gaskill (story), Gary Trousdale (story), Jim Capobianco (story), Kevin Harkey (story), Jorgen Klubien (story), Chris Sanders (story), Tom Sito (story), Larry Leker (story), Joe Ranft (story), Rick Maki (story), Ed Gombert (story), Francis Glebas (story), Mark Kausler (story), J.T. Allen (additional story material), George Scribner (additional story material), Miguel Tejada-Flores (additional story material), Jenny Tripp (additional story material), Bob Tzudiker (additional story material), Christopher Vogler (additional story material), Kirk Wise (additional story material), Noni White (additional story material), Brenda Chapman (story supervisor)","Actors":"Rowan Atkinson, Matthew Broderick, Niketa Calame-Harris, Jim Cummings","Plot":"Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.","Language":"English, Swahili, Xhosa, Zulu","Country":"USA","Awards":"Won 2 Oscars. Another 35 wins & 35 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"88/100"}],"Metascore":"88","imdbRating":"8.5","imdbVotes":"946,731","imdbID":"tt0110357","Type":"movie","DVD":"15 Aug 2017","BoxOffice":"$422,783,777","Production":"Walt Disney Pictures","Website":"N/A","Response":"True"},
  { title:"The Lego Batman Movie",year:"2017","Rated":"PG","Released":"10 Feb 2017","Runtime":"104 min","Genre":"Animation, Action, Comedy, Family","Director":"Chris McKay","Writer":"Seth Grahame-Smith (screenplay by), Chris McKenna (screenplay by), Erik Sommers (screenplay by), Jared Stern (screenplay by), John Whittington (screenplay by), Seth Grahame-Smith (story by), Bob Kane (Batman created by), Bill Finger (Batman created by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by), William Moulton Marston (Wonder Woman created by), Ole Kirk Christiansen (based on LEGO Construction Toys created by), Godtfred Kirk Christiansen (based on LEGO Construction Toys created by), Jens Nygaard Knudsen (based on LEGO Construction Toys created by)","Actors":"Will Arnett, Michael Cera, Rosario Dawson, Ralph Fiennes","Plot":"A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.","Language":"English","Country":"USA, Denmark, Australia","Awards":"13 wins & 67 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"7.3","imdbVotes":"131,509","imdbID":"tt4116284","Type":"movie","DVD":"19 May 2017","BoxOffice":"$175,750,384","Production":"Warner Bros. Pictures, Lin Pictures, Vertigo Entertainment","Website":"N/A","Response":"True"},
  { title:"Avengers: Endgame",year:"2019","Rated":"PG-13","Released":"26 Apr 2019","Runtime":"181 min","Genre":"Action, Adventure, Drama, Sci-Fi","Director":"Anthony Russo, Joe Russo","Writer":"Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Stan Lee (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by), Joe Simon (Captain America created by), Jack Kirby (Captain America created by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Jim Starlin (Thanos,  Gamora & Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Steve Englehart (Mantis created by), Don Heck (Mantis created by)","Actors":"Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth","Plot":"After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.","Language":"English, Japanese, Xhosa, German","Country":"USA","Awards":"Nominated for 1 Oscar. Another 69 wins & 102 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"78/100"}],"Metascore":"78","imdbRating":"8.4","imdbVotes":"816,700","imdbID":"tt4154796","Type":"movie","DVD":"30 Jul 2019","BoxOffice":"$858,373,000","Production":"Marvel Studios, Walt Disney Pictures","Website":"N/A","Response":"True"},
  { title:"Avengers: Infinity War",year:"2018","Rated":"PG-13","Released":"27 Apr 2018","Runtime":"149 min","Genre":"Action, Adventure, Sci-Fi","Director":"Anthony Russo, Joe Russo","Writer":"Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Stan Lee (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by), Joe Simon (Captain America created by), Jack Kirby (Captain America created by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Jim Starlin (Thanos,  Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Steve Englehart (Mantis created by), Don Heck (Mantis created by)","Actors":"Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans","Plot":"The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.","Language":"English","Country":"USA","Awards":"Nominated for 1 Oscar. Another 46 wins & 73 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"68/100"}],"Metascore":"68","imdbRating":"8.4","imdbVotes":"839,788","imdbID":"tt4154756","Type":"movie","DVD":"31 Jul 2018","BoxOffice":"$678,815,482","Production":"Marvel Studios","Website":"N/A","Response":"True"},
  { title:"Blue Is the Warmest Colour",year:"2013","Rated":"NC-17","Released":"09 Oct 2013","Runtime":"180 min","Genre":"Drama, Romance","Director":"Abdellatif Kechiche","Writer":"Abdellatif Kechiche (scenario,  adaptation and dialogue), Ghalya Lacroix (scenario,  adaptation and dialogue), Julie Maroh (adapted from: the comic book \"Le Bleu est une couleur chaude\" by)","Actors":"Léa Seydoux, Adèle Exarchopoulos, Salim Kechiouche, Aurélien Recoing","Plot":"Adèle's life is changed when she meets Emma, a young woman with blue hair, who will allow her to discover desire and to assert herself as a woman and as an adult. In front of others, Adèle grows, seeks herself, loses herself, and ultimately finds herself through love and loss.","Language":"French, English","Country":"France, Belgium, Spain","Awards":"Nominated for 1 Golden Globe. Another 85 wins & 103 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTQ5NTg5ODk4OV5BMl5BanBnXkFtZTgwODc4MTMzMDE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.7/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"89/100"}],"Metascore":"89","imdbRating":"7.7","imdbVotes":"139,318","imdbID":"tt2278871","Type":"movie","DVD":"14 Sep 2016","BoxOffice":"$2,199,787","Production":"France Télévision, Ciné+, France 2 Cinema, Wild Bunch, Centre du Cinéma et de l&#39;Audiovisuel de la Fédération Wallonie-Bruxelles, Quat&#39;sous Films, Canal+, Scope Pictures, Eurimages, Le Tax Shelter du Gouvernement Fédéral de Belgique, Région Nord-Pas-de-Calais, Pictanovo, France 2 (FR2), Vertigo Films, Centre National de la Cinematographie, Radio Télévision Belge Francofone (RTB)","Website":"N/A","Response":"True"},
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
