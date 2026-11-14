// Sub-layer sort modes, drawBucket and drawOrder on stacked cards
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const MODES = {
  SORTMODE_BACK2FRONT: pc.SORTMODE_BACK2FRONT,
  SORTMODE_FRONT2BACK: pc.SORTMODE_FRONT2BACK,
  SORTMODE_MATERIALMESH: pc.SORTMODE_MATERIALMESH,
  SORTMODE_MANUAL: pc.SORTMODE_MANUAL,
  SORTMODE_NONE: pc.SORTMODE_NONE,
} as const;
type ModeName = keyof typeof MODES;
const NAMES = Object.keys(MODES) as ModeName[];
const COLOURS = ['#ff4d4d', '#ffb84d', '#4dff6a', '#4dc8ff', '#a78bfa'];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 7, pitch: -8, autoRotate: 18, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app } = rig;
  const world = app.scene.layers.getLayerByName('World')!;

  // Five translucent cards stacked in depth. From the back the order flips, so any mode that
  // ignores distance shows it: back-to-front stays correct from both sides.
  const cards = COLOURS.map((hex, i) => {
    const m = pbrMaterial(hex, { opacity: 0.6, blendType: pc.BLEND_NORMAL, useLighting: false, cull: pc.CULLFACE_NONE });
    m.emissive = new pc.Color().fromString(hex);
    const card = addMesh(app, 'plane', m, [(i - 2) * 0.35, 0, (i - 2) * 0.8], [2.4, 1, 2.4]);
    card.setLocalEulerAngles(90, 0, 0);
    return card;
  });
  const redInstance = (): pc.MeshInstance => cards[0]!.render!.meshInstances[0]!;
  // drawOrder is the manual sort key; Back-to-front is the default for transparent sub-layers.
  cards.forEach((c, i) => (c.render!.meshInstances[0]!.drawOrder = i));

  const setMode = (name: ModeName): void => {
    world.transparentSortMode = MODES[name];
  };
  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      setMode(NAMES[Math.floor(t / 3) % NAMES.length]!);
    });
  } else {
    const panel = createPanel(el);
    panel.select('World transparentSortMode', NAMES, 'SORTMODE_BACK2FRONT', setMode);
    panel.slider('red card drawBucket (default 127)', 0, 255, 1, 127, (v) => (redInstance().drawBucket = v));
    panel.slider('red card drawOrder (manual mode)', -5, 10, 1, 0, (v) => (redInstance().drawOrder = v));
    panel.readout('drawBucket groups render first/last in the sorted modes; drawOrder only matters in manual mode');
  }
  return () => {
    world.transparentSortMode = pc.SORTMODE_BACK2FRONT;
    rig.dispose();
  };
};

export default mount;
