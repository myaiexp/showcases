// Row-width profiles (fraction of the box, by vertical position 0..1) and the sample article
export type ShapeName = 'diamond' | 'circle' | 'heart';

const diamond = (t: number): number => 1 - Math.abs(2 * t - 1);
const circle = (t: number): number => 2 * Math.sqrt(Math.max(0, 0.25 - (t - 0.5) ** 2));
// Widest x of the heart curve (x^2 + y^2 - 1)^3 = x^2 y^3 on that row, found by scanning.
const heart = (t: number): number => {
  const y = 1.25 - t * 2.6;
  let widest = 0;
  for (let x = 0; x <= 1.4; x += 0.01) {
    if ((x * x + y * y - 1) ** 3 - x * x * y ** 3 <= 0) widest = x;
  }
  return (widest * 2) / 2.8;
};

export const SHAPES: Record<ShapeName, (t: number) => number> = { diamond, circle, heart };

export const ARTICLE =
  'Poets have long known that a poem can take the shape of what it describes, and typesetters have long known how tedious that is. Every line has its own length, so every line has to be broken by hand and checked by eye. Here the shape only supplies a number per row. Pretext lays out one line at that width, reports how wide the line really came out and where it stopped, and the loop centres it and moves on to the next row with the cursor it was handed. When the shape gets wider the lines get longer, when it narrows they shorten, and the paragraph keeps its order the whole way down. The text is measured once. Changing the shape only changes the widths that are asked for, so switching between a diamond, a circle and a heart is cheap enough to do on a timer. A longer text simply runs past the bottom of the shape, and a shorter one stops early and leaves the last rows empty, which is why the guides behind the lines are drawn for every row whether or not it received any text.';
