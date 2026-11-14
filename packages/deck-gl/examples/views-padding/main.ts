// View padding moves the look-at point off-centre: keep a city clear of a panel
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const [longitude, latitude] = city('Paris').coordinates;
  const viewState: MapViewState = { longitude, latitude, zoom: ctx.preview ? 3.6 : 4.6 };

  // A panel drawn over the left part of the canvas, as an app's side bar would be.
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position: 'absolute', left: '0', top: '0', bottom: '0', width: '0%', pointerEvents: 'none',
    background: 'rgba(8, 14, 22, 0.82)', borderRight: '1px solid #3b4a60', boxSizing: 'border-box',
  });
  stage.box.append(panel);

  const makeView = (leftPercent: number) =>
    // The view's centre, the point `longitude`/`latitude` is placed at, moves into what is left.
    new MapView({ id: 'map', padding: { left: `${leftPercent}%` }, controller: !ctx.preview });
  const setPadding = (pct: number): void => {
    panel.style.width = `${pct}%`;
    deck.setProps({ views: makeView(pct) });
  };

  const deck = new Deck({
    device: stage.device,
    views: makeView(0),
    initialViewState: viewState,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        radiusUnits: 'pixels',
        getRadius: (d) => (d.name === 'Paris' ? 8 : 4),
        getFillColor: (d) => (d.name === 'Paris' ? [255, 90, 90] : [255, 170, 70]),
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => setPadding(Math.round((Math.sin(t * 0.9) + 1) * 22)));
  else slider(controlBar(el), 'padding.left (%)', 0, 60, 1, 0, setPadding);
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
