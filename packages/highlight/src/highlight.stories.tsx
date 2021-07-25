import React from 'react'
import { Meta } from '@storybook/react';
import ShiplessHigh from "./index"

const codeSnippetBasic = `module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cheatsheets",
        path: "\${__dirname}/src/data/cheatsheets",src/data/blogs",
      },
    },
    ...
  ],
}`
const codeSnippetSingle = `module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem", // highlight-line
      options: {
        name: "cheatsheets",
        path: "\${__dirname}/src/data/cheatsheets", // highlight-line
      },
    },
    ...
  ],
}`

const codeSnippetMulti = `module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-filesystem",
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

export default {
  component: ShiplessHigh,
  title: 'Shipless',
} as Meta;

export const Basic: React.VFC<{}> = () => <ShiplessHigh code={codeSnippetBasic} lang="js"/>;
export const InlineHighlight: React.VFC<{}> = () => <ShiplessHigh code={codeSnippetSingle} lang="js"/>;
export const BlockHighlight: React.VFC<{}> = () => <ShiplessHigh code={codeSnippetMulti} lang="js"/>;