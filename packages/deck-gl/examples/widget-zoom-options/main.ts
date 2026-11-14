// ZoomWidget options: horizontal orientation, zoomStep, transition and custom tooltips
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 1.5 : 2 };

  // Rich tooltip content: an HTMLElement instead of a string.
  const tip = document.createElement('span');
  tip.innerHTML = 'Zoom in <kbd>+</kbd>';

  const zoomWidget = new ZoomWidget({
    id: 'zoom',
    placement: 'bottom-left',
    orientation: 'horizontal',
    zoomStep: 1.5,
    transitionDuration: 500,
    zoomInTooltip: tip,
    zoomOutLabel: 'Back out',
  });

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
    widgets: [zoomWidget],
  });

  if (!ctx.preview) {
    const bar = controlBar(el);
    // setProps updates a live widget in place.
    slider(bar, 'zoomStep', 0.25, 3, 0.25, 1.5, (v) => zoomWidget.setProps({ zoomStep: v }));
    select(bar, 'orientation', ['horizontal', 'vertical'] as const, (v) => zoomWidget.setProps({ orientation: v }), 'horizontal');
  }

  const stop = ctx.preview
    ? clickEvery(stage.box, ['.deck-widget-zoom-in', '.deck-widget-zoom-out'], 1800)
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
