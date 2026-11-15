// A dark-background friendly sequential color ramp for density-style marks
/** Maps t in [0, 1] from deep blue through teal to warm yellow. */
export const heat = (t: number): string => {
  const c = Math.min(1, Math.max(0, t));
  return `hsl(${Math.round(240 - 190 * c)} ${Math.round(70 + 15 * c)}% ${Math.round(28 + 38 * c)}%)`;
};
