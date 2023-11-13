import {
  BulbFilled,
  BulbOutlined,
  CaretDownFilled,
  CaretUpFilled,
  CloseOutlined,
  DownCircleFilled,
  DownCircleTwoTone,
  DownOutlined,
  DownSquareTwoTone,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
// import MonacoEditor from "react-monaco-editor";
import Editor from "@monaco-editor/react";
import {
  updateActiveFile,
  updateShowConsole,
  uploadEditorContent,
} from "../redux/slices/ConsoleSlice";
import { useSelector, useDispatch } from "react-redux";
import solidity from "../assets/images/solidity.png";
import solc from "solc";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { showConsole, activeFile, editorContent } = useSelector(
    (state) => state.consoleReducer
  );
  const { showSideNav, structure, fileNameArray } = useSelector(
    (state) => state.fileExpoReducer
  );
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        dispatch(updateShowConsole(!showConsole));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  const onHandleClick = () => {
    dispatch(updateShowConsole(!showConsole));
  };
  const onHandleFileClick = (index) => {
    dispatch(updateActiveFile(index));
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "vs-dark" : "light");
  };
  const handleEditorChange = (value) => {
    const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");
    console.log(activeFile);
    dispatch(
      uploadEditorContent({
        ...editorContent,
        [activeFile]: value,
      })
    );
  };
  const onEditorDidMount = (editor, monoco) => {
    console.log("hekk");
    editorRef.current = editor;
    console.log(monoco);

    editorRef.current.onDidChangeModelDecorations(() => {
      const model = editorRef.current.getModel();
      console.log(model);
      if (model) {
        const tokens = editorRef.current.getAllToken();
        tokens.forEach((token) => {
          if (token.type === "keyword") {
            const startPos = token.range.startColumn - 1;
            const endPos = token.range.endColumn - 1;
            editorRef.current.deltaDecorations(
              [],
              [
                {
                  range: new window.monaco.Range(
                    token.range.startLineNumber,
                    startPos,
                    token.range.endLineNumber,
                    endPos
                  ),
                  options: { inlineClassName: "custom-keyword" },
                },
              ]
            );
          }
        });
      }
    });
  };
  const compileSolidity = () => {
    try {
      const input = {
        language: "Solidity",
        sources: {
          "YourContract.sol": {
            content: fileNameArray[activeFile],
          },
        },
        settings: {
          outputSelection: {
            "*": {
              "*": ["*"],
            },
          },
        },
      };

      const compiledOutput = JSON.parse(solc.compile(JSON.stringify(input)));

      setOutput(compiledOutput);
    } catch (error) {
      console.error("Compilation error:", error);
    }
  };
  const handleKeyDown = (event) => {
    // Check for "Ctrl + S" (key code 83)
    if (event.ctrlKey && event.keyCode === 83) {
      event.preventDefault(); // Prevent the default browser save action
      compileSolidity();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.addEventListener("keydown", handleKeyDown);
    };
  }, [fileNameArray]);
  console.log(output);
  return (
    <div
      style={{
        flex: showSideNav ? 0.8 : 0.95,
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      {fileNameArray.length > 0 && (
        <div
          style={{
            height: 40,
            background: theme === "vs-dark" ? "#1e1e1e" : "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 0.9, marginLeft: 15, display: "flex" }}>
            {fileNameArray.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: 100,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2px 10px",
                    border: 0.5,
                    borderStyle: "solid",
                    borderColor:
                      index === activeFile ? "yellow" : "transparent",
                    cursor: "pointer",
                    boxShadow:
                      theme === "vs-dark"
                        ? "green 0px 0px 8px"
                        : "grey 0px 0px 8px",
                    borderRadius: 20,
                    marginInline: 10,
                  }}
                >
                  <div
                    onClick={() => onHandleFileClick(index)}
                    style={{ flex: 0.95 }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: theme === "vs-dark" ? "white" : "black",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                  <CloseOutlined
                    style={{
                      fontSize: 12,
                      color: theme === "vs-dark" ? "white" : "black",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              flex: 0.1,
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 15,
              alignItems: "center",
            }}
          >
            <BulbFilled
              onClick={toggleTheme}
              style={{ color: theme === "light" ? "black" : "white" }}
            />
          </div>
        </div>
      )}

      {fileNameArray.length === 0 && (
        <div
          style={{
            height: showConsole ? "60%" : "calc(100% - 50px)",
            background: "#191d1f",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <img
              src={solidity}
              alt="solidity"
              style={{ width: 124, height: 124 }}
            />
            <p style={{ color: "white" }}>Learn Solidity</p>
          </div>
        </div>
      )}
      {fileNameArray.length > 0 && activeFile !== null && (
        <Editor
          height={showConsole ? "60%)" : "calc(100% - 49px)"}
          theme={theme}
          language="solidity"
          value={editorContent[activeFile]}
          onChange={handleEditorChange}
          onMount={onEditorDidMount}
        />
      )}

      <div
        style={{
          background: "#30322f",
          width: "100%",
          height: showConsole ? "40%" : "20px",
          position: "absolute",
          bottom: 5,
        }}
      >
        <div
          style={{
            width: "100%",
            padding: 0,
            height: 20,
          }}
        >
          {showConsole && (
            <Tooltip title={"Hide Terminal"}>
              <CaretDownFilled
                onClick={onHandleClick}
                style={{
                  marginInline: 10,
                  color: "yellow",
                }}
                size={10}
                color="red"
              />
            </Tooltip>
          )}
          {!showConsole && (
            <Tooltip title={"Show Terminal"}>
              <CaretDownFilled
                onClick={onHandleClick}
                style={{
                  marginInline: 10,
                  color: "yellow",
                }}
                size={10}
                color="red"
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
