// One row of eleven nodes per easing, so the same input range shows each curve side by side
import Graph from 'graphology';

export const EASINGS = [
  'linear',
  'quadraticIn',
  'quadraticOut',
  'quadraticInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'exponentialIn',
  'exponentialOut',
  'exponentialInOut',
  'custom',
] as const;

export const COLUMNS = 11;

/** Smooth-step as a custom easing: any (t: number) => number with t in 0..1 is accepted. */
export const smoothStep = (t: number): number => t * t * (3 - 2 * t);

export function buildGraph(): Graph {
  const graph = new Graph();
  EASINGS.forEach((easing, row) => {
    for (let col = 0; col < COLUMNS; col++) {
      graph.addNode(`${easing}-${col}`, {
        x: col * 9,
        y: row * 9,
        easing,
        col,
        score: col * 10,
        // Only the first node of a row carries the easing name as a label.
        label: col === 0 ? easing : undefined,
      });
    }
  });
  return graph;
}
