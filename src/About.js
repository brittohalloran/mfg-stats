import React from "react";

const About = () => {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <h5 className="text-uppercase font-weight-bold">About</h5>
        <p>
          This calculator is an open-source calculator built 100% in javascript.
          No data leaves your browser, which can be verified by performing an
          analysis with your internet connection off.
        </p>
        <p>
          <a href="https://github.com/brittohalloran/mfg-stats">
            View the source code on Github
          </a>
        </p>
        <p className="text-mono small text-muted">
          Created by{" "}
          <a href="https://www.linkedin.com/in/brittohalloran/">
            Britt O'Halloran
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
