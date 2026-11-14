// Async props: palette is a Promise; the layer draws grey until it resolves
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, seeded, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { PaletteDotLayer } from './palette-dot-layer.ts';

const PALETTES: Record<string, string[]> = {
  sunset: ['#3b0f70', '#8c2981', '#de4968', '#fe9f6d', '#fcfdbf'],
  forest: ['#0b3d20', '#17803d', '#4cc26a', '#a8e6a1', '#f3ffe8'],
  ice: ['#08306b', '#2171b5', '#6baed6', '#c6dbef', '#f7fbff'],
};
const NAMES = Object.keys(PALETTES);
const rand = seeded(17);
const VALUES = new Map(CITIES.map((c) => [c.name, rand()]));

/** A palette that arrives later: a stand-in for a fetch, which a gallery example must not do. */
function loadPalette(name: string, ms: number): Promise<string[]> {
  return new Promise((resolve) => setTimeout(() => resolve(PALETTES[name]!), ms));
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let events = 'palette: loading';
  const timers: number[] = [];

  const layer = (palette: Promise<string[]>): PaletteDotLayer<City> =>
    new PaletteDotLayer<City>({
      id: 'palette-dots',
      data: CITIES as City[],
      getPosition: (d) => d.coordinates,
      getValue: (d) => VALUES.get(d.name) ?? 0,
      palette,
      onPaletteLoad: (n) => {
        events = `transform ran: ${n} colours loaded`;
        label.textContent = events;
      },
      onPaletteRelease: (n) => {
        label.textContent = `${events}\nrelease ran for the previous ${n} colours`;
      },
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer(loadPalette('sunset', 1500))],
  });
  label.textContent = events;
  const load = (name: string): void => {
    events = `palette: loading ${name}`;
    label.textContent = events;
    deck.setProps({ layers: [landLayer(), layer(loadPalette(name, 1500))] });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 4) } }));
    let i = 0;
    timers.push(window.setInterval(() => load(NAMES[++i % NAMES.length]!), 4000));
  } else {
    const bar = controlBar(el);
    for (const name of NAMES) button(bar, `load ${name}`, () => load(name));
  }
  return () => {
    stop();
    for (const id of timers) clearInterval(id);
    stage.release(deck);
  };
};

export default mount;
