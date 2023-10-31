# Live Chat Application
[![ci](https://github.com/ttiimmothy/live-chat-application/actions/workflows/ci.yml/badge.svg)](https://github.com/ttiimmothy/live-chat-application/actions/workflows/ci.yml)
[![cd](https://github.com/ttiimmothy/live-chat-application/actions/workflows/cd.yml/badge.svg)](https://github.com/ttiimmothy/live-chat-application/actions/workflows/cd.yml)
[![pages-build-deployment](https://github.com/ttiimmothy/live-chat-application/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ttiimmothy/live-chat-application/actions/workflows/pages/pages-build-deployment)

A live chat application using `Typescript`, `React` amd `Vite`. It uses `React Bootstrap` and `Tailwind CSS` for simplifying CSS usage. The application uses `firebase authentication` for google login, `firebase cloud firestore` to store the data and `react-router` to do routing.

## 🎯 Features

- create chatrooms
- real time chats update
- chat with different users in different chatrooms
- delete chatrooms
- correct the message if you want
- google login

## 🖥 Prerequisites

- Node.js (version 12.0 or above)
- npm (which comes with Node.js) or Yarn (version 1.22.0 or above)

## 🔧 Usage
### Build packages and Run

```TypeScript
npm install
npm run dev
```

## :scroll: Environment Variables

#### details see the `.env.example` files

- `firebase` public api key
- `firebase` auth domain
- `firebase` project id
- `firebase` storage bucket
- `firebase` sender id
- `firebase` app id
- `firebase` analytic id

If you use `github pages` for static page deployment, you need to set these environmental variables in github action`secrets`.

## 🖼 Preview
![preview1](/public/preview1.png)

## :scroll: Icon Library

- from **<https://css.gg/>**

```HTML
https://css.gg/css
```

## License

This repository is licensed under the GNU Affero General Public License v3.0.