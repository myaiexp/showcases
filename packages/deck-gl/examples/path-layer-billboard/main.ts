// PathLayer billboard: path width faces the camera, or lies flat on the ground
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, ngon, PALETTE, type Rgb } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Ring {
  color: Rgb;
  path: LngLat[];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.2, pitch: 60, bearing: 0 };
  // Concentric hexagons: the flat ribbon thins out to nothing when seen edge-on.
  const data: Ring[] = [0.012, 0.02, 0.028].map((r, i) => ({
    color: PALETTE[i + 3]!,
    path: ngon(HOME, r, 6, i * 0.3),
  }));
  let billboard = false;

  const build = (): PathLayer<Ring> =>
    new PathLayer<Ring>({
      id: 'rings',
      data,
      getPath: (d) => d.path,
      getColor: (d) => d.color,
      getWidth: 25,
      widthUnits: 'pixels',
      // true: the width always faces the camera. false: the width always faces up.
      billboard,
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
      billboard = Math.floor(t / 3) % 2 === 1;
      deck.setProps({
        viewState: { ...INITIAL_VIEW_STATE, pitch: 50 + Math.sin(t) * 12, bearing: t * 15 },
        layers: [build()],
      });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'billboard', false, (v) => { billboard = v; deck.setProps({ layers: [build()] }); });
    slider(bar, 'pitch', 0, 80, 1, 60, (v) =>
      deck.setProps({ initialViewState: { ...INITIAL_VIEW_STATE, pitch: v } }),
    );
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
