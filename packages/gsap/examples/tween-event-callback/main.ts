// Attach, read and remove onUpdate and onRepeat on a running tween with eventCallback()
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { check, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const meter = h('div', 'meter', '', wrap);
  const fill = h('i', '', '', meter);
  const out = h('pre', 'readout', '', wrap);

  let repeats = 0;
  let timer = 0;
  const ctx = gsap.context(() => {
    const tween = gsap.to(box, {
      x: () => track.clientWidth - 36,
      duration: 1.1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    const onUpdate = (): void => {
      fill.style.width = `${tween.progress() * 100}%`;
    };
    const onRepeat = (label: string): void => {
      repeats++;
      box.style.background = repeats % 2 ? 'var(--green)' : 'var(--accent)';
      show(`${label} fired (${repeats})`);
    };
    const show = (last: string): void => {
      out.textContent =
        `eventCallback('onUpdate') -> ${tween.eventCallback('onUpdate') ? 'function' : 'null'}\n` +
        `eventCallback('onRepeat') -> ${tween.eventCallback('onRepeat') ? 'function' : 'null'}\n` +
        `last: ${last}`;
    };
    const setUpdate = (on: boolean): void => {
      tween.eventCallback('onUpdate', on ? onUpdate : null);
      if (!on) fill.style.width = '0';
      show(on ? 'onUpdate attached' : 'onUpdate removed');
    };
    const setRepeat = (on: boolean): void => {
      // the params array is passed to the callback, like onRepeatParams
      tween.eventCallback('onRepeat', on ? onRepeat : null, ['onRepeat']);
      show(on ? 'onRepeat attached' : 'onRepeat removed');
    };
    setUpdate(true);
    setRepeat(true);

    if (preview) {
      let n = 0;
      timer = window.setInterval(() => {
        n++;
        setUpdate(n % 4 < 2);
        setRepeat(n % 3 !== 0);
      }, 1600);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    check('onUpdate (fills the bar)', setUpdate, bar).checked = true;
    check('onRepeat (flips colour)', setRepeat, bar).checked = true;
    h('p', 'note', 'A tween holds one callback per event: setting a new one replaces the old, and null deletes it.', wrap);
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
