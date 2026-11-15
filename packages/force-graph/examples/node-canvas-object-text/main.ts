// Node styling: nodeCanvasObject in replace mode draws each node as its name in a rounded box
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PALETTE, team, type SampleNode as BaseNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverTour } from '../../shared/tour.ts';

type SampleNode = BaseNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom with the wheel: the text stays the same size on screen (font size / globalScale).' });
  const data = team();
  let fontPx = stage.preview ? 10 : 13;
  let hovered: SampleNode | null = null;

  /** Sets the font for this scale and returns the box a node's name needs, centred on (0, 0). */
  const measure = (node: SampleNode, c: CanvasRenderingContext2D, scale: number): { w: number; h: number; fs: number } => {
    const fs = fontPx / scale;
    c.font = `${fs}px sans-serif`;
    return { w: c.measureText(String(node.name)).width + fs * 0.9, h: fs * 1.5, fs };
  };

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(data)
    .nodeLabel((n) => `group ${n.group}`)
    .nodeCanvasObjectMode(() => 'replace')
    .nodeCanvasObject((node, c, scale) => {
      const { w, h, fs } = measure(node, c, scale);
      const colour = PALETTE[node.group ?? 1]!;
      c.beginPath();
      c.roundRect((node.x ?? 0) - w / 2, (node.y ?? 0) - h / 2, w, h, fs * 0.4);
      c.fillStyle = node === hovered ? colour : '#ffffff';
      c.fill();
      c.lineWidth = 1.5 / scale;
      c.strokeStyle = colour;
      c.stroke();
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = node === hovered ? '#ffffff' : '#1d1d1b';
      c.fillText(String(node.name), node.x ?? 0, (node.y ?? 0) + fs * 0.05);
    })
    // The hover area must cover the box too, painted in the colour the library hands over.
    .nodePointerAreaPaint((node, paint, c, scale) => {
      const { w, h } = measure(node, c, scale);
      c.fillStyle = paint;
      c.fillRect((node.x ?? 0) - w / 2, (node.y ?? 0) - h / 2, w, h);
    })
    .onNodeHover((n) => {
      hovered = n;
    })
    .autoPauseRedraw(false);
  // Boxes need more room than dots: push the nodes further apart.
  graph.d3Force('charge')?.strength(stage.preview ? -450 : -260);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    const by = (name: string): SampleNode | undefined => data.nodes.find((n) => n.id === name);
    hoverTour(stage, stage.ghost(graph), () => ['Ada', 'Hana', 'Kai', 'Cleo', 'Fay'].map(by), { every: 1500 });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    slider(stage.bar, 'font size', 8, 22, 1, fontPx, (v) => {
      fontPx = v;
    }, (v) => `${v}px`);
  }

  return stage.dispose;
};

export default mount;
