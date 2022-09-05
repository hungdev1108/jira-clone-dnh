import React from "react";
import HTMLReactParser from "html-react-parser";

export default function InfoMain(props) {
  const { projectName, members } = props.projectDetail;

  //   console.log(HTMLReactParser(projectDetail?.description));
  //   const { projectName, members, description } = props.projectDetail;

  const renderAvatar = () => {
    return members?.map((member, index) => {
      return (
        <div key={index} className="avatar">
          <img src={member.avatar} alt={member.name} />
        </div>
      );
    });
  };

  return (
    <div className="container mt-3">
      <div>
        <h3>{projectName}</h3>
        {/* <span>{HTMLReactParser(description)}</span> */}
      </div>

      <div className="info align-items-center" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Members of the project:
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        {/* <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div> */}
      </div>
    </div>
  );
}
