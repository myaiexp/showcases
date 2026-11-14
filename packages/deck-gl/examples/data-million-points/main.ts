// 1M points straight from typed arrays through data.attributes, with live Deck metrics
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { gaussian, seeded } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** Positions in a ring-and-core galaxy shape plus colours, packed the way a worker would. */
function generate(count: number): { positions: Float32Array; colors: Uint8Array } {
  const rand = seeded(1_000_003);
  const positions = new Float32Array(count * 2);
  const colors = new Uint8Array(count * 4);
  for (let i = 0; i < count; i++) {
    const ring = rand() < 0.6;
    const r = ring ? 3 + gaussian(rand) * 0.5 : Math.abs(gaussian(rand)) * 1.2;
    const a = rand() * Math.PI * 2;
    positions[i * 2] = Math.cos(a) * r;
    positions[i * 2 + 1] = Math.sin(a) * r * 0.8;
    colors[i * 4] = ring ? 90 : 255;
    colors[i * 4 + 1] = ring ? 170 : 190;
    colors[i * 4 + 2] = ring ? 255 : 90;
    colors[i * 4 + 3] = 150;
  }
  return { positions, colors };
}

const COUNTS = { '10,000': 10_000, '100,000': 100_000, '1,000,000': 1_000_000 };
type Count = keyof typeof COUNTS;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#070b12' });
  const view: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 5.3 : 5.9 };
  const label = ctx.preview ? null : readout(el, 'generating...');
  let metrics = '';

  const layer = (count: number) => {
    const { positions, colors } = generate(count);
    return new ScatterplotLayer({
      id: `points-${count}`,
      data: {
        length: count,
        attributes: {
          getPosition: { value: positions, size: 2 },
          // Uint8 colours are normalized by default, like every colour attribute.
          getFillColor: { value: colors, size: 4 },
        },
      },
      getRadius: 1,
      radiusUnits: 'pixels',
    });
  };

  let current: Count = ctx.preview ? '10,000' : '1,000,000';
  let built = 0;
  const show = (): void => {
    if (label) label.textContent = `${current} points prepared in ${built} ms${metrics ? `\n${metrics}` : ''}`;
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    _onMetrics: (m) => {
      metrics = `fps ${Math.round(m.fps)}  attributes ${m.updateAttributesCount} updated in ${m.updateAttributesTime.toFixed(0)} ms  GPU buffers ${(m.bufferMemory / 1e6).toFixed(1)} MB`;
      show();
    },
    layers: [],
  });
  const load = (c: Count): void => {
    current = c;
    const t0 = performance.now();
    deck.setProps({ layers: [layer(COUNTS[c])] });
    built = Math.round(performance.now() - t0);
    show();
  };
  load(current);

  const stops: (() => void)[] = [];
  if (ctx.preview) stops.push(animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 12 } })));
  else select(controlBar(el), 'points', Object.keys(COUNTS) as Count[], load, current);
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
