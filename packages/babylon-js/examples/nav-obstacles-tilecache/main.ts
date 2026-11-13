// Tile cache obstacles closing and reopening wall gaps
import { Color3, MeshBuilder, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import type { LinesMesh, Mesh } from '@babylonjs/core';
import { WaitForFullTileCacheUpdate } from '@babylonjs/addons/navigation/index.js';
import type { IAgentParametersV2 } from '@babylonjs/addons/navigation/types.js';
import type { IObstacle } from '@babylonjs/core';
import type { RecastJSCrowd } from '@babylonjs/addons/navigation/plugin/RecastJSCrowd.js';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { arenaParameters, createArena, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

interface Placed {
  obstacle: IObstacle;
  mesh: Mesh;
}

const GAPS = [new Vector3(0, 0, 0), new Vector3(0, 0, 8)];

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 26 });
  const { scene, plugin } = nav;
  nav.camera.alpha = Math.PI * 1.15;

  // A wall across the middle with two 3 m gaps.
  const meshes = createArena(scene, 24, [
    { x: 0, z: -6.75, w: 1, d: 10.5 },
    { x: 0, z: 4, w: 1, d: 5 },
    { x: 0, z: 10.75, w: 1, d: 2.5 },
  ]);
  // tileSize turns on the tiled build; maxObstacles reserves room in the tile cache for obstacles.
  await plugin.createNavMeshAsync(meshes, { ...arenaParameters, tileSize: 32, maxObstacles: 32, expectedLayersPerTile: 4 });
  const { navMesh, tileCache } = plugin;

  let overlay: Mesh | undefined;
  const overlayMat = overlayMaterial(scene, '#3a6bff', 0.3);
  const redraw = (): void => {
    overlay?.dispose();
    overlay = plugin.createDebugNavMesh(scene);
    overlay.material = overlayMat;
    overlay.position.y = 0.03;
  };
  redraw();
  nav.onDispose(() => overlay?.dispose());

  const crowd = plugin.createCrowd(4, 0.5, scene) as RecastJSCrowd;
  // No crowd.dispose() here: plugin.dispose() disposes the crowd it created.
  const params = { radius: 0.4, height: 1.6, maxAcceleration: 10, maxSpeed: 3.5, collisionQueryRange: 2, pathOptimizationRange: 0, separationWeight: 1, reachRadius: 0.9 } as unknown as IAgentParametersV2;
  const agents: number[] = [];
  const left = new Vector3(-9, 0, 0);
  const right = new Vector3(9, 0, 0);
  for (let i = 0; i < 3; i++) {
    const root = new TransformNode('agent', scene);
    const body = MeshBuilder.CreateCapsule('body', { height: 1.6, radius: 0.4 }, scene);
    const mat = new StandardMaterial('agent-mat', scene);
    mat.diffuseColor = Color3.FromHexString(['#9ece6a', '#e0af68', '#7dcfff'][i]!);
    body.material = mat;
    body.parent = root;
    body.position.y = 0.8;
    agents.push(crowd.addAgent(plugin.getClosestPoint(new Vector3(-9, 0, -2 + i * 2)), params, root));
  }
  let toRight = true;
  const send = (): void => {
    const target = plugin.getClosestPoint(toRight ? right : left);
    for (const a of agents) crowd.agentGoto(a, target);
  };
  send();
  const reach = crowd.onReachTargetObservable.add(() => {
    // The first agent to arrive turns the whole group round.
    toRight = !toRight;
    send();
  });
  nav.onDispose(() => crowd.onReachTargetObservable.remove(reach));

  // A computed path (the crowd must exist for it to honour obstacles).
  const pathLine: LinesMesh = MeshBuilder.CreateLines('path', { points: [left, right], updatable: true }, scene);
  pathLine.color = new Color3(1, 0.9, 0.3);
  const showPath = (): void => {
    const pts = plugin.computePath(left, right).map((p) => new Vector3(p.x, 0.15, p.z));
    pathLine.setEnabled(pts.length > 1);
    if (pts.length > 1) MeshBuilder.CreateLines('path', { points: pts, instance: pathLine });
  };

  const placed: Placed[] = [];
  const apply = (): void => {
    // Several edits were made with doNotWaitForCacheUpdate; now wait once for the tile cache.
    WaitForFullTileCacheUpdate(navMesh!, tileCache!);
    redraw();
    showPath();
    send();
  };
  const closeGap = (i: number): void => {
    const gap = GAPS[i]!;
    const obstacle = plugin.addCylinderObstacle(gap, 1.9, 2, true);
    if (!obstacle) return;
    const mesh = MeshBuilder.CreateCylinder('obstacle', { diameter: 3.8, height: 2, tessellation: 24 }, scene);
    mesh.position.set(gap.x, 1, gap.z);
    const mat = new StandardMaterial('obstacle-mat', scene);
    mat.diffuseColor = new Color3(0.95, 0.4, 0.45);
    mat.alpha = 0.7;
    mesh.material = mat;
    placed.push({ obstacle, mesh });
  };
  const openOldest = (): void => {
    const o = placed.shift();
    if (!o) return;
    plugin.removeObstacle(o.obstacle, true);
    o.mesh.dispose();
  };

  // Script: close A, close B (no route), open A, open B ...
  const steps = [() => closeGap(0), () => closeGap(1), openOldest, openOldest];
  let step = 0;
  const run = (): void => {
    steps[step++ % steps.length]!();
    apply();
  };
  showPath();
  const timer = setInterval(run, ctx.preview ? 2600 : 3200);
  nav.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Close gap A', () => {
      closeGap(0);
      apply();
    });
    panel.button('Close gap B', () => {
      closeGap(1);
      apply();
    });
    panel.button('Reopen oldest', () => {
      openOldest();
      apply();
    });
    panel.button('Add a box obstacle', () => {
      const pos = new Vector3(-6 + Math.random() * 12, 0, -9 + Math.random() * 18);
      const obstacle = plugin.addBoxObstacle(pos, new Vector3(1, 1, 1), Math.random() * Math.PI, true);
      if (!obstacle) return;
      const mesh = MeshBuilder.CreateBox('obstacle', { width: 2, height: 2, depth: 2 }, scene);
      mesh.position.set(pos.x, 1, pos.z);
      mesh.rotation.y = 0;
      placed.push({ obstacle, mesh });
      apply();
    });
    panel.readout('The yellow line is computePath from left to right; the blue overlay is the navmesh rebuilt in its tiles.');
  }

  nav.stage.run(() => {
    if (ctx.preview) nav.camera.alpha += 0.001;
  });
  return () => nav.dispose();
};

export default mount;
