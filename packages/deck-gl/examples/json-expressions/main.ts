// The @@= prefix: accessor strings compiled from a tiny expression language
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };

// Each entry is the string a JSON file would hold for getFillColor / getRadius.
const COLORS = {
  'constant array': '@@=[255, 140, 60]',
  'conditional': '@@=population > 20 ? [255, 90, 120] : [90, 200, 255]',
  'arithmetic': '@@=[population * 6, 200 - population * 3, 120]',
  'nested conditional': '@@=population > 25 ? [255, 90, 90] : population > 14 ? [255, 200, 80] : [90, 220, 160]',
} as const;
const RADII = {
  'population * 60000': '@@=population * 60000',
  'sqrt-like, capped': '@@=population > 20 ? 700000 : 300000',
  'lat based': '@@=300000 + lat * 6000',
} as const;
type ColorKey = keyof typeof COLORS;
type RadiusKey = keyof typeof RADII;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer } } });
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  let color: ColorKey = 'conditional';
  let radius: RadiusKey = 'population * 60000';
  let first = true;
  const note = ctx.preview ? null : readout(el);

  const render = (): void => {
    const spec = {
      initialViewState: VIEW,
      layers: [
        {
          '@@type': 'ScatterplotLayer',
          data: CITY_ROWS,
          getPosition: '@@=[lng, lat]',
          getRadius: RADII[radius],
          getFillColor: COLORS[color],
          radiusMinPixels: 3,
          // The converter makes a new accessor each time: tell the layer to re-evaluate.
          updateTriggers: { getFillColor: color, getRadius: radius },
        },
      ],
    };
    applyConverted(deck, converter.convert(spec), { first, controller: !ctx.preview });
    first = false;
    if (note) note.textContent = `getFillColor: ${COLORS[color]}\ngetRadius: ${RADII[radius]}`;
  };
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    const keys = Object.keys(COLORS) as ColorKey[];
    let i = 0;
    timer = window.setInterval(() => {
      color = keys[++i % keys.length]!;
      render();
    }, 1500);
    stop = animate((t) => deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'getFillColor', Object.keys(COLORS) as ColorKey[], (v) => {
      color = v;
      render();
    }, color);
    select(bar, 'getRadius', Object.keys(RADII) as RadiusKey[], (v) => {
      radius = v;
      render();
    }, radius);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
