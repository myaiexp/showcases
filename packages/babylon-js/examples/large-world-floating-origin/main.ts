// useLargeWorldRendering beside a plain engine, far from the origin
import { ArcRotateCamera, Color3, Color4, HemisphericLight, MeshBuilder, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import type { Mount, MountContext } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import type { Stage } from '../../shared/stage.ts';

const OFFSETS = ['0', '100000', '1000000', '5000000', '20000000'] as const;

interface Side {
  stage: Stage;
  camera: ArcRotateCamera;
  world: TransformNode;
  caption: HTMLElement;
}

function buildSide(host: HTMLElement, ctx: MountContext, label: string, largeWorld: boolean): Side {
  const cell = document.createElement('div');
  Object.assign(cell.style, { position: 'relative', flex: '1 1 0', minWidth: '0' });
  host.append(cell);
  // useLargeWorldRendering: high-precision matrices on the engine, floating origin on its scenes.
  const stage = createStage(cell, ctx, { engineOptions: { useLargeWorldRendering: largeWorld } });
  const { scene } = stage;
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 14, Vector3.Zero(), scene);
  camera.minZ = 0.1;
  camera.maxZ = 500;

  // A small grid of boxes and spheres, all children of one node that moves out to the offset.
  const world = new TransformNode('world', scene);
  const mat = new StandardMaterial('mat', scene);
  mat.diffuseColor = new Color3(0.9, 0.55, 0.25);
  const mat2 = new StandardMaterial('mat2', scene);
  mat2.diffuseColor = new Color3(0.3, 0.65, 0.95);
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      const m = (x + z) % 2 ? MeshBuilder.CreateBox(`b${x}-${z}`, { size: 0.7 }, scene) : MeshBuilder.CreateSphere(`s${x}-${z}`, { diameter: 0.8, segments: 10 }, scene);
      m.parent = world;
      m.position.set(x * 1.4, 0.4, z * 1.4);
      m.material = (x + z) % 2 ? mat : mat2;
    }
  }
  const caption = document.createElement('div');
  caption.textContent = label;
  Object.assign(caption.style, { position: 'absolute', left: '6px', top: '6px', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', color: '#fff', background: largeWorld ? 'rgba(40,120,70,0.85)' : 'rgba(150,50,50,0.85)', pointerEvents: 'none' });
  cell.append(caption);
  return { stage, camera, world, caption };
}

const mount: Mount = (el, ctx) => {
  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '3px', width: '100%', background: '#000' });
  el.append(row);
  const plain = buildSide(row, ctx, 'plain engine', false);
  const large = buildSide(row, ctx, 'useLargeWorldRendering', true);

  let offset = ctx.preview ? 5_000_000 : 1_000_000;
  let sway = true;
  const place = (): void => {
    for (const side of [plain, large]) {
      side.world.position.set(offset, 0, offset);
      // Move the target far out, then restore the viewing angles around it.
      const { alpha, beta, radius } = side.camera;
      side.camera.setTarget(new Vector3(offset, 0.4, offset));
      side.camera.alpha = alpha;
      side.camera.beta = beta;
      side.camera.radius = radius;
    }
  };
  place();
  if (!ctx.preview) plain.camera.attachControl(plain.stage.canvas, true);

  // Both cameras follow `plain`'s angles, so dragging the left canvas moves both views.
  let t = 0;
  plain.stage.run(() => {
    t += plain.stage.engine.getDeltaTime() / 1000;
    if (sway) plain.camera.alpha = -Math.PI / 2 + Math.sin(t * 0.3) * 0.5;
  });
  large.stage.run(() => {
    large.camera.alpha = plain.camera.alpha;
    large.camera.beta = plain.camera.beta;
    large.camera.radius = plain.camera.radius;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('distance from the origin', OFFSETS, '1000000', (v) => {
      offset = Number(v);
      place();
    });
    panel.check('sway the camera by itself (off: drag the left canvas)', true, (on) => (sway = on));
    panel.readout('Same scene on both sides, far from (0, 0, 0). The left one wobbles as the camera moves; floating origin keeps the right one steady.');
  }

  // scene.floatingOriginMode is read-only: false on the left, true on the right.
  plain.caption.title = `floatingOriginMode: ${plain.stage.scene.floatingOriginMode}`;
  large.caption.title = `floatingOriginMode: ${large.stage.scene.floatingOriginMode}`;

  return () => {
    plain.stage.dispose();
    large.stage.dispose();
    row.remove();
  };
};

export default mount;
