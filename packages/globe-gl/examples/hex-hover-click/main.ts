// Hex Bin: onHexHover and onHexClick with hexLabel, lifting the hovered hexagon
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Spot {
  lat: number;
  lng: number;
  /** A magnitude from 1 to 9. */
  w: number;
}

// Gaussian clouds around the big cities, the same on every mount.
function scatter(seed: number, perMillion: number, spread = 3): Spot[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return cities.flatMap((c) =>
    Array.from({ length: Math.max(1, Math.round(c.pop * perMillion)) }, (): Spot => ({
      lat: c.lat + gauss() * spread,
      lng: c.lng + (gauss() * spread) / Math.max(0.3, Math.cos((c.lat * Math.PI) / 180)),
      w: 1 + Math.floor(rand() * 9),
    })),
  );
}

// Colour ramp over a hex's summed weight.
const heat = (sumWeight: number): string => `hsl(${Math.round(200 - 190 * Math.min(1, Math.sqrt(sumWeight) / 10))}, 80%, 55%)`;

interface Hex {
  sumWeight: number;
  points: Spot[];
  h3Idx: string;
}

// The docs also list `center: {lat, lng}` on hex objects, but three-globe 2.45.6 does not set it:
// a hexagon is recognised by its h3Idx and located by averaging its points.
const asHex = (h: object): Hex => h as unknown as Hex;
const centerOf = (h: Hex): { lat: number; lng: number } => ({
  lat: h.points.reduce((s, p) => s + p.lat, 0) / h.points.length,
  lng: h.points.reduce((s, p) => s + p.lng, 0) / h.points.length,
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a hexagon to lift it and read its tooltip; click one to fly there.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a hexagon');

  // Hex objects are rebuilt on every re-bin, so a hexagon is recognised by its h3Idx.
  const key = (h: Hex): string => h.h3Idx;
  let hovered = '';
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(9, 3))
    .hexBinResolution(2)
    .hexAltitude((h) => 0.01 + Math.sqrt(asHex(h).sumWeight) * 0.01 + (key(asHex(h)) === hovered ? 0.1 : 0))
    .hexTopColor((h) => (key(asHex(h)) === hovered ? '#ffffff' : heat(asHex(h).sumWeight)))
    .hexSideColor((h) => heat(asHex(h).sumWeight))
    .hexMargin(0.15)
    .hexTransitionDuration(250)
    .hexLabel((d) => {
      const h = asHex(d);
      return `<b>${h.points.length} points</b><br>weight ${h.sumWeight}<br>${h.h3Idx}`;
    })
    .onHexHover((hex) => {
      hovered = hex ? key(asHex(hex)) : '';
      globe.hexAltitude(globe.hexAltitude()).hexTopColor(globe.hexTopColor());
      if (log) log.textContent = hex ? `Hovering a hexagon of ${asHex(hex).points.length} points` : 'Hover or click a hexagon';
    })
    .onHexClick((hex, _event, { altitude }) => {
      const center = centerOf(asHex(hex));
      globe.pointOfView({ lat: center.lat, lng: center.lng, altitude: 1.2 }, 1000);
      if (log) log.textContent = `Clicked the hexagon at ${center.lat.toFixed(1)}, ${center.lng.toFixed(1)} (altitude ${altitude.toFixed(2)})`;
    });
  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const tour = ['Tokyo', 'Delhi', 'Cairo', 'Moscow', 'Shanghai'].map((n) => cities.find((c) => c.name === n)!);
    let i = 0;
    stage.every(2600, () => {
      const c = tour[i++ % tour.length]!;
      globe.pointOfView({ lat: c.lat - 10, lng: c.lng, altitude: 2.3 }, 600);
      stage.after(800, () => ghost.at(c.lat, c.lng, 0.1));
      stage.after(1900, () => ghost.leave());
    });
  }
  return stage.dispose;
};

export default mount;
