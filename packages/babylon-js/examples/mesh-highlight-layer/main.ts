// HighlightLayer: outline picked meshes, inner/outer glow, animated blur
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  HighlightLayer,
  MeshBuilder,
  PointerEventTypes,
  StandardMaterial,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  // The highlight layer paints through the stencil buffer, which the stage's engine enables.
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 11, new Vector3(0, 0.8, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  const ground = MeshBuilder.CreateGround('ground', { width: 12, height: 8 }, scene);

  const shapes: Mesh[] = [
    MeshBuilder.CreateSphere('sphere', { diameter: 1.6 }, scene),
    MeshBuilder.CreateBox('box', { size: 1.4 }, scene),
    MeshBuilder.CreateTorusKnot('knot', { radius: 0.6, tube: 0.2 }, scene),
    MeshBuilder.CreateCylinder('cylinder', { diameter: 1.2, height: 1.8 }, scene),
  ];
  shapes.forEach((s, i) => {
    s.position.set((i - 1.5) * 2.6, 1, 0);
    const mat = new StandardMaterial(s.name, scene);
    mat.diffuseColor = new Color3(0.7, 0.72, 0.78);
    s.material = mat;
  });

  const colors = [Color3.Green(), new Color3(1, 0.6, 0), Color3.Teal(), Color3.Magenta()];
  const hl = new HighlightLayer('hl1', scene, { camera });
  let selected = new Set<Mesh>();
  const toggle = (mesh: Mesh): void => {
    if (selected.has(mesh)) {
      hl.removeMesh(mesh);
      selected.delete(mesh);
    } else {
      hl.addMesh(mesh, colors[shapes.indexOf(mesh)]!);
      selected.add(mesh);
    }
  };
  // A second layer for the ground, so its outline doesn't cancel where it overlaps the shapes.
  const groundLayer = new HighlightLayer('hl2', scene, { camera });
  groundLayer.innerGlow = false;

  let animateBlur = true;
  if (!ctx.preview) {
    toggle(shapes[0]!);
    const onPick = scene.onPointerObservable.add((info) => {
      const mesh = info.pickInfo?.pickedMesh as Mesh | undefined;
      if (info.type === PointerEventTypes.POINTERTAP && mesh && shapes.includes(mesh)) toggle(mesh);
    });
    stage.scene.onDisposeObservable.addOnce(() => onPick.remove());
    const panel = createPanel(el);
    panel.readout('Click shapes to toggle their highlight.');
    panel.check('innerGlow', true, (on) => (hl.innerGlow = on));
    panel.check('outerGlow', true, (on) => (hl.outerGlow = on));
    panel.check('animate blur size', true, (on) => (animateBlur = on));
    panel.check('outline the ground (second layer)', false, (on) => (on ? groundLayer.addMesh(ground, Color3.Red()) : groundLayer.removeMesh(ground)));
  }

  let alpha = 0;
  let step = 0;
  stage.run(() => {
    alpha += 0.06;
    if (animateBlur) {
      hl.blurHorizontalSize = 0.3 + Math.cos(alpha) * 0.6 + 0.6;
      hl.blurVerticalSize = 0.3 + Math.sin(alpha / 3) * 0.6 + 0.6;
    }
    // The card walks the highlight along the row on its own.
    if (ctx.preview && ++step % 50 === 0) {
      selected.forEach((m) => hl.removeMesh(m));
      selected = new Set();
      toggle(shapes[(step / 50) % shapes.length]!);
    }
  });

  return () => {
    hl.dispose();
    groundLayer.dispose();
    stage.dispose();
  };
};

export default mount;
