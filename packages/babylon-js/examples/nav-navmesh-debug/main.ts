// createNavMeshAsync plus debug navmesh and debugger layers
import { Color3, Mesh } from '@babylonjs/core';
import { DebugLayerOption, NavigationDebugger } from '@babylonjs/addons/navigation/index.js';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { arenaParameters, createArena, createNavStage, overlayMaterial } from '../../shared/navStage.ts';

const LAYERS = ['debug navmesh', 'NAVMESH', 'POLY_MESH', 'CONTOURS', 'COMPACT_HEIGHTFIELD_DISTANCE', 'NAVMESH_BV_TREE'] as const;
type Layer = (typeof LAYERS)[number];

const mount: Mount = async (el, ctx) => {
  const nav = await createNavStage(el, ctx, { radius: 24 });
  const { scene, plugin } = nav;

  const meshes = createArena(scene, 20, [
    { x: -4, z: 2, w: 8, d: 1 },
    { x: 4, z: -3, w: 8, d: 1 },
    { x: 0, z: 7, w: 1, d: 5 },
  ]);

  // Build the navmesh from the arena meshes. keepIntermediates retains the Recast build data for the debugger.
  await plugin.createNavMeshAsync(meshes, { ...arenaParameters, keepIntermediates: true, maxObstacles: 0 });

  const debug = new NavigationDebugger(scene, { primitiveTypes: ['tris', 'lines', 'quads'] });
  nav.onDispose(() => debug.dispose());
  let debugMesh: Mesh | undefined;
  nav.onDispose(() => debugMesh?.dispose());

  const show = (layer: Layer): void => {
    debug.clear();
    debugMesh?.dispose();
    debugMesh = undefined;
    if (layer === 'debug navmesh') {
      // The V1-compatible helper: one mesh of the final navmesh.
      debugMesh = plugin.createDebugNavMesh(scene);
      debugMesh.material = overlayMaterial(scene);
      debugMesh.position.y += 0.05;
    } else {
      // DebugLayerOption names which stage of the Recast pipeline to draw.
      debug.draw(plugin.navMesh!, plugin.intermediates ?? null, scene, DebugLayerOption[layer]);
    }
  };

  let i = 0;
  show(LAYERS[0]);
  const timer = setInterval(() => show(LAYERS[++i % LAYERS.length]!), 3200);
  nav.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('Layer', LAYERS, LAYERS[0], (v) => {
      clearInterval(timer);
      show(v);
    });
    panel.readout('Layers after the first need keepIntermediates: true. They cycle until you pick one.');
  }

  nav.scene.clearColor = new Color3(0.08, 0.09, 0.12).toColor4(1);
  nav.stage.run(() => {
    nav.camera.alpha += 0.002;
  });
  return () => nav.dispose();
};

export default mount;
