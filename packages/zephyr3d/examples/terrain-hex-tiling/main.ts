// Hex tiling: break the visible repetition of one detail texture across a large area
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const world = buildTerrain(scene, { size: stage.preview ? 128 : 256, tile: stage.preview ? 32 : 64, heightScale: 14 });
  const material = world.terrain.material!;

  // One layer with a tile that has an obvious blotch and stripe: repeated, they line up in rows
  material.numDetailMaps = 1;
  material.setDetailMap(0, await loadTexture('/terrain/marked.png'));
  material.setDetailMapUVScale(0, 48);
  material.setDetailMapRoughness(0, 0.9);

  // Each hexagon of a grid samples the layer turned and scaled at random, and they blend at the seams
  material.setDetailMapHexTiling(0, true);
  // rotation, scale, contrast, each 0 to 1
  material.setDetailMapHexParams(0, 1, 0.5, 0.5);

  let on = true;
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      flyAround(world, ms);
      const next = Math.floor(ms / 2500) % 2 === 0;
      if (next !== on) {
        on = next;
        material.setDetailMapHexTiling(0, on);
        stage.caption(`setDetailMapHexTiling(0, ${on})`);
      }
    }
  });
  if (stage.bar) {
    const params = [1, 0.5, 0.5];
    const apply = (): void => material.setDetailMapHexParams(0, params[0]!, params[1]!, params[2]!);
    toggle(stage.bar, 'hex tiling', true, (v) => material.setDetailMapHexTiling(0, v));
    slider(stage.bar, 'rotation', [0, 1, 0.05], 1, (v) => ((params[0] = v), apply()));
    slider(stage.bar, 'scale', [0, 1, 0.05], 0.5, (v) => ((params[1] = v), apply()));
    slider(stage.bar, 'contrast', [0, 1, 0.05], 0.5, (v) => ((params[2] = v), apply()));
    slider(stage.bar, 'UV scale', [8, 120, 2], 48, (v) => material.setDetailMapUVScale(0, v));
  }
  myApp.run();
});
