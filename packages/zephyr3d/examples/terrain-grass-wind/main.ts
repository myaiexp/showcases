// Scene wind on grass: direction, strength and gusts, plus each layer's sway
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
  lookFrom(world, 18, 22, 3, -10, -6);

  const layer = terrain.grassRenderer.getLayer(terrain.grassRenderer.addLayer(0.9, 0.8, await loadTexture('/terrain/grass-card.png')));
  paintDensity(layer);
  layer.drawDistance = stage.preview ? 40 : 70;

  // Both kinds of grass sway in the scene-wide wind
  const wind = scene.env.wind;
  wind.direction = 45; // degrees on the ground, 0 blows toward +X
  wind.strength = 1;
  wind.gustStrength = 0.5;
  wind.gustScale = 20;

  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      wind.strength = 1.2 + Math.sin(ms * 0.0006);
      wind.direction = (ms * 0.02) % 360;
    }
  });
  if (stage.bar) {
    slider(stage.bar, 'wind.direction (deg)', [0, 360, 5], 45, (v) => (wind.direction = v));
    slider(stage.bar, 'wind.strength', [0, 4, 0.1], 1, (v) => (wind.strength = v));
    slider(stage.bar, 'wind.gustStrength', [0, 2, 0.05], 0.5, (v) => (wind.gustStrength = v));
    slider(stage.bar, 'wind.gustScale', [2, 80, 1], 20, (v) => (wind.gustScale = v));
    slider(stage.bar, 'layer.windLean', [0, 2, 0.05], layer.windLean, (v) => (layer.windLean = v));
    slider(stage.bar, 'layer.swayAmplitude', [0, 2, 0.05], layer.swayAmplitude, (v) => (layer.swayAmplitude = v));
    slider(stage.bar, 'layer.swaySpeed', [0, 4, 0.1], layer.swaySpeed, (v) => (layer.swaySpeed = v));
  } else {
    stage.caption('scene.env.wind: direction turns, strength swells');
  }
  myApp.run();
});
