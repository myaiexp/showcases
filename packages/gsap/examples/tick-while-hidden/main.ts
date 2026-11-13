// A spinner and tick counters: with the helper on, GSAP keeps ticking while this tab is in the background
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { check, h } from '../../shared/ui.ts';
import { tickGSAPWhileHidden } from './tickGSAPWhileHidden.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const spinner = h('div', 'spinner', '', root);
  const out = h('div', 'out', '', root);
  const note = h('p', 'note', '', root);
  if (preview) note.remove();

  let enabled = false;
  let ticks = 0;
  let hiddenTicks = 0;
  let hiddenSince = 0;
  let hiddenSeconds = 0;
  const showStats = (): void => {
    out.textContent = `tab: ${document.hidden ? 'HIDDEN' : 'visible'}   helper: ${enabled ? 'on' : 'off'}\nticker ticks: ${ticks}${preview ? '' : `\nticks while hidden: ${hiddenTicks}\nGSAP time while hidden: ${hiddenSeconds.toFixed(1)}s`}`;
  };
  // A plain ticker listener, so the count follows exactly what gsap.ticker does.
  const onTick = (time: number): void => {
    ticks++;
    if (document.hidden) {
      hiddenTicks++;
      if (!hiddenSince) hiddenSince = time;
      hiddenSeconds = time - hiddenSince;
    } else hiddenSince = 0;
    if (ticks % 6 === 0 || document.hidden) showStats();
  };
  gsap.ticker.add(onTick);

  const ctx = gsap.context(() => {
    gsap.to(spinner, { rotation: 360, duration: 2, ease: 'none', repeat: -1 });
  }, el);

  const setEnabled = (on: boolean): void => {
    enabled = on;
    tickGSAPWhileHidden(on);
    showStats();
  };
  // The helper changes global ticker settings, so only the full view turns it on.
  if (!preview) {
    const box = check('tickGSAPWhileHidden(true)', setEnabled, h('div', 'controls', '', root));
    box.checked = true;
    setEnabled(true);
    note.textContent = 'Tick the box, switch to another tab for a few seconds and come back: the ticker kept running at about 2 ticks a second. Untick it and the hidden counters stay frozen.';
  }
  showStats();

  return () => {
    gsap.ticker.remove(onTick);
    tickGSAPWhileHidden(false);
    gsap.ticker.lagSmoothing(500, 33); // the documented default, in case the tab was hidden at unmount
    ctx.revert();
  };
};

export default mount;
