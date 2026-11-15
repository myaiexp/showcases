// Node styling: nodeCanvasObject draws an image for each node with drawImage; the images are drawn in code once
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverTour } from '../../shared/tour.ts';
import { avatars } from './avatars.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each node is a small picture made with a canvas and painted with drawImage.' });
  const data = team();
  const pics = avatars(data.nodes.map((n) => ({ name: String(n.name), group: n.group ?? 1 })));
  let size = stage.preview ? 46 : 22;
  let hovered: Node | null = null;

  const graph = stage
    .own(new ForceGraph<Node>(stage.container))
    .graphData(data)
    .nodeLabel('name')
    .nodeCanvasObjectMode(() => 'replace')
    .nodeCanvasObject((node, c, scale) => {
      const img = pics.get(String(node.name));
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const s = node === hovered ? size * 1.3 : size;
      if (img?.complete && img.naturalWidth) c.drawImage(img, x - s / 2, y - s / 2, s, s);
      else {
        // The image has not decoded yet: a grey disc in its place.
        c.beginPath();
        c.arc(x, y, s / 2, 0, 2 * Math.PI);
        c.fillStyle = '#c9c9c9';
        c.fill();
      }
      c.beginPath();
      c.arc(x, y, s / 2, 0, 2 * Math.PI);
      c.lineWidth = 1.5 / scale;
      c.strokeStyle = node === hovered ? '#e4572e' : 'rgba(0,0,0,0.25)';
      c.stroke();
    })
    .nodePointerAreaPaint((node, paint, c) => {
      c.beginPath();
      c.arc(node.x ?? 0, node.y ?? 0, size / 2 + 1, 0, 2 * Math.PI);
      c.fillStyle = paint;
      c.fill();
    })
    .onNodeHover((n) => {
      hovered = n;
    })
    .autoPauseRedraw(false);
  // Pictures need more room than dots.
  graph.d3Force('charge')?.strength(stage.preview ? -250 : -120);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    const by = (name: string): Node | undefined => data.nodes.find((n) => n.id === name);
    hoverTour(stage, stage.ghost(graph), () => ['Ada', 'Hana', 'Kai', 'Cleo', 'Fay'].map(by), { every: 1600 });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    slider(stage.bar, 'image size', 10, 44, 2, size, (v) => {
      size = v;
    }, (v) => `${v}`);
  }

  return stage.dispose;
};

export default mount;
