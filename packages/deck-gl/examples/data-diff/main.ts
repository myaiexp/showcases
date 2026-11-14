// _dataDiff (experimental): update the attributes of one changed row instead of all of them
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const COUNT = 3000;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let data: SamplePoint[] = pointCloud(ctx.preview ? 600 : COUNT, { seed: 3, spread: 2.4 });
  let useDiff = true;
  let calls = 0;
  let step = 0;

  const layers = (changed: number) => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data,
      // Only the rows named here are re-read; every other object must stay at its index.
      ...(useDiff ? { _dataDiff: () => [{ startRow: changed, endRow: changed + 1 }] } : {}),
      getPosition: (d) => {
        calls += 1;
        return d.position;
      },
      getFillColor: (d) => (d.value > 1 ? [255, 90, 90] : [90, 190, 255, 200]),
      getRadius: 4,
      radiusUnits: 'pixels',
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(0),
    onAfterRender: () => {
      label.textContent = `getPosition calls since the last update: ${calls} of ${data.length} rows (_dataDiff ${useDiff ? 'on' : 'off'})`;
    },
  });

  const nudge = (): void => {
    step += 1;
    const index = (step * 97) % data.length;
    // Shallow copy, then replace one row: the new data array differs in a single element.
    data = data.slice();
    const old = data[index]!;
    data[index] = { ...old, position: [old.position[0] + 0.6, old.position[1] + 0.4] };
    calls = 0;
    deck.setProps({ layers: layers(index) });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      useDiff = step % 6 < 3;
      nudge();
    }, 700);
  } else {
    const bar = controlBar(el);
    check(bar, '_dataDiff', true, (v) => (useDiff = v));
    button(bar, 'Move one point', nudge);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
