// S2Layer: one outline layer per level shows the parent / child nesting
import { Deck } from '@deck.gl/core';
import type { Layer, MapViewState } from '@deck.gl/core';
import { S2Layer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { s2Key } from '../../shared/geo-layers-cells.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const LEVEL_COLORS: [number, number, number][] = [[255, 190, 70], [90, 210, 255], [255, 110, 150], [150, 240, 140]];

/** Hilbert quad keys of every cell at `level` on face 0. */
function keys(level: number): string[] {
  const n = 4 ** level;
  return Array.from({ length: n }, (_, i) => s2Key(0, i.toString(4).padStart(level, '0')));
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 0, latitude: 15, zoom: ctx.preview ? 1.6 : 2.5 };

  const levels = (shown: boolean[]): Layer[] => [
    landLayer(),
    ...shown.map((on, i) =>
      new S2Layer<string>({
        id: `s2-level-${i + 1}`,
        data: keys(i + 1),
        getS2Token: (d) => d,
        filled: i === 0,
        getFillColor: [255, 190, 70, 40],
        stroked: true,
        getLineColor: [...LEVEL_COLORS[i]!, 230],
        // Coarser levels are drawn with the heavier lines.
        getLineWidth: 4 - i,
        lineWidthUnits: 'pixels',
        visible: on,
        pickable: !ctx.preview,
      }),
    ),
  ];
  let shown = [true, true, true, ctx.preview ? false : true];
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: levels(shown),
    getTooltip: ({ object }: { object?: string }) => (object ? `${object} (level ${object.length - 2})` : null),
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const depth = 1 + (Math.floor(t / 1.5) % 3);
      shown = [true, depth >= 2, depth >= 3, false];
      deck.setProps({ layers: levels(shown) });
    });
  } else {
    const bar = controlBar(el);
    for (let i = 0; i < 4; i++) check(bar, `level ${i + 1}`, shown[i]!, (v) => ((shown = shown.map((s, j) => (j === i ? v : s))), deck.setProps({ layers: levels(shown) })));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
