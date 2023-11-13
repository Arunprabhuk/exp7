import {
  CaretDownFilled,
  CaretLeftFilled,
  CaretRightFilled,
} from "@ant-design/icons";
import React, { useState } from "react";
import folder from "../assets/images/folder.png";

const Collapse = ({ children, defaultExpanded }) => {
  const [isExpanded, setExpanded] = useState(defaultExpanded);

  const toggleCollapse = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        onClick={toggleCollapse}
        style={{ cursor: "pointer", paddingLeft: 5 }}
      >
        <div style={{ backgroundColor: "transparent", display: "flex" }}>
          {isExpanded ? <CaretDownFilled /> : <CaretRightFilled />}
          <img src={folder} alt="folder" style={{ width: 22, height: 22 }} />
          <span style={{ color: "white", marginInline: 5 }}>Contracts</span>
        </div>
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  );
};

export default Collapse;
