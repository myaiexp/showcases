// Tippy tooltip with live placement, trigger and arrow controls
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import type { Placement } from 'tippy.js';
import type { Mount } from '@/types.ts';
import './style.css';

const PLACEMENTS: readonly Placement[] = ['top', 'bottom', 'left', 'right', 'auto'];
const TRIGGERS: readonly (readonly [string, string])[] = [
  ['hover / focus', 'mouseenter focus'],
  ['click', 'click'],
];

function field(label: string, control: HTMLElement): HTMLElement {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  wrap.append(label, control);
  return wrap;
}

const mount: Mount = (el, { preview }) => {
  const target = document.createElement('button');
  target.className = 'btn btn-primary';
  target.textContent = preview ? 'Tooltip' : 'Hover me';
  const center = document.createElement('div');
  center.className = 'center';
  center.append(target);

  const tip = tippy(target, {
    content: preview ? 'Smart placement' : 'I flip and shift to stay on screen',
    placement: 'top',
    trigger: preview ? 'manual' : 'mouseenter focus',
    arrow: true,
    animation: 'shift-away',
    theme: 'accent',
    // Inside the example root so its scoped theme styles apply and cleanup is local.
    appendTo: el,
  });

  if (!preview) {
    const placement = document.createElement('select');
    for (const p of PLACEMENTS) placement.append(new Option(p, p));
    const trigger = document.createElement('select');
    for (const [label, value] of TRIGGERS) trigger.append(new Option(label, value));
    const arrow = document.createElement('input');
    arrow.type = 'checkbox';
    arrow.checked = true;
    const toggle = document.createElement('label');
    toggle.className = 'toggle';
    toggle.append(arrow, ' show arrow');

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(field('placement', placement), field('trigger', trigger), toggle);
    el.append(controls, center);

    placement.addEventListener('change', () => {
      tip.setProps({ placement: placement.value as Placement });
      tip.show();
    });
    trigger.addEventListener('change', () => tip.setProps({ trigger: trigger.value }));
    arrow.addEventListener('change', () => tip.setProps({ arrow: arrow.checked }));
    return () => tip.destroy();
  }

  el.append(center);
  // A preview takes no input, so it opens the tip on a timer, turning through placements.
  const timers: number[] = [];
  let i = 0;
  const cycle = (): void => {
    tip.setProps({ placement: i++ % 2 === 0 ? 'top' : 'bottom' });
    tip.show();
    timers.push(window.setTimeout(() => tip.hide(), 1500));
  };
  timers.push(window.setTimeout(cycle, 300));
  const interval = window.setInterval(cycle, 2200);
  return () => {
    window.clearInterval(interval);
    for (const t of timers) window.clearTimeout(t);
    tip.destroy();
  };
};

export default mount;
