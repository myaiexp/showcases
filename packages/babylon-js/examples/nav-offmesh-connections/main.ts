// Off-mesh jump links joining two platforms
import { Color3, MeshBuilder, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { IAgentParametersV2, IOffMeshConnection } from '@babylonjs/addons/navigation/types.js';
import type { RecastJSCrowd } from '@babylonjs/addons/navigation/plugin/RecastJSCrowd.js';
import type { Mount } from '@/types.ts';
import { arenaParameters, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 24, beta: 1.0 });
  const { scene, plugin } = nav;

  const mat = (hex: string): StandardMaterial => {
    const m = new StandardMaterial(`m-${hex}`, scene);
    m.diffuseColor = Color3.FromHexString(hex);
    m.specularColor = Color3.Black();
    return m;
  };
  // Two platforms with a pit between them: the navmesh built from them has two disconnected islands.
  const platforms: Mesh[] = [];
  for (const x of [-8, 8]) {
    const slab = MeshBuilder.CreateBox('platform', { width: 10, depth: 14, height: 0.5 }, scene);
    slab.position.set(x, -0.25, 0);
    slab.material = mat('#5b6489');
    platforms.push(slab);
  }
  const pit = MeshBuilder.CreateGround('pit', { width: 8, height: 14 }, scene);
  pit.position.y = -3;
  pit.material = mat('#0d0f16');

  // Each connection: where it starts and ends, a radius, direction, area and flags.
  const connections: IOffMeshConnection[] = [
    { startPosition: new Vector3(-3.4, 0, -3), endPosition: new Vector3(3.4, 0, -3), radius: 0.8, bidirectional: true, area: 0, flags: 1, userId: 1 },
    { startPosition: new Vector3(-3.4, 0, 4), endPosition: new Vector3(3.4, 0, 4), radius: 0.8, bidirectional: false, area: 0, flags: 1, userId: 2 },
  ];
  await plugin.createNavMeshAsync(platforms, { ...arenaParameters, maxObstacles: 0, offMeshConnections: connections });
  const overlay = plugin.createDebugNavMesh(scene);
  overlay.material = overlayMaterial(scene, '#3a6bff', 0.25);
  overlay.position.y = 0.03;

  // Draw each link as an arc and mark its ends.
  connections.forEach((c, i) => {
    const s = Vector3.FromArray([c.startPosition.x, c.startPosition.y, c.startPosition.z]);
    const e = Vector3.FromArray([c.endPosition.x, c.endPosition.y, c.endPosition.z]);
    const pts = Array.from({ length: 21 }, (_, k) => {
      const t = k / 20;
      return Vector3.Lerp(s, e, t).add(new Vector3(0, Math.sin(Math.PI * t) * 1.6 + 0.1, 0));
    });
    const line = MeshBuilder.CreateLines('link', { points: pts }, scene);
    line.color = i === 0 ? new Color3(0.5, 1, 0.6) : new Color3(1, 0.7, 0.3);
    for (const p of [s, e]) {
      const ring = MeshBuilder.CreateTorus('link-end', { diameter: 1.6, thickness: 0.1, tessellation: 24 }, scene);
      ring.position.set(p.x, 0.1, p.z);
      ring.material = mat(i === 0 ? '#9ece6a' : '#ff9e64');
    }
  });

  const crowd = plugin.createCrowd(6, 0.5, scene) as RecastJSCrowd;
  // No crowd.dispose() here: plugin.dispose() disposes the crowd it created.
  const params = { radius: 0.4, height: 1.6, maxAcceleration: 10, maxSpeed: 3.5, collisionQueryRange: 2, pathOptimizationRange: 0, separationWeight: 1, reachRadius: 0.9 } as unknown as IAgentParametersV2;
  const bodies: Mesh[] = [];
  const agents: { index: number; side: -1 | 1 }[] = [];
  const count = ctx.preview ? 4 : 6;
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const root = new TransformNode('agent', scene);
    const body = MeshBuilder.CreateCapsule('body', { height: 1.6, radius: 0.4 }, scene);
    body.material = mat(['#f7768e', '#7dcfff', '#e0af68', '#bb9af7', '#9ece6a', '#ff9e64'][i]!);
    body.parent = root;
    body.position.y = 0.8;
    bodies.push(body);
    const start = plugin.getClosestPoint(new Vector3(side * 8, 0, -5 + i * 1.8));
    agents.push({ index: crowd.addAgent(start, params, root), side });
  }
  const goOpposite = (index: number): void => {
    const a = agents.find((x) => x.index === index)!;
    a.side = a.side === 1 ? -1 : 1;
    crowd.agentGoto(index, plugin.getClosestPoint(new Vector3(a.side * 8, 0, -4 + Math.random() * 8)));
  };
  for (const a of agents) crowd.agentGoto(a.index, plugin.getClosestPoint(new Vector3(-a.side * 8, 0, -4 + Math.random() * 8)));
  const observer = crowd.onReachTargetObservable.add(({ agentIndex }) => setTimeout(() => goOpposite(agentIndex), 400));
  nav.onDispose(() => crowd.onReachTargetObservable.remove(observer));

  nav.stage.run(() => {
    agents.forEach((a, i) => {
      const p = crowd.getAgentPosition(a.index);
      // The crowd only moves the transform along the ground; add a hop while the agent crosses the gap.
      const inGap = Math.abs(p.x) < 3.4;
      bodies[i]!.position.y = 0.8 + (inGap ? Math.cos((p.x / 3.4) * (Math.PI / 2)) * 1.6 : 0);
    });
    if (ctx.preview) nav.camera.alpha += 0.001;
  });
  return () => nav.dispose();
};

export default mount;
