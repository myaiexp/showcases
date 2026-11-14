// Deck onError: a throwing accessor is reported with its layer
import { Deck } from '@deck.gl/core';
import type { Layer, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let broken = true;
  let reports = 0;
  let version = 0;

  const layers = (): Layer[] => [
    landLayer(),
    new ScatterplotLayer<City>({
      // A new id re-runs the accessors (and so the throw) from scratch.
      id: `cities-${version}`,
      data: CITIES,
      getPosition: (c) => c.coordinates,
      getRadius: (c) => Math.sqrt(c.population) * 60_000,
      getFillColor: (c) => {
        if (broken && c.name === 'Cairo') throw new Error(`bad colour for ${c.name}`);
        return [255, 140, 60, 220];
      },
      radiusMinPixels: 3,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    // The default handler is console.error; null would ignore errors silently.
    onError: (error: Error, layer?: Layer) => {
      reports++;
      label.textContent = `onError #${reports}: "${error.message}"\nfrom layer: ${layer?.id ?? 'none'}`;
    },
  });
  label.textContent = 'no error reported yet';

  const reload = (): void => {
    version++;
    deck.setProps({ layers: layers() });
  };
  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    timer = window.setInterval(() => {
      broken = !broken;
      if (!broken) label.textContent = 'accessor fixed: no error';
      reload();
    }, 2200);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 8) } }));
  } else {
    check(controlBar(el), 'accessor throws for Cairo', broken, (v) => {
      broken = v;
      if (!broken) label.textContent = 'accessor fixed: no error';
      reload();
    });
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
