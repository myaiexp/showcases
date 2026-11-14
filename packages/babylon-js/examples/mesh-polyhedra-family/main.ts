// The fifteen numbered polyhedra, a geodesic and an icosphere, face colours
import {
  ArcRotateCamera,
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

const FACES = [4, 8, 12, 20, 26, 5, 7, 8, 5, 6, 6, 10, 12, 15, 22];

const faceColors = (n: number, hue: number): Color4[] =>
  Array.from({ length: n }, (_, i) => {
    const c = Color4.FromHexString('#ffffffff');
    const h = (hue + (i / n) * 120) % 360;
    // A cheap HSV → RGB, so neighbouring faces read as different shades.
    const f = (k: number): number => 0.55 + 0.45 * Math.cos(((h / 60 + k) * Math.PI) / 3);
    c.set(f(0), f(2), f(4), 1);
    return c;
  });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.05, 16, new Vector3(0, 0, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.6), scene);
  const mat = new StandardMaterial('mat', scene);

  // type 0..14 picks the polyhedron; faceColors gives one Color4 per face (flat is true by default).
  const shapes: Mesh[] = FACES.map((n, type) => {
    const p = MeshBuilder.CreatePolyhedron(`type${type}`, { type, size: 0.8, faceColors: faceColors(n, type * 24) }, scene);
    p.position.set((type % 5) * 2.4 - 4.8, 2.4 - Math.floor(type / 5) * 2.4, 0);
    p.material = mat;
    return p;
  });

  // A geodesic (m, n on an icosahedron) and an icosphere, on the bottom row.
  let geodesic = MeshBuilder.CreateGeodesic('geodesic', { m: 2, n: 1, size: 0.9, faceColors: faceColors(200, 200) }, scene);
  geodesic.position.set(-1.6, -4.8, 0);
  geodesic.material = mat;
  let ico = MeshBuilder.CreateIcoSphere('ico', { radius: 0.9, subdivisions: 2, flat: true }, scene);
  ico.position.set(1.6, -4.8, 0);
  ico.material = mat;
  camera.target.y = -1.2;

  if (!ctx.preview) {
    const panel = createPanel(el);
    const geo = { m: 2, n: 1 };
    const rebuildGeodesic = (): void => {
      geodesic.dispose();
      geo.n = Math.min(geo.n, geo.m);
      geodesic = MeshBuilder.CreateGeodesic('geodesic', { m: geo.m, n: geo.n, size: 0.9, faceColors: faceColors(2000, 200) }, scene);
      geodesic.position.set(-1.6, -4.8, 0);
      geodesic.material = mat;
    };
    panel.slider('geodesic m', 1, 8, 1, 2, (v) => ((geo.m = v), rebuildGeodesic()));
    panel.slider('geodesic n (≤ m)', 0, 8, 1, 1, (v) => ((geo.n = v), rebuildGeodesic()));
    panel.slider('icosphere subdivisions', 1, 8, 1, 2, (v) => {
      ico.dispose();
      ico = MeshBuilder.CreateIcoSphere('ico', { radius: 0.9, subdivisions: v, flat: true }, scene);
      ico.position.set(1.6, -4.8, 0);
      ico.material = mat;
    });
    panel.check('wireframe', false, (on) => (mat.wireframe = on));
  }

  stage.run(() => {
    for (const s of [...shapes, geodesic, ico]) {
      s.rotation.y += 0.008;
      s.rotation.x += 0.004;
    }
  });

  return () => stage.dispose();
};

export default mount;
