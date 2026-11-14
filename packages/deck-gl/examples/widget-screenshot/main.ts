// ScreenshotWidget: onCapture takes over so the shot lands in an img on the page
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ScreenshotWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.3 };

  let shot: HTMLImageElement | null = null;
  if (!ctx.preview) {
    shot = document.createElement('img');
    shot.alt = 'The captured screenshot appears here';
    shot.style.cssText = 'display:block;margin:12px auto 0;max-width:50%;border:1px solid var(--fg-2);border-radius:6px;min-height:40px';
    el.append(shot);
  }

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 30_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new ScreenshotWidget({
        placement: 'top-left',
        label: 'Capture the map',
        imageFormat: 'image/png',
        // Replaces the default download: read the canvas and show it on the page instead.
        onCapture: (widget) => {
          deck.redraw('screenshot'); // a WebGL canvas can only be read right after a draw
          const url = widget.captureScreenToDataURL('image/png');
          if (url && shot) shot.src = url;
        },
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
