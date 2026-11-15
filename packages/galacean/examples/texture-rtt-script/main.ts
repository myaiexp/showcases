// onBeginRender renders Layer0 into a RenderTarget, then Layer1 to screen
import { type Camera, Layer, PrimitiveMesh, RenderTarget, Script, Texture2D, type Entity } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, pbr, quadMesh, spin, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 8], target: [0, 0, 0], hint: 'Object A never reaches the screen directly: only through object B\'s texture.' });
  const a = add(root, PrimitiveMesh.createTorus(engine, 1, 0.4, 24, 48), pbr(engine, [0.95, 0.5, 0.25], 0.2, 0.3), [0, 0, 0], 'object A');
  a.entity.layer = Layer.Layer0;
  spin(a.entity, [30, 50, 0]);
  const backdrop = add(root, quadMesh(engine, 12, 12), unlit(engine, [0.2, 0.45, 0.7]), [0, 0, -2.5], 'backdrop');
  backdrop.entity.layer = Layer.Layer0;
  const materialB = unlit(engine, [1, 1, 1]);
  const b = add(root, PrimitiveMesh.createCuboid(engine, 3, 3, 3), materialB, [0, 0, 0], 'object B');
  b.entity.layer = Layer.Layer1;
  spin(b.entity, [10, 25, 0]);

  class SwitchRT extends Script {
    renderColorTexture = new Texture2D(engine, 1024, 1024);
    renderTarget = new RenderTarget(engine, 1024, 1024, this.renderColorTexture);
    constructor(entity: Entity) {
      super(entity);
      materialB.baseTexture = this.renderColorTexture;
    }
    override onBeginRender(cam: Camera): void {
      cam.renderTarget = this.renderTarget;
      cam.cullingMask = Layer.Layer0;
      cam.aspectRatio = 1;
      cam.render();
      cam.resetAspectRatio();
      cam.renderTarget = null;
      cam.cullingMask = Layer.Layer1;
    }
    override onDestroy(): void {
      this.renderTarget.destroy();
      this.renderColorTexture.destroy();
    }
  }
  camera.entity.addComponent(SwitchRT);
  return stage.dispose;
};

export default mount;
