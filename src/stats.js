import { normal, stdev, seq } from "jstat";
import { ShapiroWilkW } from "./shapiro";

export const mean = a => a.reduce((p, c) => p + c, 0) / a.length;

export const sd = a => {
  // Sample standard deviation
  return stdev(a, true);
};

export const cpk = (m, sd, lsl, usl) => {
  const lower = lsl ? (m - lsl) / (3 * sd) : null;
  const upper = usl ? (usl - m) / (3 * sd) : null;
  return lower ? (upper ? Math.min(lower, upper) : lower) : null;
};

export const uniform_order_statistic_medians = n => {
  // Calculate the uniform order statistic medians
  const osmax = 0.5 ** (1 / n);
  const osmin = 1 - osmax;
  const os = seq(osmin, osmax, n);
  return os;
};

export const quantiles = a => {
  // Calculate the theoretical quantiles of the normal distribution
  a.sort((a, b) => a - b);
  const os = uniform_order_statistic_medians(a.length);
  const q = os.map(v => {
    let n = normal.inv(v, 0, 1);
    return n;
  });
  return [a, q];
};

export const shapiroWilk = x => {
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
