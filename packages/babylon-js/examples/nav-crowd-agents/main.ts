// Crowd agents sent to targets with the reach-target observer
import { Color3, MeshBuilder, PointerEventTypes, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import type { IAgentParametersV2 } from '@babylonjs/addons/navigation/types.js';
import type { RecastJSCrowd } from '@babylonjs/addons/navigation/plugin/RecastJSCrowd.js';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { arenaParameters, createArena, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 24 });
  const { scene, plugin } = nav;

  const meshes = createArena(scene, 22, [
    { x: -5, z: 2, w: 10, d: 1 },
    { x: 5, z: -3, w: 10, d: 1 },
    { x: 0, z: 8, w: 1, d: 6 },
  ]);
  await plugin.createNavMeshAsync(meshes, { ...arenaParameters, maxObstacles: 0 });
  const overlay = plugin.createDebugNavMesh(scene);
  overlay.material = overlayMaterial(scene, '#3a6bff', 0.25);
  overlay.position.y = 0.03;

  // The crowd: at most 10 agents, widest agent radius 0.5.
  const crowd = plugin.createCrowd(10, 0.5, scene) as RecastJSCrowd;
  // No crowd.dispose() here: plugin.dispose() disposes the crowd it created.

  const agentParams = {
    radius: 0.4,
    height: 1.6,
    maxAcceleration: 10,
    maxSpeed: 3.2,
    collisionQueryRange: 2,
    pathOptimizationRange: 0,
    separationWeight: 1,
    reachRadius: 0.9,
  } as unknown as IAgentParametersV2;

  const colors = ['#f7768e', '#e0af68', '#9ece6a', '#7dcfff', '#bb9af7', '#ff9e64'];
  const count = ctx.preview ? 5 : 7;
  const roots: TransformNode[] = [];
  const indices: number[] = [];
  for (let i = 0; i < count; i++) {
    // An agent is attached to a transform node: here a capsule with a nose that shows its heading.
    const root = new TransformNode(`agent-${i}`, scene);
    const body = MeshBuilder.CreateCapsule('body', { height: 1.6, radius: 0.4 }, scene);
    const mat = new StandardMaterial('agent-mat', scene);
    mat.diffuseColor = Color3.FromHexString(colors[i % colors.length]!);
    body.material = mat;
    body.parent = root;
    body.position.y = 0.8;
    const nose = MeshBuilder.CreateBox('nose', { width: 0.2, height: 0.2, depth: 0.5 }, scene);
    nose.parent = root;
    nose.position.set(0, 1.2, 0.4);
    roots.push(root);
    const start = plugin.getRandomPointAround(new Vector3(-8 + (i % 3) * 1.2, 0, -8 + Math.floor(i / 3) * 1.2), 1);
    indices.push(crowd.addAgent(start, agentParams, root));
  }

  const marker = MeshBuilder.CreateTorus('target', { diameter: 1, thickness: 0.12, tessellation: 24 }, scene);
  marker.setEnabled(false);
  let reached = 0;
  let readout: HTMLElement | undefined;

  const sendAllTo = (p: Vector3): void => {
    // agentGoto wants a point on the navmesh, so snap the click first.
    const target = plugin.getClosestPoint(p);
    marker.position.set(target.x, 0.05, target.z);
    marker.setEnabled(true);
    for (const a of indices) crowd.agentGoto(a, target);
  };
  // Fired when an agent gets within reachRadius of its destination: send it somewhere new.
  const observer = crowd.onReachTargetObservable.add(({ agentIndex }) => {
    reached++;
    if (ctx.preview || !userDriven) crowd.agentGoto(agentIndex, plugin.getRandomPointAround(new Vector3(0, 0, 0), 11));
    if (readout) readout.textContent = `agents that reached a target: ${reached}`;
  });
  nav.onDispose(() => crowd.onReachTargetObservable.remove(observer));

  let userDriven = false;
  for (const a of indices) crowd.agentGoto(a, plugin.getRandomPointAround(Vector3.Zero(), 11));

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout('Click the ground to send every agent there.');
    panel.button('Wander again', () => {
      userDriven = false;
      marker.setEnabled(false);
      for (const a of indices) crowd.agentGoto(a, plugin.getRandomPointAround(Vector3.Zero(), 11));
    });
    scene.onPointerObservable.add((info) => {
      if (info.type !== PointerEventTypes.POINTERTAP) return;
      const pick = scene.pick(scene.pointerX, scene.pointerY, (m) => m.name === 'ground');
      if (pick?.pickedPoint) {
        userDriven = true;
        sendAllTo(pick.pickedPoint);
      }
    });
  }

  // The recast crowd does not orient agents; turn each towards its velocity.
  nav.stage.run(() => {
    indices.forEach((a, i) => {
      const v = crowd.getAgentVelocity(a);
      const root = roots[i]!;
      if (v.length() > 0.3) {
        const want = Math.atan2(v.x, v.z);
        let diff = want - root.rotation.y;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        root.rotation.y += diff * 0.12;
      }
    });
    if (ctx.preview) nav.camera.alpha += 0.0015;
  });
  return () => nav.dispose();
};

export default mount;
