// Render control: renderer() is the three WebGLRenderer, so toneMapping and exposure can be set on it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NeutralToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
  type ToneMapping,
} from 'three';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const MAPPINGS: Record<string, ToneMapping> = {
  NoToneMapping,
  LinearToneMapping,
  ReinhardToneMapping,
  CineonToneMapping,
  ACESFilmicToneMapping,
  AgXToneMapping,
  NeutralToneMapping,
};
const NAMES = Object.keys(MAPPINGS);
const BRIGHT = ['#ff5a36', '#3dd9ff', '#ffe44d'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'renderer().toneMapping squeezes bright, over-lit colours into range; toneMappingExposure scales the light first.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeColor((n) => BRIGHT[(n.group ?? 1) - 1]!)
    .nodeOpacity(1)
    .nodeResolution(20)
    .cooldownTime(stage.preview ? 2500 : 4000);

  const renderer = graph.renderer();
  const note = overlay(stage);
  const setMapping = (name: string): void => {
    renderer.toneMapping = MAPPINGS[name]!;
    note.textContent = `toneMapping = ${name}\ntoneMappingExposure = ${renderer.toneMappingExposure.toFixed(1)}`;
  };
  stage.onDispose(() => {
    renderer.toneMapping = NoToneMapping;
    renderer.toneMappingExposure = 1;
  });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(10));
    renderer.toneMappingExposure = 1.8;
    let i = 0;
    setMapping(NAMES[0]!);
    stage.every(1600, () => setMapping(NAMES[++i % NAMES.length]!));
  } else {
    fitOnce(graph);
    if (stage.bar) {
      select(stage.bar, 'toneMapping', NAMES, setMapping, 'NoToneMapping');
      slider(stage.bar, 'exposure', 0.2, 4, 0.1, 1, (v) => (renderer.toneMappingExposure = v), (v) => v.toFixed(1));
    }
  }

  return stage.dispose;
};

export default mount;
