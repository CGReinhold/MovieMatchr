# Movie Matchr

A proof of concept app fpr syncing and matching movies you're willing to watch with friends.

![Movie Matchr](/assets/movieMatchr.gif)

## Roadmap

- [ ] Add Login to pair with friend (now it's using random generated IDs for each user)
- [ ] Allow users to undo like/dislike
- [ ] Allow users to super like a movie and let it's friend know of it
- [ ] Use push notification to warn when a friend matched a movie with you
- [ ] Consider likes from friends before the added you (now it will only match if a friend already has added you as a friend)
- [ ] Allow to configure filters for movies (by year/genre/netflix/prime)
- [ ] Improve usability and visual identity

## How to run

To have the app properly working, you should create a firebase project and add the `google-services.json` on the `./android/app` folder.

### Android

```npm run android```

### iOS

Since I don't have a mac device I wasn't able to configure the app to run on iOS.
