// Data input: jsonUrl fetches graph JSON itself; here the file is a Blob made in code
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters, randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const SETS = ['random tree', 'three clusters'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data is fetched from a blob: URL; watch the corner for the Loading message.' });

  // Turn a graph into a "file": JSON text in a Blob behind a blob: URL.
  const urls: string[] = [];
  const fileFor = (set: (typeof SETS)[number]): string => {
    const data = set === SETS[0] ? randomTree(stage.preview ? 40 : 80, 5) : clusters(3, stage.preview ? 10 : 16);
    const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
    urls.push(url);
    return url;
  };
  stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));

  const graph = stage.own(new ForceGraph3D(stage.container)).nodeLabel('name').jsonUrl(fileFor(SETS[0]));

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(4500, () => graph.jsonUrl(fileFor(SETS[++i % SETS.length]!)));
  } else {
    fitOnce(graph);
  }

  // A second jsonUrl set while one is still loading is ignored, so a quick switch can be missed.
  if (stage.bar) select(stage.bar, 'file', SETS, (v) => graph.jsonUrl(fileFor(v)));

  return stage.dispose;
};

export default mount;
