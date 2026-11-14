// H3HexagonLayer: highPrecision 'auto', true or false on coarse cells and pentagons
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { cellToBoundary, cellToChildren, cellToLatLng, getPentagons, getRes0Cells } from 'h3-js';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';

// Every resolution-1 cell except the few that straddle the antimeridian or a pole (their outline
// would wrap around the world): the globe, including 10 of the 12 pentagons.
const wraps = (cell: string): boolean => {
  const lngs = cellToBoundary(cell, true).map(([lng = 0]) => lng);
  return Math.max(...lngs) - Math.min(...lngs) > 180;
};
const cells = getRes0Cells()
  .flatMap((c) => cellToChildren(c, 1))
  .filter((c) => !wraps(c));
const pentagons = new Set(getPentagons(1));
const nearby = cells.filter((c) => {
  const [lat, lng] = cellToLatLng(c);
  return Math.abs(lat - 28) < 35 && Math.abs(lng) < 75;
});
// Colours are worked out once: pentagons orange, the rest blue-green shades.
const colors = new Map<string, [number, number, number, number]>(
  cells.map((c) => {
    const [lat, lng] = cellToLatLng(c);
    // Three shades from the position, so neighbouring cells can be told apart.
    const shade = ((Math.round(lat / 5 + lng / 7) % 3) + 3) % 3 * 28;
    return [c, pentagons.has(c) ? [255, 150, 60, 240] : [30 + shade, 90 + shade + (lat + 90) * 0.4, 190 + shade * 0.5 - (lat + 90) * 0.3, 220]];
  }),
);

type Mode = 'auto' | 'true' | 'false';
const parse = (m: Mode): boolean | 'auto' => (m === 'auto' ? 'auto' : m === 'true');

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 0, latitude: 28, zoom: ctx.preview ? 2.4 : 2.1 };

  const hexagons = (mode: Mode): H3HexagonLayer<string> =>
    new H3HexagonLayer<string>({
      id: 'h3',
      // A card draws only the cells around the camera's drift.
      data: ctx.preview ? nearby : cells,
      getHexagon: (d) => d,
      getFillColor: (d) => colors.get(d) ?? [255, 255, 255, 200],
      getLineColor: [255, 255, 255, 140],
      stroked: true,
      lineWidthMinPixels: 1,
      // 'auto' switches to high precision here on its own: res 1 is coarse and pentagons are present.
      highPrecision: parse(mode),
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [hexagons('auto')] });

  let mode: Mode = 'true';
  let stop: () => void = () => {};
  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      mode = mode === 'true' ? 'false' : 'true';
      deck.setProps({ layers: [hexagons(mode)] });
    }, 2500);
    deck.setProps({ layers: [hexagons(mode)] });
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: ((t * 8 + 180) % 360) - 180 } }));
  } else {
    select(controlBar(el), 'highPrecision', ['auto', 'true', 'false'] as const, (v) => ((mode = v), deck.setProps({ layers: [hexagons(mode)] })), 'auto');
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
