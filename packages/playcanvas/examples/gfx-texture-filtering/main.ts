// Texture minFilter, magFilter and anisotropy at a grazing angle
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';
import { checkerTexture } from '../../shared/textures.ts';

const FILTERS = {
  FILTER_NEAREST: pc.FILTER_NEAREST,
  FILTER_LINEAR: pc.FILTER_LINEAR,
  FILTER_NEAREST_MIPMAP_NEAREST: pc.FILTER_NEAREST_MIPMAP_NEAREST,
  FILTER_NEAREST_MIPMAP_LINEAR: pc.FILTER_NEAREST_MIPMAP_LINEAR,
  FILTER_LINEAR_MIPMAP_NEAREST: pc.FILTER_LINEAR_MIPMAP_NEAREST,
  FILTER_LINEAR_MIPMAP_LINEAR: pc.FILTER_LINEAR_MIPMAP_LINEAR,
} as const;
type FilterName = keyof typeof FILTERS;
const NAMES = Object.keys(FILTERS) as FilterName[];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 7, pitch: -7, clearColor: new pc.Color(0.5, 0.6, 0.75) });
  const { app, stage } = rig;
  sway(app, rig.orbit, 20, 0.4);

  // A tiny 32px checker: small enough to magnify near the camera and to alias in the distance.
  const texture = rig.own(checkerTexture(stage.device, '#eef0f6', '#2f3542', 8, 32));
  const ground = pbrMaterial('#ffffff', { diffuseMap: texture, diffuseMapTiling: new pc.Vec2(24, 24), useLighting: false });
  addMesh(app, 'plane', ground, [0, 0, 0], [60, 1, 60]);

  const setMin = (name: FilterName): void => void (texture.minFilter = FILTERS[name]);
  if (ctx.preview) {
    // Cards cycle through the minification filters on their own.
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      texture.minFilter = FILTERS[NAMES[Math.floor(t / 1.5) % NAMES.length]!];
    });
  } else {
    const panel = createPanel(el);
    panel.select('minFilter', NAMES, 'FILTER_LINEAR_MIPMAP_LINEAR', setMin);
    panel.select('magFilter', ['FILTER_NEAREST', 'FILTER_LINEAR'] as const, 'FILTER_LINEAR', (n) => (texture.magFilter = FILTERS[n]));
    const max = stage.device.maxAnisotropy;
    panel.slider(`anisotropy (max ${max})`, 1, max, 1, 1, (v) => (texture.anisotropy = v));
    panel.readout('anisotropy keeps the far checks sharp at grazing angles; it needs mipmapped min filters');
  }
  return () => rig.dispose();
};

export default mount;
