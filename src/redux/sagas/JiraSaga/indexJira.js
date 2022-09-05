import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../../components/JiraApp/Main/ContentMain";
import HeaderMain from "../../../components/JiraApp/Main/HeaderMain";
import InfoMain from "../../../components/JiraApp/Main/InfoMain";

export default function IndexJira(props) {
  let { projectDetail } = useSelector((state) => state.ProjectEditReducer);

  console.log("projectDetail", projectDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    // Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ trên url thì ta sẽ lấy tham số từ url => gọi saga
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId,
    });
  }, []);

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
