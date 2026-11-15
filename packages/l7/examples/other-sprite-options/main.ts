// GeometryLayer sprite: count, radius, top, update and scale
import { GeometryLayer, type ILayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { snowflake } from '../../shared/exp-textures.ts';
import { cycle, orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.5], zoom: ctx.preview ? 9.5 : 10.5, pitch: 60 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const base = { opacity: 0.8, center: [13.4, 52.5] as [number, number], spriteCount: 120, spriteRadius: 0.2, spriteTop: 0.5, spriteUpdate: 0.004, spriteScale: 0.35, mapTexture: snowflake() };
  // Sprite positions are generated when the model builds, so each change is a new layer.
  const make = (style: Record<string, unknown>): ILayer => new GeometryLayer().shape('sprite').size(10).style({ ...base, ...style });
  let layer = make({});
  scene.addLayer(layer);

  const state: Record<string, number> = {};
  const set = (patch: Record<string, number>): void => {
    Object.assign(state, patch);
    scene.removeLayer(layer);
    layer = make(state);
    scene.addLayer(layer);
  };
  if (stage.bar) {
    slider(stage.bar, 'spriteCount', [20, 400, 10], 120, (spriteCount) => set({ spriteCount }));
    slider(stage.bar, 'spriteRadius', [0.05, 0.5, 0.01], 0.2, (spriteRadius) => set({ spriteRadius }));
    slider(stage.bar, 'spriteTop', [0.1, 1.5, 0.05], 0.5, (spriteTop) => set({ spriteTop }));
    slider(stage.bar, 'spriteUpdate', [0.001, 0.02, 0.001], 0.004, (spriteUpdate) => set({ spriteUpdate }));
    slider(stage.bar, 'spriteScale', [0.2, 2, 0.05], 0.35, (spriteScale) => set({ spriteScale }));
  } else {
    // Cards only restyle: spriteScale is read on every render, the other keys when the model builds.
    cycle(stage, scene, [0.6, 1.2, 0.3, 0.9] as const, 1500, (spriteScale) => {
      layer.style({ spriteScale });
    });
    orbit(stage, scene, { pitch: 60, turn: 15 });
  }

  return () => stage.dispose();
};

export default mount;
