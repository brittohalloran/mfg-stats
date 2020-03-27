import React from "react";

const SampleSize = () => {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <h3 className="text-uppercase font-weight-bold">
          Sample Size Determination
        </h3>

        <div className="row">
          <div className="col-md-6">
            <h5 className="text-uppercase font-weight-bold">
              Attribute (pass/fail) data
            </h5>
            <p>
              If we don't have variable numerical data we have to use the zero
              failure attribute method based on the cumulative binomial
              distribution. This is sometimes called the <code>c=0</code> table.
              Note that the because we don't know how much margin each sample is
              passing by, sample sizes required by this method are very high as
              compared to variable data. If a different measurement method that
              generates variable data is available, it's usually a better
              option.
            </p>
            <h6 className="text-uppercase font-weight-bold">Calculation</h6>
            <p>
              The sample size can be calculated with the following equation:
            </p>
            <p className="text-center">
              <code>n = ln(1 - C) / ln(R)</code>
            </p>
            <p>
              Round this value up to the next integer. Required sample sizes for
              typical confidence and reliability levels are shown below.
            </p>
            <table className="table table-sm small text-mono">
              <thead>
                <tr>
                  <th className="text-center">Risk level</th>
                  <th className="text-center">Confidence</th>
                  <th className="text-center">Reliability</th>
                  <th className="text-center">Samples required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Low</td>
                  <td className="text-center">0.90</td>
                  <td className="text-center">0.80</td>
                  <td className="text-center">11</td>
                </tr>
                <tr>
                  <td>Medium</td>
                  <td className="text-center">0.90</td>
                  <td className="text-center">0.90</td>
                  <td className="text-center">22</td>
                </tr>
                <tr>
                  <td>High</td>
                  <td className="text-center">0.95</td>
                  <td className="text-center">0.95</td>
                  <td className="text-center">59</td>
                </tr>
                <tr>
                  <td>Critical</td>
                  <td className="text-center">0.95</td>
                  <td className="text-center">0.99</td>
                  <td className="text-center">299</td>
                </tr>
              </tbody>
            </table>
            <h6 className="text-uppercase font-weight-bold">Interpretation</h6>
            <p>
              If all <code>n</code> samples pass, we are <code>C%</code>{" "}
              confidence that at least <code>R%</code> of the population will
              pass.
            </p>
            <h6 className="text-uppercase font-weight-bold">
              Recommended Acceptance Criteria
            </h6>
            <p>
              All <code>n</code> samples must pass.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-uppercase font-weight-bold">Variable data</h5>
            <p>
              The best statistical method to test whether a population of parts
              meets some specified limits based on a measurement of a sample of
              that population is a tolerance interval. A tolerance interval is a
              statistical interval within which a specified proportion{" "}
              <code>P</code> of a sampled population falls, with confidence
              level <code>C</code>. The word <i>tolerance</i> in this case has
              nothing to do with dimensional tolerances. When a set of data is
              observed, its parameters (mean, standard deviation) are not
              necessarily exactly equal to that of the population. Therefore we
              need to incorporate that sampling error uncertainty, which will{" "}
              <i>widen</i> our tolerance interval.
            </p>
            <h6 className="text-uppercase font-weight-bold">Calculation</h6>
            <p>
              The upper and lower ends of a tolerance interval have the form:
            </p>
            <p className="text-center">
              <code>(m - k*s, m + k*s)</code>
            </p>
            <p>
              Where <code>m</code> is the sample mean, and <code>s</code> is the
              sample standard deviation.
            </p>
            <p>
              The calculation of the <code>k</code> value for a tolerance
              interval goes deep into strange distributions very quickly. For
              one-sided tolerance intervals of normally distributed data, there
              is an exact solution which uses the non-central t-distribution.
              For two-sided tolerance intervals, there is a chi-squared based
              solution. Practically speaking, a calculator or lookup table is
              typically used to find a <code>k</code> value given <code>C</code>
              , <code>P</code>, and <code>n</code>.
            </p>
            <h6 className="text-uppercase font-weight-bold">Interpretation</h6>
            <p>
              We are <code>C%</code> confident that at least <code>P%</code> of
              the population falls within the interval{" "}
              <code>(m - k*s, m + k*s)</code>.
            </p>
            <h6 className="text-uppercase font-weight-bold">
              Recommended Acceptance Criteria
            </h6>
            <p>
              The tolerance interval shall fall completely within the
              specification limits, i.e. the following two conditions hold:
            </p>
            <p class="text-center mb-0">
              <code>m + k*s &lt; USL</code>
            </p>
            <p class="text-center">
              <code>LSL &lt; m - k*s</code>
            </p>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default SampleSize;
