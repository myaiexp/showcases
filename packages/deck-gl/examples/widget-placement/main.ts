// The placement prop: one widget hops between the four corners, others stay put
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, ScreenshotWidget, ZoomWidget, _ScaleWidget as ScaleWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const PLACEMENTS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
type Placement = (typeof PLACEMENTS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4, pitch: 25 };

  // The zoom widget is the traveller: setProps moves it to another corner.
  const traveller = new ZoomWidget({ id: 'traveller', placement: 'top-left', orientation: 'horizontal' });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      traveller,
      new CompassWidget({ placement: 'top-right' }),
      // The scale draws in black whatever the theme: a light plate keeps it readable on the dark map.
      new ScaleWidget({ placement: 'bottom-left', style: { background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' } }),
      new ScreenshotWidget({ placement: 'bottom-right', onCapture: () => {} }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    const timer = window.setInterval(() => traveller.setProps({ placement: PLACEMENTS[++i % PLACEMENTS.length]! }), 1500);
    const drifting = animate((t) => deck.setProps({ viewState: drift(view, t, 3) }));
    stop = () => {
      window.clearInterval(timer);
      drifting();
    };
  } else {
    select<Placement>(controlBar(el), 'zoom widget placement', PLACEMENTS, (v) => traveller.setProps({ placement: v }), 'top-left');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
