# babel-plugin-inline-dotenv

![Test](https://github.com/brysgo/babel-plugin-inline-dotenv/workflows/Test/badge.svg)

[![npm package](https://nodei.co/npm/babel-plugin-inline-dotenv.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/babel-plugin-inline-dotenv/)


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

To replace with env value without `process && process.env && process.env.MY_VARIABLE ||` safety:

```js
{
  "plugins": [["inline-dotenv",{
    unsafe: true
  }]]
}
```

The plugin support 3 mode to read the env var from the system :

```js
{
  "plugins": [["inline-dotenv",{
    systemVar: 'all' | 'overwrite' | 'disable'
  }]]
}
```

- `all` _default_, every env var found in process.env will be used

  > ⚠️ This could leak super secret stuffs !

- `overwrite`, the value in process.env will overwrite the one present in .env only. Your .env file act as a whitelist

- `disable`, the process.env will not be used at all

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
