// Input JSON syntax: graphData takes { nodes: [{ id, name, val }], links: [{ source, target }] }; edit the JSON and see it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { fitNow, fitOnce, spin } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

interface Node {
  id: string;
  name?: string;
  val?: number;
}
interface Link {
  source: string;
  target: string;
}
const sample = (val: number): string =>
  JSON.stringify(
    {
      nodes: [
        { id: 'id1', name: 'name1', val: 1 },
        { id: 'id2', name: 'name2', val: val },
        { id: 'id3', name: 'name3', val: 3 },
        { id: 'id4', name: 'name4', val: 5 },
        { id: 'id5', name: 'name5', val: 2 },
      ],
      links: [
        { source: 'id1', target: 'id2' },
        { source: 'id2', target: 'id3' },
        { source: 'id2', target: 'id4' },
        { source: 'id4', target: 'id5' },
      ],
    },
    null,
    2,
  );

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The README\'s format: every node needs an id (name and val are the defaults of nodeLabel and nodeVal), every link a source and target id.' });

  const load = (text: string): { nodes: Node[]; links: Link[] } => JSON.parse(text);
  let text = sample(10);
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Node, Link>)
    .graphData(load(text))
    .nodeAutoColorBy('id')
    .cooldownTime(stage.preview ? 1500 : 3000);

  if (stage.preview) {
    const note = overlay(stage);
    note.style.fontSize = '9px';
    const show = (val: number): void => {
      note.textContent = `{ "id": "id2", "name": "name2", "val": ${val} }\n{ "source": "id1", "target": "id2" }`;
    };
    show(10);
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(20));
    let big = true;
    stage.every(3200, () => {
      big = !big;
      text = sample(big ? 10 : 2);
      show(big ? 10 : 2);
      graph.graphData(load(text)); // new data: the layout starts over
    });
  } else {
    fitOnce(graph);
    const area = document.createElement('textarea');
    area.value = text;
    area.spellcheck = false;
    area.rows = 12;
    area.style.cssText = 'width:min(560px,100%);font:12px/1.4 ui-monospace,monospace;background:var(--bg-2,#161b2b);color:var(--fg-1,#c0caf5);border:1px solid var(--fg-3,#444);border-radius:6px;padding:8px';
    const status = document.createElement('div');
    status.style.cssText = 'font:12px ui-monospace,monospace;color:var(--fg-2)';
    status.textContent = '5 nodes, 4 links';
    stage.box.append(area, status);
    let timer = 0;
    area.addEventListener('input', () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        try {
          const data = load(area.value);
          graph.graphData(data);
          status.textContent = `${data.nodes.length} nodes, ${data.links.length} links`;
          status.style.color = 'var(--fg-2)';
          stage.after(1500, () => fitNow(graph, 40));
        } catch (err) {
          status.textContent = String(err instanceof Error ? err.message : err);
          status.style.color = '#f7768e';
        }
      }, 400);
    });
    stage.onDispose(() => clearTimeout(timer));
  }

  return stage.dispose;
};

export default mount;
