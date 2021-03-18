import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import MovieList from '../components/MovieList';
import ColleagueList from '../components/ColleagueList';

const MovieMenu: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'movieList', title: 'Movie List' },
    { key: 'colleagueList', title: 'Colleague List' },
  ]);

  const renderScene = SceneMap({
    first: MovieList,
    second: ColleagueList,
  });

  return (
    <View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        tabBarPosition="bottom"
        lazy={({ route }) => route.title === 'Movie List'}
        lazyPreloadDistance={0}
        renderTabBar={(props) => <TabBar {...props} />}
        renderLazyPlaceholder={() => (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MovieMenu;
