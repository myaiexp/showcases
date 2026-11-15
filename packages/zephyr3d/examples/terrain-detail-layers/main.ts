// Detail layers and a splat map: three albedo and normal maps blended by weights painted in code
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, makeSplatMap, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const world = buildTerrain(scene, { size: stage.preview ? 128 : 256, tile: stage.preview ? 32 : 64 });
  const material = world.terrain.material!;

  // Every layer is an albedo texture with an optional normal map (data: linear)
  material.numDetailMaps = 3;
  material.setDetailMap(0, await loadTexture('/terrain/grass.png'));
  material.setDetailNormalMap(0, await loadTexture('/terrain/grass-n.png', true));
  material.setDetailMapUVScale(0, 24);
  material.setDetailMapRoughness(0, 0.8);

  material.setDetailMap(1, await loadTexture('/terrain/rock.png'));
  material.setDetailNormalMap(1, await loadTexture('/terrain/rock-n.png', true));
  material.setDetailMapUVScale(1, 12);
  material.setDetailMapRoughness(1, 0.95);

  material.setDetailMap(2, await loadTexture('/terrain/sand.png'));
  material.setDetailMapUVScale(2, 30);
  material.setDetailMapRoughness(2, 0.9);

  // The splat map says how much of each layer covers each point: grass on gentle ground,
  // rock where it is steep or high, sand low down. Normally painted in the editor.
  material.setSplatMap(makeSplatMap());

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) flyAround(world, ms);
  });
  const out = stage.readout();
  if (stage.bar) {
    let layer = 0;
    const names = ['0 grass', '1 rock', '2 sand'] as const;
    const uv = slider(stage.bar, 'UV scale', [2, 80, 1], material.getDetailMapUVScale(0), (v) => material.setDetailMapUVScale(layer, v));
    const rough = slider(stage.bar, 'roughness', [0, 1, 0.05], material.getDetailMapRoughness(0), (v) => material.setDetailMapRoughness(layer, v));
    select(stage.bar, 'layer', names, names[0], (v) => {
      layer = Number(v[0]);
      uv.value = String(material.getDetailMapUVScale(layer));
      rough.value = String(material.getDetailMapRoughness(layer));
      uv.dispatchEvent(new Event('input'));
      rough.dispatchEvent(new Event('input'));
    });
    if (out) out.textContent = `numDetailMaps ${material.numDetailMaps} of at most ${world.terrain.MAX_DETAIL_MAP_COUNT}`;
  } else {
    stage.caption('numDetailMaps 3, setDetailMap, setSplatMap');
  }
  myApp.run();
});
