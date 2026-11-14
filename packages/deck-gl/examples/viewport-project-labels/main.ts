// viewport.project(): HTML labels follow cities, placed from the Deck's current WebMercatorViewport
import { Deck, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { labelPool } from '../../shared/viewports-html.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const labels = labelPool(stage.box);
  const info = ctx.preview ? null : readout(el, 'Pan and zoom: the labels are DOM elements moved after every render.');
  const shown = CITIES.filter((c) => c.population >= (ctx.preview ? 17 : 9));

  const place = (): void => {
    // Empty until the first render; afterwards the viewports match what was just drawn.
    const viewport = deck.getViewports()[0];
    if (!(viewport instanceof WebMercatorViewport)) return;
    const out = [];
    for (const c of shown) {
      const [x, y] = viewport.project(c.coordinates);
      if (x! >= 0 && x! <= viewport.width && y! >= 0 && y! <= viewport.height) out.push({ text: c.name, x: x!, y: y! });
    }
    labels.set(out);
    if (info) info.textContent = `${out.length} labels placed; Tokyo is at ${viewport.project(shown[0]!.coordinates).map((v) => Math.round(v!)).join(', ')} px`;
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: { longitude: 30, latitude: 30, zoom: ctx.preview ? 1.2 : 2 },
    controller: !ctx.preview,
    onAfterRender: place,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: shown, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { longitude: wrapLng(30 + t * 12), latitude: 28, zoom: 1.2 } as MapViewState }))
    : () => {};
  return () => {
    stop();
    labels.remove();
    stage.release(deck);
  };
};

export default mount;
