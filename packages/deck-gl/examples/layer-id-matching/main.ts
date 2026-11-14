// A stable layer id keeps layer state so positions glide; a fresh id rebuilds it
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type IdMode = 'stable id' | 'new id each update';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let mode: IdMode = 'stable id';
  let round = 0;
  let data: SamplePoint[] = pointCloud(60, { seed: 1 });

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      // Layers are matched between renders by id. The same id carries the old layer's
      // state forward, so the transition has a starting point; a new id starts from scratch.
      id: mode === 'stable id' ? 'points' : `points-${round}`,
      data,
      getPosition: (d) => d.position,
      getFillColor: (d) => [255, 120 + d.value * 120, 80],
      getRadius: 9,
      radiusUnits: 'pixels',
      transitions: { getPosition: 1200 },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const shuffle = (): void => {
    round += 1;
    data = pointCloud(60, { seed: 1 + round });
    deck.setProps({ layers: layers() });
    label.textContent = `${mode}: update ${round}`;
  };
  label.textContent = `${mode}: update 0`;

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(shuffle, 2200);
  } else {
    const bar = controlBar(el);
    select(bar, 'layer id', ['stable id', 'new id each update'] as const, (v) => (mode = v), mode);
    button(bar, 'Move the points', shuffle);
  }

  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
