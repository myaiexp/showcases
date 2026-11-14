// LoadingWidget: a spinner that shows while a layer's data promise is pending
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { LoadingWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import type { SamplePoint } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { slowPoints } from '../../shared/widgets-data.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 6, latitude: 47, zoom: ctx.preview ? 2.6 : 3.6 };
  const log = ctx.preview ? null : readout(el, 'Loading...');
  let run = 0;

  // `data` can be a promise: the layer is not loaded until it settles.
  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: `points-${run}`,
      data: slowPoints(ctx.preview ? 2500 : 3500),
      getPosition: (d) => d.position,
      getRadius: 8000,
      radiusMinPixels: 2,
      getFillColor: [255, 170, 80, 220],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: [
      new LoadingWidget({
        placement: 'top-left',
        label: 'Fetching points',
        onLoadingChange: (loading) => {
          if (log) log.textContent = loading ? 'onLoadingChange: loading' : 'onLoadingChange: loaded';
        },
      }),
    ],
  });

  const reload = (): void => {
    run++;
    deck.setProps({ layers: layers() });
  };
  if (!ctx.preview) button(controlBar(el), 'Reload the data', reload);
  // A card reloads on a timer so the spinner comes back.
  const timer = ctx.preview ? window.setInterval(reload, 6000) : 0;
  return () => {
    window.clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
