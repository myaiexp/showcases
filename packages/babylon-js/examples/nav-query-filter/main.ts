// Per-query QueryFilter and area costs on a mud gap
import { Color3, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { LinesMesh } from '@babylonjs/core';
import type { QueryFilter } from '@recast-navigation/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { arenaParameters, createArena, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

const MUD_AREA = 1;
const WALK_FLAG = 1;
const MUD_FLAG = 2;
const OPTIONS = ['no filter', 'mud costs x1.5', 'mud costs x10', 'excludeFlags: mud'] as const;
type Option = (typeof OPTIONS)[number];

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 22, beta: 0.9 });
  const { scene, plugin, recast } = nav;
  nav.camera.alpha = Math.PI * 1.15;

  // A wall with a short gap through the middle (mud) and a longer detour gap at the top.
  const meshes = createArena(scene, 24, [
    { x: 0, z: -6.25, w: 1, d: 9.5 },
    { x: 0, z: 3.75, w: 1, d: 4.5 },
    { x: 0, z: 10, w: 1, d: 2 },
  ]);
  const mudPatch = MeshBuilder.CreateGround('mud', { width: 3, height: 3 }, scene);
  mudPatch.position.y = 0.01;
  const mudMat = new StandardMaterial('mud-mat', scene);
  mudMat.diffuseColor = new Color3(0.45, 0.3, 0.15);
  mudPatch.material = mudMat;

  // Called for every polygon of each tile: pick an area id and flag bits from where the polygon is.
  const process = new recast.TileCacheMeshProcess((params, areas, flags) => {
    const nvp = params.nvp();
    const [minX, , minZ] = params.boundsMin();
    const cs = params.cellSize();
    for (let i = 0; i < params.polyCount(); i++) {
      let sx = 0;
      let sz = 0;
      let n = 0;
      for (let j = 0; j < nvp; j++) {
        const v = params.polys(i * nvp * 2 + j);
        if (v === 0xffff) break;
        sx += params.verts(v * 3);
        sz += params.verts(v * 3 + 2);
        n++;
      }
      const x = minX + (sx / n) * cs;
      const z = minZ + (sz / n) * cs;
      const mud = Math.abs(x) < 1.5 && Math.abs(z) < 1.5;
      areas.set(i, mud ? MUD_AREA : 0);
      flags.set(i, mud ? WALK_FLAG | MUD_FLAG : WALK_FLAG);
    }
  });
  await plugin.createNavMeshAsync(meshes, { ...arenaParameters, tileSize: 32, maxObstacles: 8, tileCacheMeshProcess: process });
  const overlay = plugin.createDebugNavMesh(scene);
  overlay.material = overlayMaterial(scene, '#3a6bff', 0.18);
  overlay.position.y = 0.03;

  // Each option is a QueryFilter passed in computePath's options.
  const filterFor = (o: Option): QueryFilter | undefined => {
    if (o === 'no filter') return undefined;
    const f = new recast.QueryFilter();
    if (o === 'excludeFlags: mud') f.excludeFlags = MUD_FLAG;
    else f.setAreaCost(MUD_AREA, o === 'mud costs x10' ? 10 : 1.5);
    return f;
  };

  const start = new Vector3(-9, 0, 0);
  const end = new Vector3(9, 0, 0);
  let line: LinesMesh | undefined;
  let path: Vector3[] = [];
  let distance = 0;
  let readout: HTMLElement | undefined;
  const dot = MeshBuilder.CreateSphere('dot', { diameter: 0.8 }, scene);
  dot.material = overlayMaterial(scene, '#e0af68', 1);

  const choose = (o: Option): void => {
    line?.dispose();
    path = plugin.computePath(start, end, { filter: filterFor(o) }).map((p) => new Vector3(p.x, 0.2, p.z));
    line = MeshBuilder.CreateLines('route', { points: path }, scene);
    line.color = new Color3(1, 0.85, 0.3);
    distance = 0;
    const throughMud = path.some((p) => Math.abs(p.x) < 1 && Math.abs(p.z) < 1.5);
    if (readout) readout.textContent = `${o}: the path goes ${throughMud ? 'through the mud gap' : 'round by the detour gap'}`;
  };
  let i = 0;
  choose(OPTIONS[0]);
  const timer = setInterval(() => choose(OPTIONS[++i % OPTIONS.length]!), 3000);
  nav.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('QueryFilter', OPTIONS, OPTIONS[0], (v) => {
      clearInterval(timer);
      choose(v);
    });
    readout = panel.readout();
    choose(OPTIONS[0]);
  }

  nav.stage.run(() => {
    distance += (nav.stage.engine.getDeltaTime() / 1000) * 5;
    let left = distance;
    for (let k = 1; k < path.length; k++) {
      const seg = Vector3.Distance(path[k - 1]!, path[k]!);
      if (left <= seg) {
        dot.position.copyFrom(Vector3.Lerp(path[k - 1]!, path[k]!, seg === 0 ? 0 : left / seg));
        break;
      }
      left -= seg;
      if (k === path.length - 1) distance = 0;
    }
    if (ctx.preview) nav.camera.alpha += 0.0012;
  });
  return () => nav.dispose();
};

export default mount;
