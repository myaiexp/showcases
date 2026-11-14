// PathLayer binary attributes with startIndices, skipping _pathType normalization
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { HOME, ngon, PALETTE } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type PathType = 'open' | 'loop';

/** Eight polygons with 3..10 corners, flattened into the buffers PathLayer reads directly. */
function buildBuffers(): { positions: Float64Array; colors: Uint8Array; startIndices: Uint32Array; length: number } {
  const positions: number[] = [];
  const colors: number[] = [];
  const starts: number[] = [0];
  const count = 8;
  for (let i = 0; i < count; i++) {
    const centre: [number, number] = [HOME[0] + (i - (count - 1) / 2) * 0.012 * 1.27, HOME[1] + (i % 2 === 0 ? 0.008 : -0.008)];
    // ngon() repeats the first vertex to close the ring; an open or loop path must not.
    const ring = ngon(centre, 0.0055, i + 3, Math.PI / 2).slice(0, -1);
    for (const [x, y] of ring) {
      positions.push(x, y);
      // getColor must supply one colour per vertex, in the same layout as getPath.
      colors.push(...PALETTE[i % PALETTE.length]!);
    }
    starts.push(starts[starts.length - 1]! + ring.length);
  }
  return { positions: new Float64Array(positions), colors: new Uint8Array(colors), startIndices: new Uint32Array(starts), length: count };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.6 };
  const { positions, colors, startIndices, length } = buildBuffers();
  let pathType: PathType = 'loop';

  const build = (): PathLayer =>
    new PathLayer({
      id: 'binary-paths',
      data: {
        length,
        // Where each path starts in the vertex buffers: required with binary attributes.
        startIndices,
        attributes: {
          getPath: { value: positions, size: 2 },
          getColor: { value: colors, size: 3 },
        },
      },
      // 'open' or 'loop': use the buffers as-is, no normalization. 'loop' closes each path.
      _pathType: pathType,
      getWidth: 110,
      widthMinPixels: 2,
      jointRounded: true,
    });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      pathType = Math.floor(t / 2.5) % 2 === 0 ? 'loop' : 'open';
      deck.setProps({ layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, `${length} paths, ${positions.length / 2} vertices, no per-object accessors`);
    select(bar, '_pathType', ['loop', 'open'] as const, (v) => { pathType = v; deck.setProps({ layers: [build()] }); info.textContent = `_pathType: '${v}'`; }, 'loop');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
