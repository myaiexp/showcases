// MapController maxBounds, maxBoundsPadding and rubberBand: keep the camera inside a box
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** [west, south] and [east, north]. */
const BOUNDS: [[number, number], [number, number]] = [[-12, 35], [32, 62]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const home: MapViewState = { longitude: 10, latitude: 48, zoom: ctx.preview ? 2.6 : 3.4 };
  const [[w, s], [e, n]] = BOUNDS;
  const info = ctx.preview ? overlay(stage.box, 'maxBounds: the camera stays in the box', 'bottom') : readout(el, 'Pan and zoom out: the view stops at the box.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : { maxBounds: BOUNDS },
    layers: [
      landLayer(),
      new PathLayer<{ path: [number, number][] }>({ id: 'bounds', data: [{ path: [[w, s], [e, s], [e, n], [w, n], [w, s]] }], getPath: (d) => d.path, getColor: [255, 190, 90], getWidth: 2, widthUnits: 'pixels' }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // The view wanders to the edges of the box and never outside it.
    stop = animate((t) => deck.setProps({ viewState: { ...home, longitude: 10 + Math.sin(t * 0.7) * 14, latitude: 48 + Math.cos(t * 0.5) * 6 } }));
  } else {
    let padding = 0;
    let rubberBand = false;
    const bar = controlBar(el);
    const apply = (): void => {
      deck.setProps({ controller: { maxBounds: BOUNDS, maxBoundsPadding: { left: padding, right: padding, top: padding, bottom: padding }, rubberBand } });
      info.textContent = `maxBoundsPadding ${padding}px   rubberBand ${rubberBand}`;
    };
    slider(bar, 'maxBoundsPadding (px)', 0, 150, 10, 0, (v) => { padding = v; apply(); });
    check(bar, 'rubberBand', false, (v) => { rubberBand = v; apply(); });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
