// EdgesRenderer: edges drawn where neighbouring faces meet at more than an angle
import {
  ArcRotateCamera,
  Color3,
  Color4,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 12, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.4), scene);

  const shapes: Mesh[] = [
    MeshBuilder.CreateBox('box', { size: 1.6 }, scene),
    MeshBuilder.CreateCylinder('cylinder', { diameter: 1.6, height: 1.8, tessellation: 12 }, scene),
    MeshBuilder.CreateSphere('sphere', { diameter: 1.8, segments: 8 }, scene),
    MeshBuilder.CreateTorus('torus', { diameter: 1.8, thickness: 0.5, tessellation: 16 }, scene),
  ];
  const mat = new StandardMaterial('mat', scene);
  mat.diffuseColor = new Color3(0.85, 0.85, 0.9);
  // A see-through version, where edges would otherwise draw over everything behind.
  const glass = new StandardMaterial('glass', scene);
  glass.diffuseColor = new Color3(0.6, 0.8, 1);
  glass.alpha = 0.4;

  const state = { epsilon: 0.95, width: 4 };
  const apply = (): void => {
    shapes.forEach((s) => {
      // Edges appear where the dot product of two face normals is below epsilon:
      // 0.95 is about 18°; closer to 1 means even gentle bends get an edge.
      s.disableEdgesRendering();
      s.enableEdgesRendering(state.epsilon);
      s.edgesWidth = state.width;
      s.edgesColor = new Color4(0.1, 0.2, 0.9, 1);
    });
  };
  shapes.forEach((s, i) => {
    s.position.set((i - 1.5) * 2.6, 1.1, 0);
    s.material = mat;
  });
  apply();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('epsilon', 0.5, 0.9999, 0.0001, state.epsilon, (v) => ((state.epsilon = v), apply()));
    panel.slider('edgesWidth', 0.5, 12, 0.5, state.width, (v) => {
      state.width = v;
      shapes.forEach((s) => (s.edgesWidth = v));
    });
    panel.check('transparent material', false, (on) => shapes.forEach((s) => (s.material = on ? glass : mat)));
    panel.check('forceDepthWrite on it', false, (on) => (glass.forceDepthWrite = on));
  }

  stage.run(() => shapes.forEach((s) => (s.rotation.y += 0.006)));
  return () => stage.dispose();
};

export default mount;
