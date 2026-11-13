// computePath with Chaikin smoothing and L-shaped paths
import { Color3, MeshBuilder, PointerEventTypes, Vector3 } from '@babylonjs/core';
import type { LinesMesh, Mesh } from '@babylonjs/core';
import { GetChaikinSmoothPath, GetLShapedPath } from '@babylonjs/addons/navigation/index.js';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { arenaParameters, createArena, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 22, beta: 0.85 });
  const { scene, plugin } = nav;

  // A staggered set of walls that forces a zig-zag path.
  const meshes = createArena(scene, 22, [
    { x: -4, z: -3, w: 1, d: 14 },
    { x: 2, z: 3, w: 1, d: 14 },
    { x: 7, z: -4, w: 1, d: 10 },
  ]);
  await plugin.createNavMeshAsync(meshes, { ...arenaParameters, maxObstacles: 0 });
  const overlay = plugin.createDebugNavMesh(scene);
  overlay.material = overlayMaterial(scene, '#3a6bff', 0.2);
  overlay.position.y = 0.02;

  let iterations = 3;
  let start = new Vector3(-8.5, 0, -8.5);
  let end = new Vector3(9, 0, 8.5);
  const lines: LinesMesh[] = [];
  const marks: Mesh[] = [];
  let smooth: Vector3[] = [];
  let distance = 0;
  let pathLength = 0;

  const draw = (points: Vector3[], lift: number, hex: string): void => {
    if (points.length < 2) return;
    const line = MeshBuilder.CreateLines('path', { points: points.map((p) => new Vector3(p.x, lift, p.z)) }, scene);
    line.color = Color3.FromHexString(hex);
    lines.push(line);
  };

  const recompute = (): void => {
    for (const l of lines.splice(0)) l.dispose();
    // The raw navmesh path: straight segments between corners.
    const raw = plugin.computePath(start, end);
    draw(raw, 0.1, '#c0caf5');
    // Chaikin corner cutting: each iteration doubles the points and rounds the corners.
    smooth = GetChaikinSmoothPath(raw, iterations).map((p) => new Vector3(p.x, p.y, p.z));
    draw(smooth, 0.3, '#9ece6a');
    pathLength = smooth.reduce((sum, p, i) => (i ? sum + Vector3.Distance(smooth[i - 1]!, p) : 0), 0);
    // L-shaped: every segment becomes a horizontal then vertical (here x then z) step.
    draw(GetLShapedPath(raw), 0.5, '#ff9e64');
    marks[0]!.position.set(start.x, 0.4, start.z);
    marks[1]!.position.set(end.x, 0.4, end.z);
    distance = 0;
  };

  for (const hex of ['#7dcfff', '#f7768e']) {
    const m = MeshBuilder.CreateSphere('end', { diameter: 0.8 }, scene);
    const mat = overlayMaterial(scene, hex, 1);
    m.material = mat;
    marks.push(m);
  }
  const runner = MeshBuilder.CreateSphere('runner', { diameter: 0.6 }, scene);
  runner.material = overlayMaterial(scene, '#9ece6a', 1);
  recompute();

  const pickNew = (): void => {
    // Opposite corners of the arena, nudged by random navmesh points.
    const flip = Math.random() < 0.5 ? 1 : -1;
    start = plugin.getRandomPointAround(new Vector3(-8 * flip, 0, -8), 2);
    end = plugin.getRandomPointAround(new Vector3(8 * flip, 0, 8), 2);
    recompute();
  };
  const timer = setInterval(pickNew, ctx.preview ? 4500 : 6000);
  nav.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Chaikin iterations', 0, 6, 1, iterations, (v) => {
      iterations = v;
      recompute();
    });
    panel.button('New random endpoints', () => {
      pickNew();
    });
    panel.row();
    panel.readout('White: computePath. Green: GetChaikinSmoothPath. Orange: GetLShapedPath. Click the ground to move the red end.');
    scene.onPointerObservable.add((info) => {
      if (info.type !== PointerEventTypes.POINTERTAP) return;
      const pick = scene.pick(scene.pointerX, scene.pointerY, (m) => m.name === 'ground');
      if (pick?.pickedPoint) {
        end = plugin.getClosestPoint(pick.pickedPoint);
        recompute();
      }
    });
  }

  // A dot runs along the smoothed path, then starts over.
  nav.stage.run(() => {
    distance += (nav.stage.engine.getDeltaTime() / 1000) * 4;
    if (distance > pathLength) distance = 0;
    let left = distance;
    for (let i = 1; i < smooth.length; i++) {
      const seg = Vector3.Distance(smooth[i - 1]!, smooth[i]!);
      if (left <= seg) {
        runner.position.copyFrom(Vector3.Lerp(smooth[i - 1]!, smooth[i]!, seg === 0 ? 0 : left / seg));
        runner.position.y = 0.45;
        break;
      }
      left -= seg;
    }
    if (ctx.preview) nav.camera.alpha += 0.0012;
  });
  return () => nav.dispose();
};

export default mount;
