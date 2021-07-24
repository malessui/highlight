// @ts-nocheck
import React from "react"
import Highlight, {defaultProps} from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import "./styles.css"

let highlightAddStart = false;
let highlightRemoveStart = false;
// const highlightClassName = "gatsby-highlight-code-line";
const highlightAddClassName = "bg-highlight-add";
const highlightRemoveClassName = "bg-highlight-remove";
const highlightLineClassName = "bg-highlight-line";

const highlightLine = (lineArray, lineProps) => {
  let shouldExclude = false;

  lineArray.forEach((line) => {
    const content = line.content;

    // Highlight lines with "// highlight-line"
    if (content.replace(/\s/g, "").includes("//highlight-line")) {
      lineProps.className = `${lineProps.className} ${highlightLineClassName}`;
      line.content = content
        .replace("// highlight-line", "")
        .replace("//highlight-line", "");
    }

    // Stop highlighting
    if (!!highlightAddStart && content.replace(/\s/g, "") === "//highlight-add-end") {
      highlightAddStart = false;
      shouldExclude = true;
    }

    if (!!highlightRemoveStart && content.replace(/\s/g, "") === "//highlight-remove-end") {
      highlightRemoveStart = false;
      shouldExclude = true;
    }

    // Start highlighting after "//highlight-start"
    if (content.replace(/\s/g, "") === "//highlight-add-start") {
      highlightAddStart = true;
      shouldExclude = true;
    }

    if (content.replace(/\s/g, "") === "//highlight-remove-start") {
      highlightRemoveStart = true;
      shouldExclude = true;
    }
  });

  // Highlight lines between //highlight-start & //highlight-end
  if (highlightAddStart) {
    lineProps.className = `${lineProps.className} ${highlightAddClassName}`;
  }

  if (highlightRemoveStart) {
    lineProps.className = `${lineProps.className} ${highlightRemoveClassName}`;
  }

  return {shouldExclude, highlightAddStart, highlightRemoveStart};
}



const CodeBlock: React.FC = ({code, lang}) => {
  // const matches = children.props.className.match(/language-(?<lang>.*)/);
  return (
    <Highlight
      {...defaultProps}
      code={code}
      theme={theme}
      language={lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} sl-highlight-pre relative`} style={style}>
          <div className="sl-highlight-lang absolute top-0 right-2 text-sm sm:text-base uppercase p-2 font-semibold">
            <span>{lang}</span>
          </div>
          {tokens.map((line, i) => {
            // if (!line[0].empty) {
              const lineProps = getLineProps({ line, key: i });
              const {shouldExclude, highlightAddStart, highlightRemoveStart} = highlightLine(line, lineProps);
              return !shouldExclude ? (
                <div key={i} {...lineProps}>
                  {highlightAddStart ? <span className="sl-highlight-add">+</span> : null}
                  {highlightRemoveStart ? <span className="sl-highlight-remove">-</span> : null}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ) : null
            // }
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock