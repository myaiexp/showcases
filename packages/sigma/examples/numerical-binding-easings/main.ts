// Numerical bindings: node size follows the score attribute through a different easing on each row
import Sigma from 'sigma';
import type { NumericalAttributeBinding } from 'sigma/types';
import type { Mount } from '@/types.ts';
import { buildGraph, EASINGS, smoothStep } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph();

  // One matchData case per row. Each maps `score` (0 to 100) onto a size range, through its own easing.
  const cases: Record<string, { size: NumericalAttributeBinding }> = {};
  for (const easing of EASINGS) {
    cases[easing] = {
      size: {
        attribute: 'score',
        min: 0.4,
        max: 4,
        minValue: 0,
        maxValue: 100,
        easing: easing === 'custom' ? smoothStep : easing,
      },
    };
  }

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes', stagePadding: 40 },
    styles: {
      nodes: [
        {
          x: { attribute: 'x' },
          y: { attribute: 'y' },
          color: '#277da1',
          label: { attribute: 'label' },
          labelPosition: 'left',
          labelVisibility: 'visible',
          labelSize: preview ? 9 : 12,
        },
        { matchData: 'easing', cases },
      ],
    },
  });

  // Sweep a wave through the scores so each row shows how its curve reshapes the same input.
  let frame = 0;
  let running = true;
  let phase = 0;
  const tick = (): void => {
    if (running) {
      phase += 0.03;
      graph.forEachNode((node, attrs) => {
        const col = Number(attrs['col']);
        graph.setNodeAttribute(node, 'score', 50 + 50 * Math.sin(phase - col * 0.55));
      });
    }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  if (!preview) {
    const row = controlsRow(el);
    const toggle = button(row, 'Pause the wave', () => {
      running = !running;
      toggle.textContent = running ? 'Pause the wave' : 'Resume the wave';
      // Paused: show the plain 0 to 100 ramp so the curves read clearly.
      if (!running) graph.forEachNode((node, attrs) => graph.setNodeAttribute(node, 'score', Number(attrs['col']) * 10));
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
