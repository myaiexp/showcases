// Switches the gestureTarget setting live to show who receives wheel and touch gestures
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const TARGETS = ['graph', 'shared', 'page'] as const;
type Target = (typeof TARGETS)[number];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const renderer = new Sigma(buildGraph(preview ? 70 : 140, 5), container, {
    settings: {
      autoRescaleContent: 'nodes',
      gestureTarget: 'shared',
      // Hint texts shown on a plain wheel while the target is "shared".
      sharedGestureWheelMessage: 'Ctrl + scroll zooms the graph, plain scroll moves the page',
      sharedGestureAppleWheelMessage: '⌘ + scroll zooms the graph, plain scroll moves the page',
    },
  });

  const apply = (target: Target): void => {
    renderer.setSetting('gestureTarget', target);
  };

  let timer = 0;
  if (preview) {
    // Cycle the setting and zoom a little so the three modes read as different.
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      apply(TARGETS[i % TARGETS.length] ?? 'graph');
      void renderer.getCamera().animate({ ratio: i % 2 ? 0.6 : 1 }, { duration: 800 });
    }, 1800);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const select = document.createElement('select');
    for (const target of TARGETS) {
      const option = document.createElement('option');
      option.value = option.textContent = target;
      select.append(option);
    }
    select.value = 'shared';
    select.addEventListener('change', () => apply(select.value as Target));
    const label = document.createElement('label');
    label.append('gestureTarget: ', select);
    const note = document.createElement('span');
    note.textContent = 'Scroll over the graph with each mode, with and without Ctrl.';
    controls.append(label, note);
    el.append(controls);

    const page = document.createElement('div');
    page.className = 'hint-page';
    page.textContent = 'This block is only here so the page has room to scroll.';
    el.append(page);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
