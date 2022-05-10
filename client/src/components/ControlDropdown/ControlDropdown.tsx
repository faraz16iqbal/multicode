import React from "react";
import "./ControlDropdown.scss";

const ControlDropdown: React.FC<any> = (props) => {
  return (
    <div className="control-dropdown">
      <select value={props.options.default} onChange={props.handleDropdown}>
        {props.options.map((option: any) => (
          <option value={option.code}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default ControlDropdown;
