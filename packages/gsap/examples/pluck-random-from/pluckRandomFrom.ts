// The official pluckRandomFrom() and getRandomFrom() helpers, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/pluckRandomFrom
// Both helpers keep their bookkeeping on the array itself (as the docs do), so the array type
// carries the two extra optional properties.
export type Tracked<T> = T[] & { eligible?: T[]; selected?: number };

// Randomly pluck values one-by-one until they have all been plucked, then start over.
export function pluckRandomFrom<T>(array: Tracked<T>): T {
  return (array.eligible && array.eligible.length ? array.eligible : (array.eligible = gsap.utils.shuffle(array.slice(0)))).pop() as T;
}

// Pull a random element that is not the previous one that was pulled.
export function getRandomFrom<T>(array: Tracked<T>): T {
  const selected = array.selected;
  while (selected === (array.selected = Math.floor(Math.random() * array.length))) {
    /* pick again: same index twice in a row */
  }
  return array[array.selected] as T;
}
