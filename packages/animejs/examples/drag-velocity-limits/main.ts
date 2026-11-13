// minVelocity and maxVelocity: slow and fast flicks thrown with different release velocity limits
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import { buildLanes } from '../../shared/drag-lanes.ts';
import './style.css';

const SPECS = [
  { label: 'defaults (min 0, max 50)', settings: {} },
  { label: 'minVelocity: 10', settings: { minVelocity: 10 } },
  { label: 'maxVelocity: 0', settings: { maxVelocity: 0 } },
  { label: 'maxVelocity: 100', settings: { maxVelocity: 100 } },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);
  const lanes = buildLanes(stage, SPECS, preview);

  const readout = document.createElement('div');
  readout.className = 'readout';
  const cancels: Array<() => void> = [];
  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  // A slow drag releases with little velocity, a fast flick with a lot.
  const flick = (kind: 'slow' | 'fast'): void => {
    lanes.forEach(({ d }) => d.reset());
    const ms = kind === 'slow' ? 900 : 90;
    const dx = kind === 'slow' ? 30 : 60;
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, dx, 0, ms)));
    readout.textContent = `${kind} flick: ${dx}px in ${ms}ms`;
  };

  let timer = 0;
  let n = 0;
  if (preview) {
    const cycle = (): void => flick(n++ % 2 ? 'fast' : 'slow');
    cycle();
    timer = window.setInterval(cycle, 2600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    (['slow', 'fast'] as const).forEach((kind) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = `Release after a ${kind} drag`;
      b.addEventListener('click', () => flick(kind));
      panel.append(b);
    });
    el.append(panel, readout);
    later(() => flick('fast'), 300);
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cancels.forEach((c) => c());
    lanes.forEach(({ d }) => d.revert());
  };
};

export default mount;
