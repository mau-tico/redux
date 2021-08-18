import React from "react";

const Fatal = (props) => (
  <h2 className="center">{`${"Error de URL: "}${props.mensaje}`}</h2>
);

export default Fatal;
