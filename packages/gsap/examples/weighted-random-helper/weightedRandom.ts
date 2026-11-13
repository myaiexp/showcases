// The official weightedRandom() helper, copied from the GSAP helper functions docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/weightedRandom
// Feed in an array and an ease and it returns a function that pulls a random element
// from that array, weighted according to the ease you provide.
export function weightedRandom<T>(collection: T[], ease: string): () => T {
  return gsap.utils.pipe(
    Math.random, // random number between 0 and 1
    gsap.parseEase(ease), // apply the ease
    // map to the index range of the array, stretched by 0.5 each direction because we round
    // and want to keep the distribution (otherwise linear would be centre-weighted slightly)
    gsap.utils.mapRange(0, 1, -0.5, collection.length - 0.5),
    gsap.utils.snap(1), // snap to the closest integer
    (i: number) => collection[i] as T, // return that element from the array
  );
}
