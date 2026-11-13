// releaseMass and releaseStiffness: the same flick released with a light, default, heavy and stiff spring feel
import type { Mount } from '@/types.ts';
import { fakeDrag } from '../../shared/fakedrag.ts';
import { buildLanes } from '../../shared/drag-lanes.ts';
import './style.css';

const SPECS = [
  { label: 'releaseMass: 0.1', settings: { releaseMass: 0.1 } },
  { label: 'releaseMass: 10', settings: { releaseMass: 10 } },
  { label: 'releaseStiffness: 20', settings: { releaseStiffness: 20 } },
  { label: 'releaseStiffness: 300', settings: { releaseStiffness: 300 } },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);
  const lanes = buildLanes(stage, SPECS, preview);

  const cancels: Array<() => void> = [];
  // Flick each square to the right, then let go: mass and stiffness decide how it settles.
  const flick = (): void => {
    lanes.forEach(({ d }) => d.reset());
    lanes.forEach(({ item }) => cancels.push(fakeDrag(item, 60, 0, 200)));
  };

  let timer = 0;
  if (preview) {
    flick();
    timer = window.setInterval(flick, 3200);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const hint = document.createElement('span');
    hint.className = 'label';
    hint.textContent = 'Lower mass and higher stiffness move faster; high mass and low stiffness are slow and heavy.';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Flick every square';
    b.addEventListener('click', flick);
    panel.append(hint, b);
    el.append(panel);
    flick();
  }

  return () => {
    window.clearInterval(timer);
    cancels.forEach((c) => c());
    lanes.forEach(({ d }) => d.revert());
  };
};

export default mount;
