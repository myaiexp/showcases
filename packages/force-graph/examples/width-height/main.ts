// Container layout: width() and height() set the canvas size, independent of the page around it
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The white canvas is the graph; the paper around it is the pane. Its size is whatever width and height say.' });
  const { width: W, height: H } = stage;

  const graph = stage
    .own(new ForceGraph(stage.container))
    .graphData(clusters(3, stage.preview ? 8 : 14))
    .nodeAutoColorBy('group')
    .backgroundColor('#ffffff');

  const resize = (w: number, h: number, ms = 0): void => {
    graph.width(w).height(h);
    graph.zoomToFit(ms, 12);
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 12));
    const sizes: [number, number][] = [[1, 1], [0.6, 0.7], [0.4, 1], [1, 0.45]];
    let i = 0;
    stage.after(3000, () => {
      stage.every(1500, () => {
        const [fw, fh] = sizes[++i % sizes.length]!;
        resize(Math.round(W * fw), Math.round(H * fh), 300);
      });
    });
  } else if (stage.bar) {
    graph.cooldownTime(3000);
    slider(stage.bar, 'width', 120, W, 10, W, (v) => resize(v, graph.height()), (v) => `${v}px`);
    slider(stage.bar, 'height', 120, H, 10, H, (v) => resize(graph.width(), v), (v) => `${v}px`);
  }

  return stage.dispose;
};

export default mount;
