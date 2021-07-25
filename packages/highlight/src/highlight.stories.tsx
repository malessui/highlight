import React from 'react'
import { Meta } from '@storybook/react';
import ShiplessHigh from "./index"

export default {
  component: ShiplessHigh,
  title: 'Shipless',
} as Meta;

export const Basic: React.VFC<{}> = () => {
  const codeSnippetBasic = `module.exports = {
    ...
    plugins: [
      ...
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "cheatsheets",
          path: "\${__dirname}/src/data/cheatsheets",
        },
      },
      ...
    ],
  }`
  return <ShiplessHigh code={codeSnippetBasic} lang="js"/>
};
export const InlineHighlight: React.VFC<{}> = () => {
  const codeSnippetInline = `module.exports = {
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
  return <ShiplessHigh code={codeSnippetInline} lang="js"/>
}
export const BlockHighlight: React.VFC<{}> = () => {
  const codeSnippetBlock = `module.exports = {
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
  return <ShiplessHigh code={codeSnippetBlock} lang="js"/>
}