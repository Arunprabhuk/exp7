// src/components/FileExplorer.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Tooltip } from "antd";
import { explorer } from "../data/explore";
import "../styles/collapse.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FileOutlined,
  LeftOutlined,
  RightOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import {
  navType,
  updateNavType,
  updateSideNavDrawer,
} from "../redux/slices/FileExplorerSlice";
import FileComponent from "./FileComponent";
import DeployComponent from "./DeployComponent";

const FileExplorer = () => {
  const dispatch = useDispatch();
  const { showSideNav, navType } = useSelector(
    (state) => state.fileExpoReducer
  );
  const onHandleClick = (type) => {
    dispatch(updateNavType(type));
  };
  const onHideShowDrawer = () => {
    dispatch(updateSideNavDrawer(!showSideNav));
  };
  return (
    <div
      style={{
        flex: showSideNav ? 0.2 : 0.04,
        border: 2,
        borderStyle: "solid",
        borderColor: "black",
        background: "#1e1e1e",
        display: "flex",
      }}
    >
      <div style={{ height: "100%", width: 50, background: "#30322f40" }}>
        <div
          style={{
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: navType === "file" && "green 1px 1px 8px",
          }}
          onClick={() => onHandleClick("file")}
        >
          <Tooltip placement="rightBottom" title={"File"}>
            <FileOutlined style={{ fontSize: 25, color: "white" }} />
          </Tooltip>
        </div>
        <div
          style={{
            height: 50,
            display: "flex",
            boxShadow: navType === "deploy" && "green 1px 1px 8px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => onHandleClick("deploy")}
        >
          <Tooltip placement="rightBottom" title={"Deploy"}>
            <RocketOutlined style={{ fontSize: 25, color: "white" }} />
          </Tooltip>
        </div>
      </div>
      <div style={{ width: showSideNav ? "255px" : "30px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "40px",
            background: "#ffffff01",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {showSideNav && (
              <h4 style={{ color: "white", marginLeft: 25 }}>
                {navType === "file" ? "Files" : "Deploy"}
              </h4>
            )}
            <div>
              {showSideNav && (
                <Tooltip placement="rightBottom" title={"Hide"}>
                  <LeftOutlined
                    onClick={onHideShowDrawer}
                    style={{ color: "white", fontSize: 15 }}
                  />
                </Tooltip>
              )}
              {!showSideNav && (
                <Tooltip placement="rightBottom" title={"Show"}>
                  <RightOutlined
                    onClick={onHideShowDrawer}
                    style={{ color: "white", fontSize: 15, marginLeft: 10 }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        {navType === "file" && showSideNav && <FileComponent />}
        {navType === "deploy" && <DeployComponent />}
      </div>
    </div>
  );
};

export default FileExplorer;
