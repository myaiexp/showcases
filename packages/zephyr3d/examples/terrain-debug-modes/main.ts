// Terrain debug outputs: normals, tangents, UVs and albedo through material.debugMode
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type TerrainDebugMode } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, makeSplatMap, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

const MODES: TerrainDebugMode[] = ['none', 'vertex_normal', 'detail_normal', 'tangent', 'uv', 'bitangent', 'albedo'];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const world = buildTerrain(scene, { size: stage.preview ? 128 : 256, tile: stage.preview ? 32 : 64 });
  const material = world.terrain.material!;
  material.numDetailMaps = 2;
  material.setDetailMap(0, await loadTexture('/terrain/grass.png'));
  material.setDetailNormalMap(0, await loadTexture('/terrain/grass-n.png', true));
  material.setDetailMap(1, await loadTexture('/terrain/rock.png'));
  material.setDetailNormalMap(1, await loadTexture('/terrain/rock-n.png', true));
  material.setDetailMapUVScale(0, 24);
  material.setDetailMapUVScale(1, 12);
  material.setSplatMap(makeSplatMap());

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      flyAround(world, ms);
      // 'none' is skipped: the card cycles the outputs
      material.debugMode = MODES[1 + (Math.floor(ms / 2200) % (MODES.length - 1))]!;
      stage.caption(`material.debugMode = '${material.debugMode}'`);
    }
  });
  if (stage.bar) {
    select(stage.bar, 'material.debugMode', MODES, 'none', (v) => (material.debugMode = v));
    // The terrain's own wireframe is always available
    toggle(stage.bar, 'terrain.wireframe', false, (v) => (world.terrain.wireframe = v));
  }
  myApp.run();
});
