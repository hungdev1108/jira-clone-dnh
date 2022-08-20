import React from "react";

export default function Detail(props) {
  return <div>{props.match.params.id}</div>;
}
