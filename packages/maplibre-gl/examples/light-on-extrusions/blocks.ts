// A small field of square fill-extrusion blocks of varying height
import type { FeatureCollection, Polygon } from 'geojson';

export const BLOCKS_CENTER: [number, number] = [24.94, 60.17];

/** A 4x3 grid of blocks, heights in metres, each a square of about 40 m. */
export function blocks(): FeatureCollection<Polygon> {
  const heights = [30, 80, 20, 55, 100, 45, 15, 70, 35, 120, 25, 60];
  const size = 0.0004;
  const gap = 0.00022;
  const features = heights.map((height, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = BLOCKS_CENTER[0] + (col - 1.5) * (size * 1.7 + gap) - size / 2;
    const y = BLOCKS_CENTER[1] + (row - 1) * (size * 0.8 + gap * 0.6) - size / 4;
    return {
      type: 'Feature' as const,
      properties: { height },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[[x, y], [x + size, y], [x + size, y + size / 2], [x, y + size / 2], [x, y]]],
      },
    };
  });
  return { type: 'FeatureCollection', features };
}
