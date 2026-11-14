// ScatterplotLayer billboard: circles lie flat on the ground, or always face the camera
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 4.2 : 5, pitch: 65, bearing: 0 };
  const data = pointCloud(ctx.preview ? 40 : 90, { seed: 9, spread: 2 });
  let billboard = false;

  const layers = (): [ReturnType<typeof landLayer>, ScatterplotLayer<SamplePoint>] => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'cloud',
      data,
      // A third number lifts each circle above the ground, so facing matters.
      getPosition: (d) => [d.position[0], d.position[1], d.value * 300_000],
      getRadius: 60_000,
      getFillColor: (d) => [255, 150 + d.value * 80, 80, 220],
      // true: circles always face the camera. false: they are parallel to the ground plane.
      billboard,
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      billboard = Math.floor(t / 3) % 2 === 1;
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: Math.sin(t * 0.5) * 30 }, layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'billboard', false, (v) => { billboard = v; deck.setProps({ layers: layers() }); });
    slider(bar, 'pitch', 0, 80, 1, 65, (v) => deck.setProps({ initialViewState: { ...INITIAL_VIEW_STATE, pitch: v } }));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
