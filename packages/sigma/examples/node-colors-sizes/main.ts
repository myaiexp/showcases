// Node colours and sizes read from graph attributes, switchable between three style recipes
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { COMMUNITIES, PALETTE, buildGraph } from './data.ts';
import './style.css';

const MODES = ['stored', 'categorical', 'fixed'] as const;
type Mode = (typeof MODES)[number];
const LABELS: Record<Mode, string> = {
  stored: 'color and size attributes',
  categorical: 'community → color, score → size',
  fixed: 'one fixed value',
};

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 14 : 30);
  const dict = Object.fromEntries(COMMUNITIES.map((name, i) => [name, PALETTE[i] ?? '#999']));

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    // The active recipe lives in graph state, so switching it restyles without rebuilding sigma.
    customGraphState: { mode: 'stored' as Mode },
    styles: {
      nodes: [
        // Rules run in order; later rules override the properties they set.
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        {
          when: (_attrs, _state, graphState) => graphState.mode === 'categorical',
          then: {
            color: { attribute: 'community', dict, defaultValue: '#999' },
            size: { attribute: 'score', min: 0.5, max: 5, minValue: 0, maxValue: 100, easing: 'quadraticOut' },
          },
        },
        {
          when: (_attrs, _state, graphState) => graphState.mode === 'fixed',
          then: { color: '#e22653', size: 1.5 },
        },
      ],
      edges: { color: '#ddd', size: 0.15 },
    },
  });

  let index = 0;
  const select = document.createElement('select');
  const setMode = (mode: Mode): void => {
    renderer.setGraphState({ mode });
    select.value = mode;
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => setMode(MODES[++index % MODES.length] ?? 'stored'), 1800);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    for (const mode of MODES) {
      const option = document.createElement('option');
      option.value = mode;
      option.textContent = LABELS[mode];
      select.append(option);
    }
    select.addEventListener('change', () => setMode(select.value as Mode));
    controls.append('Style from: ', select);
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
