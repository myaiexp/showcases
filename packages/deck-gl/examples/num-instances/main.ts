// numInstances: draw only the first N objects, overriding the count from data
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const TOTAL = 800;
const DATA = pointCloud(TOTAL, { seed: 9, spread: 2.4 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : null;

  const layers = (count: number) => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: DATA,
      // The array has 800 rows; the layer only draws this many of them.
      numInstances: count,
      getPosition: (d) => d.position,
      getFillColor: (d) => [255, 120 + d.value * 130, 80, 220],
      getRadius: 4,
      radiusUnits: 'pixels',
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(TOTAL) });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const count = Math.round(((t % 6) / 6) * TOTAL);
      deck.setProps({ layers: layers(count) });
      if (label) label.textContent = `numInstances ${count} of ${TOTAL}`;
    });
  } else {
    slider(controlBar(el), 'numInstances', 0, TOTAL, 10, TOTAL, (v) => deck.setProps({ layers: layers(v) }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
