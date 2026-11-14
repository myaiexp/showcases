// Levels of detail: a torus knot that swaps to coarser meshes as it moves away
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const DISTANCES = [15, 30, 45, 55];
const COVERAGE = [0.12, 0.05, 0.02, 0.008];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 12, Vector3.Zero(), scene);
  camera.upperRadiusLimit = 80;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Four versions of the same knot, from 128 radial segments down to 16, each its own colour.
  const segments = [128, 32, 24, 16];
  const colors = [new Color3(0.4, 0.9, 0.5), new Color3(0.95, 0.85, 0.3), new Color3(1, 0.55, 0.25), new Color3(0.9, 0.3, 0.3)];
  const knots: Mesh[] = segments.map((radialSegments, i) => {
    const knot = MeshBuilder.CreateTorusKnot(`knot${i}`, { radius: 0.5, tube: 0.2, radialSegments, tubularSegments: radialSegments / 2, p: 2, q: 3 }, scene);
    const mat = new StandardMaterial(`knot${i}`, scene);
    mat.diffuseColor = colors[i]!;
    mat.wireframe = true;
    knot.material = mat;
    return knot;
  });
  const [knot00, knot01, knot02, knot03] = knots as [Mesh, Mesh, Mesh, Mesh];

  // Beyond each distance, the given level renders instead; null stops rendering entirely.
  const useDistances = (): void => {
    for (const lvl of [knot01, knot02, knot03, null]) knot00.removeLODLevel(lvl);
    knot00.useLODScreenCoverage = false;
    knot00.addLODLevel(DISTANCES[0]!, knot01);
    knot00.addLODLevel(DISTANCES[1]!, knot02);
    knot00.addLODLevel(DISTANCES[2]!, knot03);
    knot00.addLODLevel(DISTANCES[3]!, null);
  };
  // Screen coverage instead: values 0..1, and a bigger value means a more detailed level.
  const useCoverage = (): void => {
    for (const lvl of [knot01, knot02, knot03, null]) knot00.removeLODLevel(lvl);
    knot00.useLODScreenCoverage = true;
    knot00.addLODLevel(COVERAGE[0]!, knot01);
    knot00.addLODLevel(COVERAGE[1]!, knot02);
    knot00.addLODLevel(COVERAGE[2]!, knot03);
    knot00.addLODLevel(COVERAGE[3]!, null);
  };
  useDistances();

  let auto = true;
  let readout: HTMLElement | undefined;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('cutoffs', ['distance', 'screen coverage'] as const, 'distance', (v) => (v === 'distance' ? useDistances() : useCoverage()));
    panel.check('dolly the camera', auto, (on) => (auto = on));
    readout = panel.readout();
  }

  let t = 0;
  stage.run(() => {
    t += scene.getEngine().getDeltaTime() / 1000;
    if (auto) camera.radius = 33 - Math.cos(t * 0.5) * 27;
    knot00.rotation.y += 0.005;
    if (readout) {
      const shown = knot00.getLOD(camera);
      readout.textContent = `radius ${camera.radius.toFixed(1)} · rendering ${shown ? shown.name : 'nothing (null level)'}`;
    }
  });

  return () => stage.dispose();
};

export default mount;
