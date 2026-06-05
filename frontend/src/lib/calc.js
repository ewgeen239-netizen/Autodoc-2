export function calc(peaks, hours) {
  const pph = peaks / hours;

  let rate = 0;
  if (pph >= 86) rate = 0.74;
  else if (pph >= 82) rate = 0.72;
  else if (pph >= 75) rate = 0.70;
  else if (pph >= 68) rate = 0.681;
  else if (pph >= 60) rate = 0.651;
  else if (pph >= 53) rate = 0.631;
  else if (pph >= 46) rate = 0.61;

  const norm = Math.round(hours * 45);
  const above = Math.max(peaks - norm, 0);
  const bonus = above * rate;

  return { pph, rate, norm, above, bonus };
}