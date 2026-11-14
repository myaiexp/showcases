// PolygonLayer extruded: getElevation heights, elevationScale, lit from above
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { HOME, blocks, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.3 : 12.9, pitch: 55, bearing: -20 };
  const data = blocks(7, 6);

  const build = (elevationScale: number): PolygonLayer<Block> =>
    new PolygonLayer<Block>({
      id: 'towers',
      data,
      getPolygon: (d) => d.polygon,
      // Only applies with extruded: true; metres in a map view.
      extruded: true,
      getElevation: (d) => d.height,
      // The final height is elevationScale * getElevation(d), so the data never has to change.
      elevationScale,
      getFillColor: (d) => [90 + d.value * 150, 140 + d.value * 80, 255 - d.value * 90],
      stroked: false,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build(1)],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) =>
      deck.setProps({
        viewState: { ...INITIAL_VIEW_STATE, bearing: -20 + t * 10 },
        layers: [build(1.2 + Math.sin(t * 1.1))],
      }),
    );
  } else {
    const bar = controlBar(el);
    slider(bar, 'elevationScale', 0, 5, 0.1, 1, (v) => deck.setProps({ layers: [build(v)] }));
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
