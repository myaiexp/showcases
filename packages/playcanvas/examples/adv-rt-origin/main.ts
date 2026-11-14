// RenderTarget origin: NATIVE, TOP and BOTTOM change row order
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, createFeed, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const ORIGINS = {
  TOP: pc.RENDERTARGET_ORIGIN_TOP,
  BOTTOM: pc.RENDERTARGET_ORIGIN_BOTTOM,
  NATIVE: pc.RENDERTARGET_ORIGIN_NATIVE,
} as const;
type OriginName = keyof typeof ORIGINS;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8.5, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const feed = createFeed(app);
  onTick(app, (t) => feed.animate(t));

  // Both screens show the same texture; only the target's origin differs. The reference screen
  // (left) is always TOP: row 0 is the top of the image on every graphics API.
  const makeTarget = (origin: string): { texture: pc.Texture; target: pc.RenderTarget; camera: pc.Entity } => {
    const texture = renderTexture(stage.device, 320, 240);
    const target = new pc.RenderTarget({ colorBuffer: texture, depth: true, origin });
    const camera = feed.addCamera({ renderTarget: target, priority: -1 });
    return { texture, target, camera };
  };
  const reference = makeTarget(pc.RENDERTARGET_ORIGIN_TOP);
  const referenceMaterial = screenMaterial(reference.texture);
  addScreen(app, referenceMaterial, [-2.6, 0, 0], 4, 3);

  let chosen = makeTarget(ORIGINS[ctx.preview ? 'BOTTOM' : 'NATIVE']);
  let chosenMaterial = screenMaterial(chosen.texture);
  let chosenScreen = addScreen(app, chosenMaterial, [2.6, 0, 0], 4, 3);

  const choose = (name: OriginName): void => {
    chosenScreen.destroy();
    chosenMaterial.destroy();
    chosen.camera.destroy();
    chosen.target.destroy();
    chosen.texture.destroy();
    chosen = makeTarget(ORIGINS[name]);
    chosenMaterial = screenMaterial(chosen.texture);
    chosenScreen = addScreen(app, chosenMaterial, [2.6, 0, 0], 4, 3);
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('origin (right screen)', Object.keys(ORIGINS) as OriginName[], 'NATIVE', choose);
    panel.row();
    panel.readout(`device: ${stage.device.deviceType}. Left: TOP, upright everywhere. NATIVE is stored as the API likes: bottom row first on WebGL 2, top row first on WebGPU.`);
  }

  return () => {
    for (const r of [reference, chosen]) {
      r.camera.destroy();
      r.target.destroy();
      r.texture.destroy();
    }
    referenceMaterial.destroy();
    chosenMaterial.destroy();
    feed.dispose();
    scene.dispose();
  };
};

export default mount;
