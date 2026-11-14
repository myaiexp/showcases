// LineLayer: widthUnits, widthScale, min and max pixels, antialiasing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { routes, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'pixels' | 'meters' | 'common';
// getWidth is a flight count (5..65); this base gives about the same look in each unit.
const BASE: Record<Units, number> = { pixels: 0.1, meters: 8_000, common: 0.03 };
const data = routes(['Berlin'], 2).filter((r) => r.flights > 25);

interface Settings {
  widthUnits: Units;
  widthScale: number;
  widthMinPixels: number;
  widthMaxPixels: number;
  antialiasing: boolean;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 30, latitude: 25, zoom: ctx.preview ? 0.3 : 1.4 };
  const s: Settings = { widthUnits: 'pixels', widthScale: BASE.pixels, widthMinPixels: 0, widthMaxPixels: 40, antialiasing: false };

  const lines = (cfg: Settings): LineLayer<Route> =>
    new LineLayer<Route>({
      id: 'lines',
      data,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getColor: [120, 210, 255],
      getWidth: (d) => d.flights,
      ...cfg,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), lines(s)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), lines(s)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      s.widthScale = BASE.pixels * (0.5 + (1 + Math.sin(t)) * 0.8);
      refresh();
    });
  } else {
    let k = 1;
    const apply = (): void => ((s.widthScale = k * BASE[s.widthUnits]), refresh());
    const bar = controlBar(el);
    select(bar, 'widthUnits', ['pixels', 'meters', 'common'] as const, (v) => ((s.widthUnits = v), apply()), 'pixels');
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
