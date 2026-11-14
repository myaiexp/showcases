// ArcLayer: widthUnits, widthScale, min and max pixels, antialiasing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'pixels' | 'meters' | 'common';
// A widthScale that gives roughly the same on-screen width in each unit, for a flight count.
const BASE: Record<Units, number> = { pixels: 0.1, meters: 10_000, common: 0.04 };
const data = routes(['Paris'], 4).filter((r) => r.flights > 30);

interface Settings {
  widthUnits: Units;
  widthScale: number;
  widthMinPixels: number;
  widthMaxPixels: number;
  antialiasing: boolean;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 30, zoom: ctx.preview ? 0.6 : 1.6, pitch: 35 };
  // getWidth is the flight count; the units decide what one unit of it means on screen.
  const s: Settings = { widthUnits: 'pixels', widthScale: BASE.pixels, widthMinPixels: 0, widthMaxPixels: 40, antialiasing: false };

  const arcs = (cfg: Settings): ArcLayer<Route> =>
    new ArcLayer<Route>({
      id: 'arcs',
      data,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 190, 80],
      getTargetColor: [90, 200, 255],
      getWidth: (d) => d.flights,
      ...cfg,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), arcs(s)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), arcs(s)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      s.widthScale = BASE.pixels * (0.5 + (1 + Math.sin(t)) * 0.8);
      refresh();
    });
  } else {
    const bar = controlBar(el);
    let k = 1;
    const apply = (): void => {
      s.widthScale = k * BASE[s.widthUnits];
      refresh();
    };
    select(bar, 'widthUnits', ['pixels', 'meters', 'common'] as const, (v) => ((s.widthUnits = v), apply()), s.widthUnits);
    slider(bar, 'widthScale x', 0.1, 5, 0.1, k, (v) => ((k = v), apply()));
    slider(bar, 'widthMinPixels', 0, 20, 1, 0, (v) => ((s.widthMinPixels = v), refresh()));
    slider(bar, 'widthMaxPixels', 1, 40, 1, 40, (v) => ((s.widthMaxPixels = v), refresh()));
    check(bar, 'antialiasing', false, (v) => ((s.antialiasing = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
