// Deck _typedArrayManagerProps: spare attribute room, read off GPU memory
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const OVER = ['1', '2', '4'] as const;
type Over = (typeof OVER)[number];
// The documented defaults, restored on cleanup: the manager is shared by every Deck.
const DEFAULTS = { overAlloc: 2, poolSize: 100 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let over: Over = '2';
  let version = 0;
  let shown = 1000;

  const layers = (count: number) => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      // Each load is a new layer, so its attributes are allocated afresh.
      id: `points-${version}`,
      data: pointCloud(count, { seed: version + 1, spread: 3 }),
      getPosition: (d) => d.position,
      getRadius: 3,
      radiusUnits: 'pixels',
      getFillColor: [255, 170, 70, 200],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    _typedArrayManagerProps: { overAlloc: Number(over), poolSize: DEFAULTS.poolSize },
    layers: layers(1000),
    // Called once a second with the counters: memory is the current total.
    _onMetrics: (m) => {
      label.textContent = `overAlloc ${over}, ${shown.toLocaleString()} points -> buffers ${(m.bufferMemory / 1e6).toFixed(2)} MB (GPU total ${(m.gpuMemory / 1e6).toFixed(2)} MB)`;
    },
  });

  const load = (count: number): void => {
    version++;
    deck.setProps({ _typedArrayManagerProps: { overAlloc: Number(over), poolSize: DEFAULTS.poolSize }, layers: layers(count) });
    shown = count;
  };
  label.textContent = 'waiting for the first metrics callback (once a second)...';

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      over = OVER[i % OVER.length]!;
      load(i % 2 ? 6000 : 1000);
    }, 2200);
  } else {
    const bar = controlBar(el);
    select(bar, 'overAlloc', OVER, (v) => {
      over = v;
    }, over);
    button(bar, 'Load 1,000 points', () => load(1000));
    button(bar, 'Load 20,000 points', () => load(20_000));
    button(bar, 'Load 100,000 points', () => load(100_000));
  }

  return () => {
    window.clearInterval(timer);
    deck.setProps({ _typedArrayManagerProps: DEFAULTS });
    stage.release(deck);
  };
};

export default mount;
