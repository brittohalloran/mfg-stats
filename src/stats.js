import { normal, stdev, seq } from "jstat";

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
  console.log("a", a);
  a.sort((a, b) => a - b);
  const os = uniform_order_statistic_medians(a.length);
  const q = os.map(v => {
    let n = normal.inv(v, 0, 1);
    console.log(n);
    return n;
  });
  console.log(a, os, q);
  return [a, q];
};
