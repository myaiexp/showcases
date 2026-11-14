// JSONConverter.mergeConfiguration: an unknown @@type is null until merged in
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };
const pair = (a: string, b: string): { a: number[]; b: number[] } => {
  const from = CITY_ROWS.find((c) => c.name === a)!;
  const to = CITY_ROWS.find((c) => c.name === b)!;
  return { a: [from.lng, from.lat], b: [to.lng, to.lat] };
};

const SPEC = {
  initialViewState: VIEW,
  layers: [
    { '@@type': 'ScatterplotLayer', data: CITY_ROWS, getPosition: '@@=[lng, lat]', getRadius: 200000, getFillColor: [255, 140, 60], radiusMinPixels: 2 },
    {
      '@@type': 'ArcLayer',
      data: [pair('London', 'Tokyo'), pair('New York', 'Mumbai'), pair('Lagos', 'Moscow'), pair('Rio de Janeiro', 'Cairo')],
      getSourcePosition: '@@=a',
      getTargetPosition: '@@=b',
      getSourceColor: [255, 255, 255],
      getTargetColor: [90, 200, 255],
      getWidth: 3,
    },
  ],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  // `log: null` keeps the converter's "no registered class" warning out of the console.
  let converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer }, log: null } });
  let first = true;
  const note = ctx.preview ? null : readout(el);

  const render = (): void => {
    // Same spec object again returns the cached result, so convert a fresh copy.
    const converted = converter.convert({ ...SPEC }) as { layers: unknown[] };
    applyConverted(deck, converted, { first, controller: !ctx.preview });
    first = false;
    if (note) note.textContent = `converted layers: ${converted.layers.map((l) => (l ? l.constructor.name : 'null')).join(', ')}`;
  };
  render();

  const reset = (): void => {
    converter.finalize();
    converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer }, log: null } });
    render();
  };
  const merge = (): void => {
    // Adds to the catalogs already there instead of replacing them.
    converter.mergeConfiguration({ classes: { ArcLayer } });
    render();
  };

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let merged = false;
    timer = window.setInterval(() => {
      merged = !merged;
      if (merged) merge();
      else reset();
    }, 1800);
    stop = animate((t) => deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    const bar = controlBar(el);
    button(bar, 'mergeConfiguration({ classes: { ArcLayer } })', merge);
    button(bar, 'start over', reset);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
