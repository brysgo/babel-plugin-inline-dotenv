# babel-plugin-inline-dotenv

Load your `.env` file and replace `process.env.MY_VARIABLE` with the value you set.

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