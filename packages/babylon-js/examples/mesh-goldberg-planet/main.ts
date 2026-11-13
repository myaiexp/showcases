// A Goldberg polyhedron as a little planet: pole regions coloured, trees placed on faces
import {
  ArcRotateCamera,
  Color3,
  Color4,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  type GoldbergMesh,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 5.5, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.4, 1, -0.3), scene);
  const treeMat = new StandardMaterial('tree', scene);
  treeMat.diffuseColor = new Color3(0.15, 0.45, 0.2);

  let planet: GoldbergMesh | undefined;
  let trees: Mesh[] = [];

  const build = (m: number, n: number): void => {
    // Disposing the planet disposes its child trees with it.
    planet?.dispose();
    planet = MeshBuilder.CreateGoldberg('planet', { m, n: Math.min(n, m), size: 1.6 }, scene);
    const data = planet.goldbergData;

    // [start face, end face, Color4]: faces 0–11 are the pentagonal poles, then each
    // pole's unshared hexagons in turn, then the shared hexagons at the end.
    const colors: [number, number, Color4][] = [[0, data.nbFaces - 1, new Color4(0.15, 0.35, 0.7, 1)]];
    for (let pole = 0; pole < 12; pole++) {
      const land = pole % 3 === 0 ? new Color4(0.85, 0.75, 0.45, 1) : new Color4(0.3, 0.65, 0.3, 1);
      for (let s = 0; s < data.nbFacesAtPole; s++) {
        if (pole % 4 === 3) continue; // some poles stay ocean
        const face = planet.relatedGoldbergFace(pole, s);
        colors.push([face, face, land]);
      }
      colors.push([pole, pole, new Color4(0.95, 0.95, 1, 1)]);
    }
    planet.setGoldbergFaceColors(colors);

    // A tree on each pole: placeOnGoldbergFaceAt uses the face's centre and axes.
    trees = Array.from({ length: 12 }, (_, pole) => {
      const tree = MeshBuilder.CreateCylinder(`tree${pole}`, { diameterTop: 0, diameterBottom: 0.12, height: 0.3, tessellation: 6 }, scene);
      tree.material = treeMat;
      planet!.placeOnGoldbergFaceAt(tree, pole, new Vector3(0, 0.15, 0));
      // The placement is in the planet's own frame, so parenting keeps the tree on its face.
      tree.parent = planet!;
      return tree;
    });
  };
  build(4, 1);

  if (!ctx.preview) {
    const panel = createPanel(el);
    const mn = { m: 4, n: 1 };
    const info = panel.readout();
    const update = (): void => {
      build(mn.m, mn.n);
      const d = planet!.goldbergData;
      info.textContent = `nbFaces ${d.nbFaces} · nbFacesAtPole ${d.nbFacesAtPole} · unshared ${d.nbUnsharedFaces} · shared ${d.nbSharedFaces}`;
    };
    panel.slider('m', 1, 10, 1, mn.m, (v) => ((mn.m = v), update()));
    panel.slider('n (≤ m)', 0, 10, 1, mn.n, (v) => ((mn.n = v), update()));
    update();
  }

  stage.run(() => {
    if (planet) planet.rotation.y += 0.004;
  });

  return () => stage.dispose();
};

export default mount;
