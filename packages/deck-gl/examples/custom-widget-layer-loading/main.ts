// onRedraw: a widget that watches the layers' isLoaded flags while a Promise-backed layer loads
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { LayerStatusWidget } from './layer-status-widget.ts';

/** A data Promise that resolves later: stands in for a download, which a gallery must not do. */
const later = (ms: number): Promise<City[]> => new Promise((resolve) => setTimeout(() => resolve(CITIES as City[]), ms));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const label = ctx.preview ? null : readout(el, 'cities-1 is loading');
  let n = 1;
  const timers: number[] = [];

  const layers = (data: Promise<City[]>, id: string) => [
    landLayer(),
    new ScatterplotLayer<City>({
      id,
      data,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 50_000,
      getFillColor: [255, 140, 60, 220],
      radiusMinPixels: 4,
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(later(2200), `cities-${n}`),
    widgets: [
      new LayerStatusWidget({
        onLoadingChange: (loading) => {
          if (label) label.textContent = loading ? `cities-${n} is loading` : `cities-${n} loaded`;
        },
      }),
    ],
  });
  const reload = (): void => {
    n++;
    // A new layer id is a new layer: its data Promise starts a fresh load.
    deck.setProps({ layers: layers(later(2200), `cities-${n}`) });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 4) } }));
    timers.push(window.setInterval(reload, 5000));
  } else {
    button(controlBar(el), 'reload the cities layer', reload);
  }
  return () => {
    stop();
    for (const id of timers) clearInterval(id);
    stage.release(deck);
  };
};

export default mount;
