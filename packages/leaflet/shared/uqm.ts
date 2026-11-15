// The CRS.Simple tutorial's star map: image bounds in map units and the four stars it names
import type { LatLngBoundsLiteral } from 'leaflet';

/** Map-unit bounds of `images.uqmMap()`, as measured in the tutorial: [[south, west], [north, east]]. */
export const UQM_BOUNDS: LatLngBoundsLiteral = [[-26.5, -25], [1021.5, 1023]];

/** The image is this many pixels on each side. */
export const UQM_PIXELS = 2315;

/** The game's own coordinates: x east, y north, from the tutorial. */
export const STARS = [
  { name: 'Sol', x: 175.2, y: 145.0 },
  { name: 'Mizar', x: 41.6, y: 130.1 },
  { name: 'Krueger-Z', x: 13.4, y: 56.5 },
  { name: 'Deneb', x: 218.7, y: 8.3 },
] as const;
