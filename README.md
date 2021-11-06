<h1 align="center">
  <img alt="rentx" height="18" title="rentx" src=".github/logo.svg" />
</h1>

<p align="center">
  <img src="https://img.shields.io/github/stars/Sup3r-Us3r/ignite-project-rentx?label=stars&message=MIT&color=DC1637&labelColor=0A1033" alt="Stars">
  <img src="https://img.shields.io/github/forks/Sup3r-Us3r/ignite-project-rentx?label=forks&message=MIT&color=DC1637&labelColor=0A1033" alt="Forks">     
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=DC1637&labelColor=0A1033" alt="License">
</p>

![cover](.github/cover.png)

## 💻 Project

RentX is an app to make car bookings, it has an optimistic interface and the Offline First implementation using WatermelonDB.

## :hammer_and_wrench: Features

- [x] Local data storage
- [x] Offline First

## 🚀 Techs

- [x] [React Native](https://reactnative.dev)
- [x] [Expo](https://docs.expo.dev)
- [x] [TypeScript](https://www.typescriptlang.org)
- [x] [WatermelonDB](https://github.com/Nozbe/WatermelonDB)

## 💻 Run project

The app execution must be done with the commands listed below, and not with expo start, because of native modifications that had to be done for Offline First to work with WatermelonDB.

> Set your local IP Address on baseUrl to API working

Configure your IP on **api.ts** file: **ignite-project-rentx**/**mobile**/**src**/**services**/**api.ts**

```bash
# Open terminal and clone this repository
$ git clone https://github.com/Sup3r-Us3r/ignite-project-rentx.git

# Install dependencies for the server
$ cd ignite-project-rentx/server
$ npm install
# or
$ yarn install

# Start the server
$ npm run start
# or
$ yarn start

# Install dependencies for the app
$ cd ignite-project-rentx/mobile
$ npm install
# or
$ yarn install

# Start the application
$ npx react-native start
$ npx react-native run-android
```
