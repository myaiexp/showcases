// Card grass: a textured layer on the terrain's grassRenderer, placed from a density map
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { buildTerrain, loadTexture, lookFrom, paintDensity, terrainFiles } from '../../shared/env-terrain.ts';
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

  // Each terrain owns a grassRenderer; a layer is a card texture with a blade width and height
  const grassTexture = await loadTexture('/terrain/grass-card.png');
  const cards = terrain.grassRenderer.addLayer(0.9, 0.8, grassTexture);
  const layer = terrain.grassRenderer.getLayer(cards);
  // The density map is one byte per texel over the whole terrain; paint it, then regenerate once
  paintDensity(layer);
  layer.drawDistance = stage.preview ? 40 : 70;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      const a = ms * 0.0003;
      lookFrom(world, Math.cos(a) * 24, Math.sin(a) * 24, 3.5, 0, 0);
    }
  });
  const out = stage.readout();
  if (stage.bar) {
    slider(stage.bar, 'blade width', [0.2, 2, 0.05], 0.9, (v) => layer.setBladeSize(v, layer.bladeHeight));
    slider(stage.bar, 'blade height', [0.2, 2, 0.05], 0.8, (v) => layer.setBladeSize(layer.bladeWidth, v));
    slider(stage.bar, 'drawDistance', [10, 200, 5], layer.drawDistance, (v) => (layer.drawDistance = v));
    slider(stage.bar, 'farDensity', [0, 1, 0.05], layer.farDensity, (v) => (layer.farDensity = v));
    stage.every(500, () => {
      if (out) out.textContent = `layer ${cards}: ${layer.numBlades} blades, density map ${layer.densityMapWidth} x ${layer.densityMapHeight}, ${layer.cellsPerTexel}^2 cells per texel`;
    });
  } else {
    stage.caption('grassRenderer.addLayer(width, height, texture) + a density map');
  }
  myApp.run();
});
