import React from "react";
import MathJax from "mathjax";

function Equation(props) {
  MathJax.typeset();
  return <span>\[{props.tex}\]</span>;
}

export default Equation;
