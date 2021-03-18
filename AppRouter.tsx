import React from 'react';
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import Splash from './src/pages/Splash';
import MovieSwiper from './src/pages/MovieSwiper';
import MovieInfo from './src/pages/MovieInfo';
import UserInfo from './src/pages/UserInfo';
import MenuIcon from './src/components/MenuIcon';
import MovieList from './src/components/MovieList';
import CollegueList from './src/components/ColleagueList';
import styles from './AppRouter.styles';
import MyMovies from './src/components/MyMovies';

const AppRouter = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="splash" component={Splash} hideNavBar />
        <Scene key="movieSwiper" component={MovieSwiper} hideNavBar />
        <Scene key="movieMenu" hideNavBar>
          <Tabs labelStyle={styles.menuLabel} activeBackgroundColor="#efefef">
            <Scene
              key="myMovies"
              icon={() => <MenuIcon source={require('./images/movie.png')} />}
              component={MyMovies}
              title="Movie List"
              back
            />
            <Scene
              key="colleagueList"
              icon={() => <MenuIcon source={require('./images/group.png')} />}
              component={CollegueList}
              title="Colleague List"
              back
            />
          </Tabs>
        </Scene>
        <Scene key="userInfo" component={UserInfo} title="Your Info" back />
        <Scene key="movieInfo" component={MovieInfo} title="Movie Info" back />
        <Scene key="movieList" component={MovieList} title="Movie List" back />
      </Stack>
    </Router>
  );
};

export default AppRouter;
