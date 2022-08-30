import React from "react";
import ContentMain from "../../../components/JiraApp/Main/ContentMain";
import HeaderMain from "../../../components/JiraApp/Main/HeaderMain";
import InfoMain from "../../../components/JiraApp/Main/InfoMain";

export default function indexJira() {
  return (
    <div className="main">
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
