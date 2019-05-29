# Habotica
[Habotica](https://play.google.com/store/apps/details?id=com.dexx.habotica&hl=nl) is an Android app, built in React Native, that automates some of the more tedious tasks involved in maintaining a [Habitica](habitica.com) account. 

## Getting started
Habotica is written in [TypeScript](https://www.typescriptlang.org/) using [React Native](https://facebook.github.io/react-native/). Scaffolding is done by [Expo](https://docs.expo.io/versions/latest/sdk/facebook/) and [Yarn](https://yarnpkg.com/en/). 

Once you have all of those installed, running 
`yarn`
will install dependencies and
`yarn run start`
will start the application. 

## Development
We recommend installing an [Android emulator](https://developer.android.com/studio/run/emulator) for speedy development, though the app can also be loaded on your phone if you want to hit the ground running. Instructions for opening the app on various platforms can be found in the Expo documentation. 

By default, Habotica will target the Habitica production API, which means a valid Habitica account is required for development and testing. Alternately, starting the app with `yarn run start:dev` will configure it to target a Habitica instance running on your machine. This both allows for easier testing, as test users can be easily manipulated and discarded, and relieves the load on poor hard-working Habitica servers. However, it does require Habotica is run on an emulator and setting up a local Habitica instance.

Bonus: running a local instance is an excellent first step in becoming a Habitica contributor! Instructions on how to get started can be found [here](https://habitica.fandom.com/wiki/Setting_up_Habitica_Locally)!

## Disclaimer
This read me is shorter than it might be, mostly because I don't actually expect people to contribute, but also because I'm not really sure what kind of trouble people are going to run into. That brevity does not, in any way, reflect any lack in respect or heartfelt love for anyone who wants to help out, merely my low expectations and pragmatism. So if you want to get started and get stuck using the instructions above, please don't hesitate to drop me a line: I'm more than happy to help out. 