// ScatterplotLayer antialiasing: smoothed circle edges, and the artifacts where circles overlap
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 8, latitude: 47, zoom: 5.4 };
  const data = pointCloud(ctx.preview ? 60 : 160, { seed: 6, spread: 1.4, centres: [[8, 47]] });
  let antialiasing = true;
  let stroked = false;

  const build = (): ScatterplotLayer<SamplePoint> =>
    new ScatterplotLayer<SamplePoint>({
      id: 'cloud',
      data,
      getPosition: (d) => d.position,
      radiusUnits: 'pixels',
      getRadius: 22,
      getFillColor: [255, 190, 90, 120],
      stroked,
      getLineColor: [255, 255, 255, 200],
      getLineWidth: 2,
      lineWidthUnits: 'pixels',
      // true (default): smoothed edges. false: rough edges, no artifacts between circles.
      antialiasing,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      antialiasing = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'antialiasing', true, (v) => { antialiasing = v; deck.setProps({ layers: [build()] }); });
    check(bar, 'stroked', false, (v) => { stroked = v; deck.setProps({ layers: [build()] }); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
