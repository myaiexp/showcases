// velocityMultiplier: the same flick thrown with the release velocity scaled by 0, 0.5, 1 and 5
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import { buildLanes } from '../../shared/drag-lanes.ts';
import './style.css';

const SPECS = [0, 0.5, 1, 5].map((velocityMultiplier) => ({
  label: `velocityMultiplier: ${velocityMultiplier}`,
  settings: { velocityMultiplier },
}));

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);
  const lanes = buildLanes(stage, SPECS, preview);

  const readout = document.createElement('div');
  readout.className = 'readout';
  const cancels: Array<() => void> = [];
  const show = (): void => {
    readout.textContent = `x after the throw: ${lanes.map(({ d }) => Math.round(d.x)).join(' | ')}`;
  };
  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  const flick = (): void => {
    lanes.forEach(({ d }) => d.reset());
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, 40, 0, 150)));
    later(show, 1800);
  };

  let timer = 0;
  if (preview) {
    flick();
    timer = window.setInterval(flick, 2800);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Flick every square (40px in 150ms)';
    b.addEventListener('click', flick);
    panel.append(b);
    el.append(panel, readout);
    flick();
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cancels.forEach((c) => c());
    lanes.forEach(({ d }) => d.revert());
  };
};

export default mount;
