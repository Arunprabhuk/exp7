import {
  FileAddOutlined,
  FileExcelFilled,
  FolderAddFilled,
  LeftCircleFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  updateFileName,
  updateFileNameArray,
  updateStructure,
} from "../redux/slices/FileExplorerSlice";
import solidity from "../assets/images/solidity.png";
import Collapse from "./Collapse";
import {
  updateActiveFile,
  uploadEditorContent,
} from "../redux/slices/ConsoleSlice";

const FileComponent = () => {
  const dispatch = useDispatch();
  const { structure, fileName, fileNameArray } = useSelector(
    (state) => state.fileExpoReducer
  );
  const { activeFile, editorContent } = useSelector(
    (state) => state.consoleReducer
  );
  const [count, setCount] = useState(0);
  const [fileClicked, setFileClicked] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const onCreateFile = () => {
    if (!fileClicked) {
      const childFiles = _.flatMap(structure, "childs");

      setCount(count + 1);
      setFileClicked(true);
      setAutoFocus(true);
      dispatch(updateStructure([...childFiles, { id: count + 1, lable: `` }]));
    }
  };
  const onHandleChange = (e, id) => {
    const { value } = e.target;

    dispatch(updateFileName(value));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && fileClicked) {
        const childFiles = _.flatMap(structure, "childs");
        if (fileName === "") {
          const childFiles = _.filter(
            _.flatMap(structure, "childs"),
            (item) => item.lable !== ""
          );
          dispatch(updateStructure(childFiles));
          setFileClicked(false);
        } else {
          if (fileName.endsWith(".sol")) {
            const changeName = _.flatMap(
              [childFiles[childFiles.length - 1]],
              (item) => {
                return {
                  ...item,
                  lable: fileName,
                };
              }
            );
            const allValues = [...childFiles, ...changeName];
            const uniqueArray = _.filter(
              allValues,
              (item) => item.lable !== ""
            );

            setFileClicked(false);

            dispatch(updateFileNameArray([...fileNameArray, fileName]));
            dispatch(updateStructure(uniqueArray));
            dispatch(updateActiveFile(count - 1));
            dispatch(
              uploadEditorContent({
                ...editorContent,
                [count - 1]: `contract ${"Name"} {

                  
                }`,
              })
            );
            dispatch(updateFileName(""));
          } else {
            setAutoFocus(false);
            alert("ends with .sol");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [fileClicked, structure, fileName]);

  const onCreateFolder = () => {};
  return (
    <div>
      <div
        style={{
          height: 30,
          width: "100%",
          display: "flex",
          marginRight: 5,
          marginTop: 2,
          justifyContent: "flex-end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={"file"}>
            <FileAddOutlined
              onClick={onCreateFile}
              style={{ color: "#ffffff70", marginLeft: 5 }}
            />
          </Tooltip>
          <Tooltip title={"folder"}>
            <FolderAddFilled
              onClick={onCreateFolder}
              style={{ color: "#ffffff70", marginLeft: 5 }}
            />
          </Tooltip>
        </div>
      </div>
      <Collapse defaultExpanded={true}>
        {structure.map(
          (item) =>
            item.childs.length > 0 &&
            item.childs.map((child, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                  key={index}
                >
                  <img
                    src={solidity}
                    alt="file"
                    style={{ width: 18, height: 18 }}
                  />
                  <input
                    style={{
                      background: "none",
                      outline: "none",
                      color: "white",
                      border: "none",
                      marginBlock: 10,
                    }}
                    onChange={(e) => onHandleChange(e, child.id)}
                    autoFocus={autoFocus && !fileName.endsWith(".sol")}
                  />
                </div>
              );
            })
        )}
      </Collapse>
    </div>
  );
};

export default FileComponent;
