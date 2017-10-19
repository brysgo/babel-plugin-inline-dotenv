# babel-plugin-inline-dotenv

[![Greenkeeper badge](https://badges.greenkeeper.io/brysgo/babel-plugin-inline-dotenv.svg)](https://greenkeeper.io/)

[![status](https://circleci.com/gh/brysgo/babel-plugin-inline-dotenv.svg?style=shield)](https://circleci.com/gh/brysgo/babel-plugin-inline-dotenv)

Load your `.env` file and replace `process.env.MY_VARIABLE` with the value you set.

tl;dr

It actually replaces `process.env.MY_VARIABLE` with:

    process && process.env && process.env.MY_VARIABLE || 'value assigned to variable in dotenv'

This way, if the value is available at runtime it will be used instead.

## Installation

```sh
$ npm install babel-plugin-inline-dotenv
```

## Usage

### Via `.babelrc` (Recommended)

Without options:

**.babelrc**

```js
{
  "plugins": ["inline-dotenv"]
}
```

With options:

```js
{
  "plugins": [["inline-dotenv",{
    path: 'path/to/.env' // See motdotla/dotenv for more options
  }]]
}
```

### Via CLI

```sh
$ babel --plugins inline-dotenv script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["inline-dotenv"]
});
```