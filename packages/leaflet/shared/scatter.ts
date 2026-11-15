// Repeatable pseudo-random points, so a card draws the same shapes every time
import type { LatLngTuple } from 'leaflet';

/** `n` points inside the box `[south, west, north, east]`, from a seeded generator. */
export function scatter(n: number, box: readonly [number, number, number, number], seed = 7): LatLngTuple[] {
  let s = seed >>> 0;
  const rand = (): number => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const [south, west, north, east] = box;
  return Array.from({ length: n }, () => [south + rand() * (north - south), west + rand() * (east - west)] as LatLngTuple);
}
