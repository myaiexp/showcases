// ScatterplotLayer fed typed arrays through data.attributes: 50,000 circles with no accessors
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { gaussian, seeded } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** Positions, radii and colours packed into flat typed arrays, as a server or worker would. */
function pack(count: number): { positions: Float32Array; radii: Float32Array; colors: Uint8Array } {
  const rand = seeded(21);
  const positions = new Float32Array(count * 2);
  const radii = new Float32Array(count);
  const colors = new Uint8Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Three arms of a spiral galaxy, as flat longitude/latitude pairs.
    const arm = i % 3;
    const t = rand() * 3.2;
    const a = t * 2 + (arm * Math.PI * 2) / 3;
    positions[i * 2] = Math.cos(a) * t * 2.2 + gaussian(rand) * 0.25;
    positions[i * 2 + 1] = Math.sin(a) * t * 1.6 + gaussian(rand) * 0.25;
    radii[i] = 1000 + rand() * 6000;
    colors[i * 3] = 120 + t * 40;
    colors[i * 3 + 1] = 160 - t * 20;
    colors[i * 3 + 2] = 255 - t * 40;
  }
  return { positions, radii, colors };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#070b12' });
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 4.4 : 5.4 };
  const count = ctx.preview ? 8000 : 50_000;
  const { positions, radii, colors } = pack(count);

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [
      new ScatterplotLayer({
        id: 'binary-points',
        // Instead of an array of objects: a length and one typed array per attribute.
        data: {
          length: count,
          attributes: {
            getPosition: { value: positions, size: 2 },
            getRadius: { value: radii, size: 1 },
            getFillColor: { value: colors, size: 3 },
          },
        },
        radiusMinPixels: 0.6,
        opacity: 0.7,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: t * 10 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
