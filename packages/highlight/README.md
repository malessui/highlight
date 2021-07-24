<p align="center">
  <a href="https://github.com/shipless/highlight">
    <img alt="shipless" src="https://res.cloudinary.com/muhrusdi/image/upload/v1627117012/highlight-code.png" width="100%" />
  </a>
</p>

# Shipless Highlight

Shipless Highlight is a Renders highlighted Prism output to React 

[![npm (scoped)](https://img.shields.io/npm/v/@shipless/highlight?style=for-the-badge)](https://www.npmjs.com/package/@shipless/highlight)
[![npm](https://img.shields.io/npm/dt/@shipless/highlight?label=Download&style=for-the-badge)](https://www.npmjs.com/package/@shipless/highlight)
![NPM](https://img.shields.io/npm/l/@shipless/highlight?style=for-the-badge)
## Installation

Use the package manager `yarn` or `npm` to install this package.

```bash
yarn add @shipless/highlight
# or
npm install @shipless/highlight
```

## Usage

`import` @shipless/highlight package suck as the following:

```js
import Highlight from "@shipless/highlight"

const codeSnippet = `module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem", // highlight-line
      options: {
        // highlight-remove-start
        name: "cheatsheets",
        path: "\${__dirname}/src/data/cheatsheets",
        // highlight-remove-end
        // highlight-add-start
        name: "blogs",
        path: "\${__dirname}/src/data/blogs",
        // highlight-add-end
      },
    },
    ...
  ],
}`

<Highlight code={codeSnippet} lang="js"/>
```

 Then you must import style on your css file:
 ```css
 @import url("@shipless/highlight/dist/style.css");
 ```

 ## Demo

 [Example](https://shipless-highlight.netlify.app/)

 ## API

|      Props       |                          description                       |   default                                | required |
| :--------------: | :--------------------------------------------------------: | :--------------------------------------: | :------: |
|        lang        |             languange that your code             |                                          |   true  |
|  code            |            Initial code to be displayed                    |                                          |   true   |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)