// Backdrops: a styled GPU shape behind the highlighted node and its label, with a switchable coverage area
import Graph from 'graphology';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import './style.css';

const NAMES = ['Ada', 'Grace', 'Alan', 'Edsger', 'Barbara', 'Donald'];
const AREAS = ['both', 'node', 'label'] as const;
type Area = (typeof AREAS)[number];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  NAMES.forEach((name, i) => {
    graph.addNode(name, {
      x: (i % 3) * 14,
      y: -Math.floor(i / 3) * 10,
      size: 1.4,
      color: ['#277da1', '#e22653', '#2a9d8f'][i % 3],
      label: name,
    });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: [
        { color: { attribute: 'color' }, size: { attribute: 'size' }, label: { attribute: 'label' }, labelVisibility: 'visible' },
        {
          // Backdrops are expensive, so only the highlighted (or hovered) node gets one.
          whenState: ['isHighlighted'],
          then: {
            backdropVisibility: 'visible',
            backdropColor: '#fff4cc',
            backdropPadding: 8,
            backdropCornerRadius: 10,
            backdropBorderColor: '#f4a261',
            backdropBorderWidth: 2,
            backdropShadowColor: 'rgba(0, 0, 0, 0.35)',
            backdropShadowBlur: 12,
            backdropArea: { attribute: 'area', defaultValue: 'both' },
          },
        },
      ],
    },
  });

  const highlight = (name: string | null): void => {
    for (const node of NAMES) renderer.setNodeState(node, { isHighlighted: node === name });
  };
  const setArea = (area: Area): void => {
    for (const node of NAMES) graph.setNodeAttribute(node, 'area', area);
  };
  setArea('both');

  let timer = 0;
  if (preview) {
    // Walk along the nodes, switching coverage area on each pass.
    let step = 0;
    const tick = (): void => {
      highlight(NAMES[step % NAMES.length] ?? null);
      if (step % NAMES.length === 0) setArea(AREAS[Math.floor(step / NAMES.length) % AREAS.length] ?? 'both');
      step++;
    };
    tick();
    timer = window.setInterval(tick, 900);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const buttons = AREAS.map((area) => {
      const button = document.createElement('button');
      button.textContent = `backdropArea: ${area}`;
      button.setAttribute('aria-pressed', String(area === 'both'));
      button.addEventListener('click', () => {
        setArea(area);
        buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(AREAS[i] === area)));
      });
      return button;
    });
    controls.append(...buttons);
    el.append(controls);
    // Hover highlights a node, as in the docs' hover use case.
    renderer.on('enterNode', ({ node }) => highlight(node));
    renderer.on('leaveNode', () => highlight(null));
    highlight('Grace');
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
