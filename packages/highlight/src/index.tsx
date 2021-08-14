// @ts-nocheck
import React, { useState, useCallback, useEffect } from "react"
import Highlight, {defaultProps} from "prism-react-renderer"
import copy from "copy-to-clipboard"
import theme from "prism-react-renderer/themes/nightOwl"
import "./styles.css"

let highlightAddStart = false;
let highlightRemoveStart = false;
// const highlightClassName = "gatsby-highlight-code-line";
const highlightAddClassName = "bg-highlight-add";
const highlightRemoveClassName = "bg-highlight-remove";
const highlightLineClassName = "bg-highlight-line";

function useClipboard(text: string, timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(() => {
    const didCopy = copy(text);
    setHasCopied(didCopy);
  }, [text]);

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false);
      }, timeout);

      return () => clearTimeout(id);
    }
  }, [timeout, hasCopied]);

  return { value: text, onCopy, hasCopied };
}


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
  const { hasCopied, onCopy } = useClipboard(code)

  return (
    <Highlight
      {...defaultProps}
      code={code}
      theme={theme}
      language={lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} sl-highlight-pre relative`} style={style}>
          <div className="flex absolute -mx-2 top-0 right-0 p-2">
            <div className="px-2">
              <button type="button" onClick={onCopy} className="sl-highlight-lang flex items-center transition-all hover:bg-gray-800 rounded-md px-3 py-1 text-sm sm:text-base uppercase p-2 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                  {
                    hasCopied ? (
                      <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    ) : null
                  }
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
                <span className="ml-2">{hasCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="px-2">
              <div className="sl-highlight-lang text-sm sm:text-base pr-3 py-1 uppercase font-semibold">
                <span>{lang}</span>
              </div>
            </div>
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