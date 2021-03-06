import { normal, chisquare, /* noncentralt,*/ seq } from "jstat";
import { ShapiroWilkW } from "./shapiro";

/** Rounds a float to a specified number of digits */
export const roundDigits = (f, n) =>
  parseFloat(Math.round(f + "e+" + n) + "e-" + n).toFixed(n);

/** Rounds a float to a specified number of significant figures */
export const roundSigFigs = (f, n) => parseFloat(f).toPrecision(n);

/** Returns the number of decimal places represented in the number */
export const countDigits = (s) => {
  const value = parseFloat(s);
  return Math.floor(value) === value
    ? 0
    : value.toString().split(".")[1].length || 0;
};

/** Calculates the arithmetic mean of an array */
export const mean = (a) => a.reduce((p, c) => p + c, 0) / a.length;

/** Calculates the sample standard deviation
 *
 *  Uses the n-1 sample standard deviation method
 *  Method based on jStat
 */
export const sd = (a) => {
  const m = mean(a);
  // Calculate sum of squared errors
  const sse = a.reduce((p, c) => p + (c - m) ** 2, 0);
  const variance = sse / (a.length - 1); // n-1 (sample std. dev.)
  return Math.sqrt(variance);
};

/** Calculates the process capability index Cpk for the lower spec */
export const cpkl = (m, sd, lsl) => {
  return lsl ? (m - lsl) / (3 * sd) : null;
};

/** Calculates the process capability index Cpk for the upper spec */
export const cpku = (m, sd, usl) => {
  return usl ? (usl - m) / (3 * sd) : null;
};

/** Calculates the process capability index Cpk */
export const cpk = (m, sd, lsl, usl) => {
  const lower = lsl ? (m - lsl) / (3 * sd) : null;
  const upper = usl ? (usl - m) / (3 * sd) : null;
  if (lower) {
    if (upper) {
      return Math.min(lower, upper);
    } else {
      return lower;
    }
  } else {
    if (upper) {
      return upper;
    } else {
      return null;
    }
  }
};

/** Calculates the uniform order statistic medians */
export const uniform_order_statistic_medians = (n) => {
  const osmax = 0.5 ** (1 / n);
  const osmin = 1 - osmax;
  const os = seq(osmin, osmax, n);
  return os;
};

/** Calculate the one or two sided tolerance interval k-factor
 *
 *  The k-factor is the number of standard deviations from the mean that the
 *  tolerance interval limit lies.
 *
 *  Tolerance interval = (m - k*sd, m + k*sd)
 *
 *  The k-factor is calculated per NIST guidance:
 *  https://www.itl.nist.gov/div898/handbook/prc/section2/prc263.htm
 *
 *
 */
export const tolerance_interval_factor = (c, p, n, one_sided = false) => {
  if (c && p && n) {
  } else {
    return NaN;
  }
  const dof = n - 1;
  if (one_sided) {
    // This one-sided method uses the Natrella 1963 method. The non-central
    // T distribution method may be more accurate (particularly for small
    // values of n) but jStat doesn't have the inverse CDF function for the
    // non-central T distribution. For n > 10 this method is acceptable.

    // Calculate the normal z-score for the given p and c values
    const z_p = normal.inv(p, 0, 1);
    const z_c = normal.inv(c, 0, 1);

    // Calculate a, b, and the k-factor
    const a = 1 - z_c ** 2 / (2 * (n - 1));
    const b = z_p ** 2 - z_c ** 2 / n;
    const k = (z_p + Math.sqrt(z_p ** 2 - a * b)) / a;

    return k;
  } else {
    // Calculate normal z-score for the given p-vaue
    const z_p = -normal.inv((1 - p) / 2, 0, 1);

    // Calculate chi-squared ISF for the given confidence level c
    const x_p = chisquare.inv(1 - c, dof);

    // Calculate the k-factor
    const k = Math.sqrt((dof * (1 + 1 / n) * z_p ** 2) / x_p);

    return k;
  }
};

/** Calculates the theoretical quantiles of the normal distribution */
export const quantiles = (a) => {
  a.sort((a, b) => a - b);
  const os = uniform_order_statistic_medians(a.length);
  const q = os.map((v) => {
    let n = normal.inv(v, 0, 1);
    return n;
  });
  return [a, q];
};

/**
 * Performs a Shapiro-Wilk normality test
 *
 * Returns the normal probability (p), in the range (0,1)
 */
export const shapiroWilk = (x) => {
  const n = x.length;
  const w = ShapiroWilkW(x);

  // From https://github.com/pieterprovoost/jerzy/blob/master/lib/normality.js
  var g, mu, sigma;

  if (n < 12) {
    var gamma = 0.459 * n - 2.273;
    g = -Math.log(gamma - Math.log(1 - w));
    mu =
      -0.0006714 * Math.pow(n, 3) +
      0.025054 * Math.pow(n, 2) -
      0.39978 * n +
      0.544;
    sigma = Math.exp(
      -0.0020322 * Math.pow(n, 3) +
        0.062767 * Math.pow(n, 2) -
        0.77857 * n +
        1.3822
    );
  } else {
    var u = Math.log(n);
    g = Math.log(1 - w);
    mu =
      0.0038915 * Math.pow(u, 3) -
      0.083751 * Math.pow(u, 2) -
      0.31082 * u -
      1.5851;
    sigma = Math.exp(0.0030302 * Math.pow(u, 2) - 0.082676 * u - 0.4803);
  }

  var z = (g - mu) / sigma;
  const p = 1 - normal.cdf(z, 0, 1);
  return p;
};
