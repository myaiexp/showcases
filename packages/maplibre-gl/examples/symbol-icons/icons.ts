// Icons drawn on a canvas as ImageData, and seeded points to place them on
import type { Feature, FeatureCollection, Point } from 'geojson';
import { cities, cityLabels, seeded, type CityName } from '../../shared/basemap.ts';

const SIZE = 32;

function canvasImage(draw: (g: CanvasRenderingContext2D) => void): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');
  draw(g);
  return g.getImageData(0, 0, SIZE, SIZE);
}

/** An arrow pointing up (north), so icon-rotate turns it clockwise to a heading. */
export function arrow(fill: string): ImageData {
  return canvasImage((g) => {
    g.fillStyle = fill;
    g.strokeStyle = '#0a1320';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(16, 3);
    g.lineTo(27, 28);
    g.lineTo(16, 22);
    g.lineTo(5, 28);
    g.closePath();
    g.fill();
    g.stroke();
  });
}

export const iconColors = { 'arrow-blue': '#58a6ff', 'arrow-amber': '#e8a308', 'arrow-green': '#22c55e' };

/** The named cities plus a seeded scatter around them, so labels and icons collide. */
export function places(extra = 70): FeatureCollection<Point> {
  const rand = seeded(5);
  const base = (Object.keys(cities) as CityName[]).map((key) => [cityLabels[key], cities[key]] as const);
  const features: Feature<Point>[] = base.map(([name, c]) => ({
    type: 'Feature',
    properties: { name, heading: Math.round(rand() * 360), scale: 1.2, icon: 'arrow-amber' },
    geometry: { type: 'Point', coordinates: c },
  }));
  for (let i = 0; i < extra; i++) {
    const [name, c] = base[Math.floor(rand() * base.length)] ?? ['', [0, 0]];
    features.push({
      type: 'Feature',
      properties: {
        name: `${name} ${i + 1}`,
        heading: Math.round(rand() * 360),
        scale: 0.6 + rand() * 0.6,
        icon: rand() < 0.5 ? 'arrow-blue' : 'arrow-green',
      },
      geometry: { type: 'Point', coordinates: [c[0] + (rand() - 0.5) * 24, c[1] + (rand() - 0.5) * 14] },
    });
  }
  return { type: 'FeatureCollection', features };
}
