// Deck pickingRadius: extra pixels around the pointer, so tiny targets are hit
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { lngLatAt, screenOf } from '../../shared/guide-picking.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const DATA = pointCloud(80, { seed: 33, spread: 2.2 });

interface Reach {
  at: [number, number];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3.4 : 4.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover near the dots');
  let radius = 14;
  let reach: Reach | null = null;
  let hit = -1;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: DATA,
      getPosition: (d) => d.position,
      getFillColor: [255, 190, 90],
      getRadius: 2.5,
      radiusUnits: 'pixels',
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 255],
      highlightedObjectIndex: ctx.preview ? hit : null,
    }),
    // Shows how far the picking reaches around the pointer.
    new ScatterplotLayer<Reach>({
      id: 'reach',
      data: reach ? [reach] : [],
      getPosition: (d) => d.at,
      getRadius: radius,
      radiusUnits: 'pixels',
      filled: false,
      stroked: true,
      getLineColor: [120, 220, 255, 200],
      lineWidthMinPixels: 1,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    pickingRadius: radius,
    layers: layers(),
    onHover: ({ x, y, index }) => {
      reach = { at: lngLatAt(deck, x, y) ?? [0, 0] };
      label.textContent = `pickingRadius ${radius}px: ${index >= 0 ? `point ${index}` : 'no point in reach'}`;
      deck.setProps({ layers: layers() });
    },
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // A moving ring stands in for the pointer; pickObject takes the radius per call.
    stop = animate((t) => {
      const at: [number, number] = [8 + Math.cos(t * 0.8) * 3.5, 47 + Math.sin(t * 0.8) * 2.5];
      const px = screenOf(deck, at);
      if (!px) return;
      reach = { at };
      hit = deck.pickObject({ x: px[0], y: px[1], radius })?.index ?? -1;
      label.textContent = `radius ${radius}px: ${hit >= 0 ? `point ${hit}` : 'no point in reach'}`;
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'pickingRadius', 0, 40, 2, radius, (v) => {
      radius = v;
      deck.setProps({ pickingRadius: v, layers: layers() });
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
