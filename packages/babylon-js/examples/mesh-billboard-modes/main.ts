// Billboard modes: planes that turn to face the camera on no, one or all axes
import {
  ArcRotateCamera,
  Color3,
  DynamicTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = [
  ['NONE', Mesh.BILLBOARDMODE_NONE],
  ['X', Mesh.BILLBOARDMODE_X],
  ['Y', Mesh.BILLBOARDMODE_Y],
  ['ALL', Mesh.BILLBOARDMODE_ALL],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 12, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 12, height: 6 }, scene);

  // A spinning parent, to show how billboards treat their parent's rotation.
  const parent = new TransformNode('parent', scene);
  parent.position.y = 1.4;

  MODES.forEach(([label, mode], i) => {
    const plane = MeshBuilder.CreatePlane(`plane${label}`, { width: 2, height: 1.2, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane.position.x = (i - 1.5) * 2.6;
    plane.parent = parent;
    const tex = new DynamicTexture(`label${label}`, { width: 256, height: 154 }, scene);
    const c = tex.getContext();
    c.fillStyle = `hsl(${i * 80 + 20} 70% 55%)`;
    c.fillRect(0, 0, 256, 154);
    tex.drawText(label, null, 100, 'bold 64px sans-serif', '#111', null);
    const mat = new StandardMaterial(`label${label}`, scene);
    mat.diffuseTexture = tex;
    mat.emissiveColor = new Color3(0.4, 0.4, 0.4);
    plane.material = mat;
    // The whole feature: one property, values 0, 1, 2, 4 or 7.
    plane.billboardMode = mode;
  });

  let spin = 0.004;
  const before = TransformNode.BillboardUseParentOrientation;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('parent spin', 0, 0.03, 0.001, spin, (v) => (spin = v));
    // A static switch: it applies to every billboard on the page, so it is restored on unmount.
    panel.check('TransformNode.BillboardUseParentOrientation', before, (on) => (TransformNode.BillboardUseParentOrientation = on));
  }

  stage.run(() => {
    parent.rotation.z += spin;
    if (ctx.preview) {
      camera.alpha += 0.006;
      camera.beta = 1.1 + Math.sin(camera.alpha) * 0.4;
    }
  });

  return () => {
    TransformNode.BillboardUseParentOrientation = before;
    stage.dispose();
  };
};

export default mount;
