// onViewStateChange can rewrite the view state: here it clamps the camera to a bounding box
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** [west, south] and [east, north]. */
const BOUNDS: [[number, number], [number, number]] = [[-10, 36], [30, 60]];

function applyViewStateConstraints<T extends MapViewState>(viewState: T): T {
  return {
    ...viewState,
    longitude: Math.min(BOUNDS[1][0], Math.max(BOUNDS[0][0], viewState.longitude)),
    latitude: Math.min(BOUNDS[1][1], Math.max(BOUNDS[0][1], viewState.latitude)),
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 48, zoom: ctx.preview ? 2.4 : 3 };
  if (ctx.preview) overlay(stage.box, 'camera centre clamped to the box', 'bottom');
  else readout(el, 'Pan far away: the centre stops at the box');

  const [[w, s], [e, n]] = BOUNDS;
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new PathLayer<{ path: [number, number][] }>({
        id: 'bounds',
        data: [{ path: [[w, s], [e, s], [e, n], [w, n], [w, s]] }],
        getPath: (d) => d.path,
        getColor: [255, 190, 90],
        getWidth: 2,
        widthUnits: 'pixels',
      }),
    ],
    // Receives the state the controller wants; whatever is returned is used instead.
    onViewStateChange: ({ viewState }) => applyViewStateConstraints(viewState),
  });

  // A card cannot pan, so it asks for a camera that wanders outside and applies the same clamp.
  const stop = ctx.preview
    ? animate((t) =>
        deck.setProps({
          viewState: applyViewStateConstraints({ ...view, longitude: 10 + Math.sin(t * 0.6) * 60, latitude: 48 + Math.cos(t * 0.5) * 30 }),
        }),
      )
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
