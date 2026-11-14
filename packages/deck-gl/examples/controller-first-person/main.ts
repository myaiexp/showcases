// FirstPersonController: scroll walks forward, drag turns your head, shift-drag pans
import { Deck, FirstPersonController, FirstPersonView } from '@deck.gl/core';
import type { FirstPersonViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { blocks, HOME, type Block } from '../../shared/core-layers-geometry.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

const GROUND: [number, number][] = [[HOME[0] - 0.05, HOME[1] - 0.05], [HOME[0] + 0.05, HOME[1] - 0.05], [HOME[0] + 0.05, HOME[1] + 0.05], [HOME[0] - 0.05, HOME[1] + 0.05]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#2a3d58' });
  const home: FirstPersonViewState = { longitude: HOME[0], latitude: HOME[1], position: [0, -400, 2], bearing: 0, pitch: 0 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Scroll to move along your gaze, drag to look around, arrow keys to walk.');

  const deck = new Deck({
    device: stage.device,
    views: new FirstPersonView({ id: 'pov', far: 4000 }),
    initialViewState: home,
    // FirstPersonController is the default for this view; naming it shows where options go.
    controller: ctx.preview ? false : { type: FirstPersonController, dragMode: 'rotate' },
    layers: [
      new PolygonLayer<[number, number][]>({ id: 'ground', data: [GROUND], getPolygon: (d) => d, getFillColor: [38, 50, 46], stroked: false }),
      new PolygonLayer<Block>({
        id: 'blocks',
        data: blocks(8, 8, { cell: 0.002 }),
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: (d) => [90 + d.value * 120, 110 + d.value * 70, 150 + d.value * 60],
        material: { ambient: 0.45, diffuse: 0.7, shininess: 20 },
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const phase = Math.floor(t / 3) % 2;
      const u = (t % 3) / 3;
      info.textContent = phase === 0 ? 'scroll: move forward' : 'drag: look around';
      deck.setProps({
        viewState: phase === 0
          ? { ...home, position: [0, -400 + u * 500, 2] }
          : { ...home, position: [0, 100, 2], bearing: Math.sin(u * Math.PI * 2) * 70, pitch: Math.cos(u * Math.PI * 2) * 10 },
      });
    });
  } else {
    select(controlBar(el), 'dragMode', ['rotate', 'pan'] as const, (mode) => deck.setProps({ controller: { type: FirstPersonController, dragMode: mode } }), 'rotate');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
