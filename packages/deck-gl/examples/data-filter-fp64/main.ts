// DataFilterExtension fp64: epoch-second filter values need 64-bit precision
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension, type DataFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { EU_VIEW } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Tick {
  position: [number, number];
  /** Unix epoch seconds: ~1.7 billion, past what a 32-bit float can tell apart. */
  timestamp: number;
}
const BASE = 1_760_000_000;
const COLS = 40;
// One dot per second over 800 seconds, laid out in a grid
const ticks: Tick[] = Array.from({ length: 800 }, (_, i) => ({
  position: [-3 + (i % COLS) * 0.4, 40 + Math.floor(i / COLS) * 0.55],
  timestamp: BASE + i,
}));
const WINDOW = 99;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let start = 300;
  let fp64 = true;
  let shown: HTMLElement | null = null;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Tick, DataFilterExtensionProps<Tick>>({
      // A new extension option needs a new layer id
      id: `ticks-${fp64}`,
      data: ticks,
      getPosition: (d) => d.position,
      getRadius: 9000,
      radiusMinPixels: 4,
      getFillColor: [255, 170, 70],
      getFilterValue: (d) => d.timestamp,
      // 100 seconds: with 32-bit floats near 1.76e9 each value snaps to a multiple of 128 s
      filterRange: [BASE + start, BASE + start + WINDOW],
      onFilteredItemsChange: ({ count }) => {
        if (shown) shown.textContent = `${count} dots pass; exactly ${WINDOW + 1} timestamps are in the range (fp64: ${fp64})`;
      },
      extensions: [new DataFilterExtension({ filterSize: 1, fp64, countItems: true })],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.1, latitude: 45 } : { ...EU_VIEW, zoom: 5, latitude: 45 },
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      start = 350 + 300 * Math.sin(t * 0.6);
      fp64 = Math.floor(t / 3) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    shown = readout(el);
    slider(bar, `filterRange start (seconds after ${BASE})`, 0, 700, 1, start, (v) => {
      start = v;
      deck.setProps({ layers: layers() });
    });
    check(bar, 'fp64', true, (v) => {
      fp64 = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    shown = null;
    stage.release(deck);
  };
};

export default mount;
