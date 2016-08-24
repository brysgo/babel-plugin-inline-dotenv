# babel-plugin-inline-dotenv

Load your `.env` file and replace `process.env.MY_VARIABLE` with the value you set.

## Installation

```sh
$ npm install babel-plugin-inline-dotenv
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["inline-dotenv"]
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