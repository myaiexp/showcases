// Accessors receive (object, {index, data, target}); target is a reusable output array
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const data = pointCloud(ctx.preview ? 150 : 400, { seed: 4, spread: 2 });
  const note = 'getFillColor reads index and data.length, and writes into target (no new array per object)';
  if (ctx.preview) overlay(stage.box, 'index -> hue', 'bottom');
  else readout(el, note);

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<SamplePoint>({
        id: 'points',
        data,
        getPosition: (d) => d.position,
        // The second argument: index of this element, the data prop, and a preallocated target.
        getFillColor: (d, { index, data: all, target }) => {
          const f = index / (all as SamplePoint[]).length;
          target[0] = 255 * f;
          target[1] = 120 + 100 * d.value;
          target[2] = 255 * (1 - f);
          target[3] = 220;
          return target as unknown as Color; // target is typed number[]; it holds four channels here
        },
        getRadius: (_, { index }) => 3 + (index % 5) * 1.5,
        radiusUnits: 'pixels',
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(8 + Math.sin(t * 0.5) * 3) } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
