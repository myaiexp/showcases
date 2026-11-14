// Attribute transitions on colour and radius; enter backfills new points
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const ALL = pointCloud(240, { seed: 61, spread: 2.6 });
const PALETTES: Color[][] = [
  [[255, 90, 60, 255], [255, 190, 60, 255], [255, 120, 160, 255]],
  [[60, 150, 255, 255], [70, 230, 200, 255], [150, 120, 255, 255]],
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  let count = 60;
  let palette = 0;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: ALL.slice(0, count),
      getPosition: (d) => d.position,
      getFillColor: (d) => PALETTES[palette]![d.cluster % 3]!,
      getRadius: (d) => 4 + d.value * 8,
      radiusUnits: 'pixels',
      transitions: {
        getFillColor: {
          duration: 900,
          easing: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2, // ease-in-out-sine
          // Points that appear start from their own colour with alpha 0.
          enter: ([r, g, b]: Color) => [r, g, b, 0],
        },
        getRadius: { duration: 900, enter: () => [0] },
      },
      updateTriggers: { getFillColor: palette },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const refresh = (): void => deck.setProps({ layers: layers() });

  let timer = 0;
  if (ctx.preview) {
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      if (step % 2) count = count > 150 ? 60 : count + 70;
      else palette = 1 - palette;
      refresh();
    }, 1600);
  } else {
    const bar = controlBar(el);
    button(bar, 'Swap palette', () => {
      palette = 1 - palette;
      refresh();
    });
    button(bar, 'Add 40 points', () => {
      count = Math.min(ALL.length, count + 40);
      refresh();
    });
    button(bar, 'Reset to 60', () => {
      count = 60;
      refresh();
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
