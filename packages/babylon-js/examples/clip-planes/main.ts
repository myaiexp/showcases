// Scene clip planes slicing everything, and a material clip plane on one mesh
import { ArcRotateCamera, Color3, Color4, HemisphericLight, MeshBuilder, Plane, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.3, 1.2, 12, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);

  const solid = (name: string, c: Color3): StandardMaterial => {
    const m = new StandardMaterial(name, scene);
    m.diffuseColor = c;
    m.backFaceCulling = false; // so the inside shows where a mesh is cut open
    m.twoSidedLighting = true;
    return m;
  };
  const knot = MeshBuilder.CreateTorusKnot('knot', { radius: 1.3, tube: 0.45, radialSegments: 96, tubularSegments: 24 }, scene);
  knot.position.set(-2.4, 1.6, 0);
  knot.material = solid('knot-mat', new Color3(0.9, 0.45, 0.2));
  const ball = MeshBuilder.CreateSphere('ball', { diameter: 3, segments: 32 }, scene);
  ball.position.set(2.4, 1.6, 0);
  ball.material = solid('ball-mat', new Color3(0.25, 0.6, 0.9));
  const lamp = MeshBuilder.CreateBox('box', { size: 1.6 }, scene);
  lamp.position.set(0, 0.8, 2.8);
  const lampMat = solid('box-mat', new Color3(0.4, 0.8, 0.4));
  lamp.material = lampMat;

  // A clip plane discards what lies on the positive side of the plane: (a, b, c) is the
  // normal and d the offset, so (0, 1, 0, -h) keeps everything below the height h.
  const state = { height: 3.4, side: 0, useSide: false, material: false };
  const apply = (): void => {
    scene.clipPlane = new Plane(0, 1, 0, -state.height);
    scene.clipPlane2 = state.useSide ? new Plane(1, 0, 0, -state.side) : null;
    // Since 5.33 a clip plane can also live on a material: only that mesh is clipped.
    lampMat.clipPlane = state.material ? new Plane(0, -1, 0, 0.8) : null;
  };
  apply();

  let t = 0;
  stage.run(() => {
    if (ctx.preview) {
      t += scene.getEngine().getDeltaTime() / 1000;
      state.height = 1.8 + Math.sin(t * 0.9) * 1.7;
      camera.alpha += 0.004;
      apply();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('scene.clipPlane height', 0, 4, 0.05, state.height, (v) => ((state.height = v), apply()));
    panel.check('scene.clipPlane2 on', false, (on) => ((state.useSide = on), apply()));
    panel.slider('clipPlane2 x (left of it is kept)', -4, 4, 0.05, 0, (v) => ((state.side = v), apply()));
    panel.check('material.clipPlane on the green box', false, (on) => ((state.material = on), apply()));
  }

  return () => stage.dispose();
};

export default mount;
