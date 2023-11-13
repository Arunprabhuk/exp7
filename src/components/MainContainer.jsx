import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import FileExplorer from "./FileExplorer";

const MainContainer = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        display: "flex",
        paddingBlock: 0,
      }}
    >
      <FileExplorer />
      <CodeEditor />
    </div>
  );
};

export default MainContainer;
