// TrailMesh: ribbons that follow moving meshes, with taper, diameter and length options
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  TrailMesh,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 0.9, 30, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  const opts = { diameter: 1.2, length: 80, segments: 40, sections: 4, doNotTaper: false };
  const movers: { mesh: Mesh; trail: TrailMesh; color: Color3; phase: number }[] = [];
  const makeTrail = (generator: Mesh, color: Color3): TrailMesh => {
    const trail = new TrailMesh(`${generator.name}-trail`, generator, scene, { ...opts, autoStart: true });
    const mat = new StandardMaterial(`${generator.name}-trail`, scene);
    mat.emissiveColor = mat.diffuseColor = color;
    mat.specularColor = Color3.Black();
    trail.material = mat;
    return trail;
  };

  for (let i = 0; i < 3; i++) {
    const mesh = MeshBuilder.CreateBox(`cube${i}`, { size: 1 }, scene);
    // Scale, then bake it in, so the trail isn't stretched by the generator's scaling.
    mesh.scaling.y = 2;
    mesh.bakeCurrentTransformIntoVertices();
    const color = Color3.FromHSV(i * 120, 0.8, 1);
    const mat = new StandardMaterial(`cube${i}`, scene);
    mat.diffuseColor = color;
    mesh.material = mat;
    const phase = (i * Math.PI * 2) / 3;
    mesh.position.set(Math.sin(phase) * 10, 0, Math.cos(phase) * 10);
    mesh.computeWorldMatrix(true);
    movers.push({ mesh, trail: makeTrail(mesh, color), color, phase });
  }

  // Trail options apply at creation, so changing them rebuilds the trails.
  const rebuild = (): void => {
    for (const m of movers) {
      m.trail.dispose();
      m.trail = makeTrail(m.mesh, m.color);
    }
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('diameter', 0.1, 3, 0.1, opts.diameter, (v) => ((opts.diameter = v), rebuild()));
    panel.slider('length', 10, 200, 5, opts.length, (v) => ((opts.length = v), rebuild()));
    panel.slider('sections', 2, 12, 1, opts.sections, (v) => ((opts.sections = v), rebuild()));
    panel.check('doNotTaper', false, (on) => ((opts.doNotTaper = on), rebuild()));
    panel.row();
    panel.button('stop()', () => movers.forEach((m) => m.trail.stop()));
    panel.button('start()', () => movers.forEach((m) => m.trail.start()));
    panel.button('reset()', () => movers.forEach((m) => m.trail.reset()));
  }

  let alpha = 0;
  stage.run(() => {
    alpha += Math.PI / 120;
    movers.forEach(({ mesh, phase }, i) => {
      const a = alpha * (1 + i * 0.15) + phase;
      mesh.position.set(Math.sin(a) * 10, Math.sin(a * 2) * 3, Math.cos(a) * 10);
      mesh.rotation.x = (Math.PI * a) / 2;
      mesh.rotation.y = a;
    });
  });

  return () => stage.dispose();
};

export default mount;
