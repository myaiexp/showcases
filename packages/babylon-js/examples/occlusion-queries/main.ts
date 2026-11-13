// Occlusion queries: spheres behind a sliding wall are skipped while it hides them
import '@babylonjs/core/Engines/Extensions/engine.query';
import '@babylonjs/core/Rendering/boundingBoxRenderer';
import {
  AbstractMesh,
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = { OPTIMISTIC: AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC, STRICT: AbstractMesh.OCCLUSION_TYPE_STRICT, NONE: AbstractMesh.OCCLUSION_TYPE_NONE };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.35, 14, new Vector3(0, 1.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.2, 1, -0.4), scene);

  // The occluder: an opaque wall in rendering group 0, sliding left and right.
  const wall = MeshBuilder.CreateBox('wall', { width: 5, height: 4, depth: 0.3 }, scene);
  wall.position.set(0, 2, -1);
  const wallMat = new StandardMaterial('wall', scene);
  wallMat.diffuseColor = new Color3(0.35, 0.37, 0.45);
  wall.material = wallMat;

  // The queried meshes must render after their occluders: rendering group 1.
  const spheres = [-4.5, -1.5, 1.5, 4.5].map((x, i) => {
    const s = MeshBuilder.CreateSphere(`sphere${i}`, { diameter: 1.8, segments: 32 }, scene);
    s.position.set(x, 1.6, 2.5);
    const mat = new StandardMaterial(`sphere${i}`, scene);
    mat.diffuseColor = Color3.FromHSV(20 + i * 70, 0.7, 1);
    s.material = mat;
    s.renderingGroupId = 1;
    s.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;
    s.occlusionRetryCount = 10;
    return s;
  });

  // A status chip per sphere, from mesh.isOccluded.
  el.style.position = 'relative';
  const chips = document.createElement('div');
  Object.assign(chips.style, { position: 'absolute', top: '6px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '6px', font: '11px monospace', pointerEvents: 'none' });
  const chip = spheres.map((_, i) => {
    const c = document.createElement('span');
    Object.assign(c.style, { padding: '2px 6px', borderRadius: '4px', color: '#000' });
    c.textContent = `sphere${i}`;
    chips.append(c);
    return c;
  });
  el.append(chips);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('occlusionType', Object.keys(TYPES) as (keyof typeof TYPES)[], 'OPTIMISTIC', (v) => spheres.forEach((s) => (s.occlusionType = TYPES[v])));
    panel.select('occlusionQueryAlgorithmType', ['ACCURATE', 'CONSERVATIVE'] as const, 'CONSERVATIVE', (v) =>
      spheres.forEach((s) => (s.occlusionQueryAlgorithmType = v === 'ACCURATE' ? AbstractMesh.OCCLUSION_ALGORITHM_TYPE_ACCURATE : AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE)),
    );
    panel.slider('occlusionRetryCount', -1, 30, 1, 10, (v) => spheres.forEach((s) => (s.occlusionRetryCount = v)));
    panel.check('showBoundingBox', false, (on) => spheres.forEach((s) => (s.showBoundingBox = on)));
  }

  let t = 0;
  stage.run(() => {
    t += scene.getEngine().getDeltaTime() / 1000;
    wall.position.x = Math.sin(t * 0.7) * 4.5;
    spheres.forEach((s, i) => {
      chip[i]!.textContent = `sphere${i} ${s.isOccluded ? 'occluded' : 'drawn'}`;
      chip[i]!.style.background = s.isOccluded ? '#888' : '#7ee787';
    });
  });

  return () => {
    chips.remove();
    stage.dispose();
  };
};

export default mount;
