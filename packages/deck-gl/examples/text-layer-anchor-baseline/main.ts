// TextLayer getTextAnchor and getAlignmentBaseline: nine labels around nine marked points
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { HOME, lngPerLat } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Anchor = 'start' | 'middle' | 'end';
type Baseline = 'top' | 'center' | 'bottom';
interface Spot {
  anchor: Anchor;
  baseline: Baseline;
  position: [number, number];
}

const ANCHORS: Anchor[] = ['start', 'middle', 'end'];
const BASELINES: Baseline[] = ['top', 'center', 'bottom'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.4 : 12.2 };
  const spots: Spot[] = [];
  ANCHORS.forEach((anchor, i) =>
    BASELINES.forEach((baseline, j) =>
      spots.push({ anchor, baseline, position: [HOME[0] + (i - 1) * 0.045 * lngPerLat(HOME[1]), HOME[1] + (1 - j) * 0.02] }),
    ),
  );

  const build = (nudge: number): (ScatterplotLayer<Spot> | TextLayer<Spot>)[] => [
    // The marker is the label's position: the anchor and baseline say which part of the text sits on it.
    new ScatterplotLayer<Spot>({
      id: 'markers',
      data: spots,
      getPosition: (d) => d.position,
      radiusUnits: 'pixels',
      getRadius: 4,
      getFillColor: [255, 90, 90],
    }),
    new TextLayer<Spot>({
      id: 'labels',
      data: spots,
      getText: (d) => `${d.anchor} / ${d.baseline}`,
      getPosition: (d) => d.position,
      getSize: 16,
      getColor: [240, 240, 250],
      // Horizontal: 'start' | 'middle' | 'end'. Vertical: 'top' | 'center' | 'bottom'.
      getTextAnchor: (d) => d.anchor,
      getAlignmentBaseline: (d) => d.baseline,
      // A pixel offset moves every label away from its marker the same way.
      getPixelOffset: [nudge, 0],
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: build(0),
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ layers: build(Math.sin(t * 1.5) * 10) })) : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
