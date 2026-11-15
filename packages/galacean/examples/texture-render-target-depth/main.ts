// RenderTarget(engine, w, h, colorTexture, depthTexture): offscreen colour and depth
import { Camera, Layer, MeshRenderer, PrimitiveMesh, RenderTarget, Texture2D, TextureFilterMode, TextureFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, quadMesh, spin, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 7], light: false });
  const say = caption(stage);
  camera.cullingMask = Layer.Layer0;
  const colorTexture = new Texture2D(engine, 512, 512);
  const depthTexture = new Texture2D(engine, 512, 512, TextureFormat.Depth, false);
  depthTexture.filterMode = TextureFilterMode.Point;
  const target = new RenderTarget(engine, 512, 512, colorTexture, depthTexture);
  const knot = add(root, PrimitiveMesh.createTorus(engine, 1, 0.45, 24, 48), unlit(engine, [0.95, 0.5, 0.25]), [0, 0, -40], 'knot');
  knot.entity.layer = Layer.Layer1;
  spin(knot.entity, [30, 50, 0]);
  const offEntity = root.createChild('offscreen camera');
  offEntity.transform.setPosition(0, 0, -34);
  offEntity.transform.lookAt(knot.entity.transform.position.clone().set(0, 0, -40));
  const offscreen = offEntity.addComponent(Camera);
  offscreen.cullingMask = Layer.Layer1;
  offscreen.renderTarget = target;
  offscreen.aspectRatio = 1;
  offscreen.nearClipPlane = 4;
  offscreen.farClipPlane = 12;
  const screens: MeshRenderer[] = [];
  [colorTexture, depthTexture].forEach((texture, i) => {
    const m = unlit(engine, [1, 1, 1]);
    m.baseTexture = texture;
    const e = root.createChild(i ? 'depth screen' : 'color screen');
    e.transform.setPosition((i - 0.5) * 3.6, 0, 0);
    const r = e.addComponent(MeshRenderer);
    r.mesh = quadMesh(engine, 3.2, 3.2);
    r.setMaterial(m);
    screens.push(r);
  });
  say('left: colour attachment   right: depth attachment (near 4, far 12)');
  stage.own(() => {
    screens.forEach((s) => s.mesh.destroy());
    target.destroy();
    colorTexture.destroy();
    depthTexture.destroy();
  });
  return stage.dispose;
};

export default mount;
