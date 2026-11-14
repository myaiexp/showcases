// data as a Promise: the layer draws once it resolves, onDataLoad reports the value
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let round = 0;
  let alive = true;

  /** A stand-in for slow work (a worker, a computation): resolves after a delay. */
  const slowData = (seed: number): Promise<SamplePoint[]> =>
    new Promise((resolve) => setTimeout(() => resolve(pointCloud(300, { seed, spread: 1.6 })), 1200));

  const layers = (data: Promise<SamplePoint[]>) => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data, // the layer draws nothing until the promise resolves
      getPosition: (d) => d.position,
      getFillColor: (d) => [90, 170 + d.value * 80, 255, 200],
      getRadius: 5,
      radiusUnits: 'pixels',
      onDataLoad: (value) => {
        if (alive) label.textContent = `promise ${round} resolved: ${(value as SamplePoint[]).length} points`;
      },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(slowData(0)) });
  const reload = (): void => {
    round += 1;
    label.textContent = `promise ${round} pending...`;
    deck.setProps({ layers: layers(slowData(round)) });
  };
  label.textContent = 'promise 0 pending...';

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(reload, 3200);
  else button(controlBar(el), 'Load again', reload);

  return () => {
    alive = false;
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
