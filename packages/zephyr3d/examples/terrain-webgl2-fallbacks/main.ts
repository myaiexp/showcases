// What WebGL2 does with the WebGPU-only terrain features: no virtual texture, no blade grass
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Vector4 } from '@zephyr3d/base';
import { Application, Scene } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, lookFrom, paintDensity, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const world = buildTerrain(scene, { size: 128, tile: 32, heightScale: 18 });
  const { terrain } = world;
  const material = terrain.material!;
  material.numDetailMaps = 1;
  material.setDetailMap(0, await loadTexture('/terrain/grass.png'));
  material.setDetailMapUVScale(0, 20);
  lookFrom(world, 18, 22, 3.5, -10, -6);

  // WebGPU only: ignored elsewhere, and it reads back false
  terrain.runtimeVirtualTexture = true;

  // A card layer draws everywhere; a blade layer is not drawn off WebGPU (the console warns once)
  const card = terrain.grassRenderer.getLayer(terrain.grassRenderer.addLayer(0.9, 0.8, await loadTexture('/terrain/grass-card.png')));
  paintDensity(card);
  card.drawDistance = stage.preview ? 40 : 70;
  const blade = terrain.grassRenderer.getLayer(terrain.grassRenderer.addLayer(0.04, 0.6, null, 'blade'));
  blade.rootColor = new Vector4(0.12, 0.2, 0.05, 1);
  blade.tipColor = new Vector4(0.55, 0.65, 0.25, 1);
  paintDensity(blade);

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) flyAround(world, ms);
  });
  const out = stage.readout();
  const show = (): void => {
    if (out) {
      out.textContent = `device.type = ${myApp.device.type}\nterrain.runtimeVirtualTexture = ${terrain.runtimeVirtualTexture} (set to true)\nlayers: ${terrain.grassRenderer.numLayers}, kinds: card=${card.kind}, blade=${blade.kind}\nblades placed: card ${card.numBlades}, blade ${blade.numBlades}; only the card layer is drawn on WebGL2`;
    }
  };
  if (stage.bar) {
    toggle(stage.bar, 'runtimeVirtualTexture', true, (v) => {
      terrain.runtimeVirtualTexture = v;
      show();
    });
    show();
  } else {
    stage.caption('runtimeVirtualTexture reads back false; the blade layer is not drawn');
  }
  myApp.run();
});
