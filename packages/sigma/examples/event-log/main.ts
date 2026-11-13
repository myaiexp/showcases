// Logs sigma's node and stage interaction events into a scrolling overlay panel
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const MAX_LINES = 60;
const nodeEvents = ['enterNode', 'leaveNode', 'downNode', 'upNode', 'clickNode', 'rightClickNode', 'doubleClickNode'] as const;
const stageEvents = ['enterStage', 'leaveStage', 'downStage', 'upStage', 'clickStage', 'rightClickStage', 'doubleClickStage'] as const;

const mount: Mount = (el, { preview }) => {
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const container = document.createElement('div');
  container.className = 'stage';
  const log = document.createElement('ol');
  log.className = 'log';
  wrap.append(container, log);
  el.append(wrap);

  const graph = buildGraph(preview ? 90 : 160, 5);
  const renderer = new Sigma(graph, container, { settings: { autoRescaleContent: 'nodes' } });

  // One formatter feeds both the real handlers and the scripted preview.
  const write = (type: string, detail: string): void => {
    const line = document.createElement('li');
    const name = document.createElement('b');
    name.textContent = type;
    line.append(name, ` ${detail}`);
    log.append(line);
    while (log.children.length > MAX_LINES) log.firstElementChild?.remove();
    log.scrollTop = log.scrollHeight;
  };
  const at = (e: { x: number; y: number }): string => `(${Math.round(e.x)}, ${Math.round(e.y)})`;

  if (!preview) {
    // Payloads carry `node` (for node events) and `event` with container coordinates.
    for (const type of nodeEvents) {
      renderer.on(type, ({ node, event }) => write(type, `${node} ${at(event)}`));
    }
    for (const type of stageEvents) {
      renderer.on(type, ({ event }) => write(type, at(event)));
    }
    write('ready', 'hover, click or drag the graph');
  }

  // No pointer in a card: walk the hover state over nodes and log what the real
  // handlers would print.
  let timer = 0;
  if (preview) {
    const nodes = graph.nodes();
    let step = 0;
    let hovered: string | null = null;
    timer = window.setInterval(() => {
      if (hovered) {
        renderer.setNodeState(hovered, { isHovered: false });
        write('leaveNode', hovered);
      }
      step++;
      if (step % 4 === 0) {
        hovered = null;
        write('clickStage', '(120, 64)');
        return;
      }
      hovered = nodes[(step * 17) % nodes.length] ?? null;
      if (!hovered) return;
      renderer.setNodeState(hovered, { isHovered: true });
      write('enterNode', hovered);
      if (step % 4 === 2) write('clickNode', hovered);
    }, 900);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
