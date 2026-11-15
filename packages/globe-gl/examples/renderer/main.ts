// renderer(): the WebGLRenderer, its tone mapping and its per-frame statistics
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { ACESFilmicToneMapping, AgXToneMapping, NoToneMapping, ReinhardToneMapping, type ToneMapping } from 'three';

const MAPPINGS: Record<string, ToneMapping> = {
  NoToneMapping,
  ACESFilmicToneMapping,
  ReinhardToneMapping,
  AgXToneMapping,
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'renderer.info counts what the last frame drew.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointColor(() => '#ff006e');
  globe.controls().autoRotate = true;

  const renderer = globe.renderer();
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.6;

  const info = readout(stage.preview ? stage.container : stage.box);
  if (stage.preview) info.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2;font-size:10px';
  stage.every(500, () => {
    const { calls, triangles } = renderer.info.render;
    info.textContent = `${calls} draw calls\n${triangles.toLocaleString()} triangles`;
  });

  if (stage.bar) {
    select(stage.bar, 'toneMapping', Object.keys(MAPPINGS), (k) => (renderer.toneMapping = MAPPINGS[k]!), 'ACESFilmicToneMapping');
    slider(stage.bar, 'toneMappingExposure', 0.2, 3, 0.1, 1.6, (v) => (renderer.toneMappingExposure = v));
  } else {
    stage.loop((_dt, t) => (renderer.toneMappingExposure = 1.4 + Math.sin(t * 1.5)));
  }

  return stage.dispose;
};

export default mount;
