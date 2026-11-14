// PolygonLayer outline width: lineWidthUnits, lineWidthScale and pixel clamps
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { HOME, blocks, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Units = 'meters' | 'common' | 'pixels';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.2 : 12.8 };
  const data = blocks(6, 5);
  const state = { units: 'meters' as Units, scale: 1, min: 0, max: 30 };
  const widthFor = (u: Units): number => (u === 'pixels' ? 4 : u === 'meters' ? 40 : 0.006);

  const build = (): PolygonLayer<Block> =>
    new PolygonLayer<Block>({
      id: 'outlines',
      data,
      getPolygon: (d) => d.polygon,
      filled: true,
      getFillColor: [30, 50, 80],
      stroked: true,
      getLineColor: (d) => [120 + d.value * 135, 200, 255 - d.value * 140],
      // Only applies when extruded is false.
      getLineWidth: widthFor(state.units),
      lineWidthUnits: state.units,
      lineWidthScale: state.scale,
      lineWidthMinPixels: state.min,
      lineWidthMaxPixels: state.max,
    });
  const update = (): void => deck.setProps({ layers: [build()] });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.scale = 1 + 2.2 * (0.5 + 0.5 * Math.sin(t * 1.5));
      deck.setProps({ layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'lineWidthUnits', ['meters', 'common', 'pixels'] as const, (v) => { state.units = v; update(); }, 'meters');
    slider(bar, 'lineWidthScale', 0.2, 5, 0.1, 1, (v) => { state.scale = v; update(); });
    slider(bar, 'lineWidthMinPixels', 0, 12, 1, 0, (v) => { state.min = v; update(); });
    slider(bar, 'lineWidthMaxPixels', 1, 40, 1, 30, (v) => { state.max = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
