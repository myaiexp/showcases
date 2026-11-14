// Live JSON editor: the textarea is converted and set on Deck as you type
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };
// A dozen rows keep the textarea readable.
const ROWS = CITY_ROWS.slice(0, 12);
const HUBS = CITY_ROWS.filter((c) => ['London', 'Tokyo', 'New York', 'Mumbai', 'Lagos'].includes(c.name));

// Preset specs, as plain objects: stringified into the textarea.
const PRESETS: Record<string, object> = {
  dots: {
    initialViewState: VIEW,
    layers: [
      { '@@type': 'ScatterplotLayer', data: ROWS, getPosition: '@@=[lng, lat]', getRadius: '@@=population * 30000', getFillColor: [255, 140, 60, 220], radiusMinPixels: 2 },
    ],
  },
  arcs: {
    initialViewState: VIEW,
    layers: [
      {
        '@@type': 'ArcLayer',
        data: HUBS.flatMap((a, i) => HUBS.slice(i + 1).map((b) => ({ a: [a.lng, a.lat], b: [b.lng, b.lat] }))),
        getSourcePosition: '@@=a',
        getTargetPosition: '@@=b',
        getSourceColor: [255, 170, 80],
        getTargetColor: [90, 200, 255],
        getWidth: 2,
      },
    ],
  },
  both: {
    initialViewState: VIEW,
    layers: [
      { '@@type': 'ScatterplotLayer', data: ROWS, getPosition: '@@=[lng, lat]', getRadius: '@@=population > 20 ? 300000 : 120000', getFillColor: '@@=population > 20 ? [255, 90, 120] : [90, 200, 255]', radiusMinPixels: 3 },
      { '@@type': 'ArcLayer', data: [{ a: [-0.13, 51.51], b: [139.69, 35.69] }], getSourcePosition: '@@=a', getTargetPosition: '@@=b', getSourceColor: [255, 255, 255], getTargetColor: [255, 255, 255], getWidth: 3 },
    ],
  },
};
const NAMES = Object.keys(PRESETS);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer, ArcLayer } } });
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  let first = true;

  const show = (text: string, status?: HTMLElement): void => {
    try {
      // A string is parsed as JSON first; a syntax error or a bad class throws.
      applyConverted(deck, converter.convert(text), { first, controller: !ctx.preview });
      first = false;
      if (status) status.textContent = 'ok';
    } catch (err) {
      if (status) status.textContent = String(err);
    }
  };

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    show(JSON.stringify(PRESETS[NAMES[0]!]));
    timer = window.setInterval(() => show(JSON.stringify(PRESETS[NAMES[++i % NAMES.length]!])), 1800);
    stop = animate((t) => deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    const bar = controlBar(el);
    const area = document.createElement('textarea');
    area.spellcheck = false;
    area.rows = 14;
    Object.assign(area.style, { width: '100%', marginTop: '10px', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' });
    el.append(area);
    const status = readout(el, 'ok');
    const load = (name: string): void => {
      area.value = JSON.stringify(PRESETS[name], null, 2);
      show(area.value, status);
    };
    select(bar, 'preset', NAMES, load, NAMES[0]);
    area.addEventListener('input', () => show(area.value, status));
    load(NAMES[0]!);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
