// A music equaliser whose wave is shaped by stagger's ease option: the same bars, a different rhythm
import { animate, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const EASES = {
  linear: 'linear',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  'cubic-bezier [.32, .23, .4, .9]': [0.32, 0.23, 0.4, 0.9],
  'custom p => Math.sin(p)': (p: number) => Math.sin(p),
} as const;
type EaseName = keyof typeof EASES;

const mount: Mount = (el, { preview }) => {
  const count = preview ? 22 : 36;
  el.innerHTML = `
    <div class="eq${preview ? '' : ' full'}">
      <div class="bars">${'<i></i>'.repeat(count)}</div>
      <code class="call"></code>
    </div>`;
  const call = el.querySelector<HTMLElement>('.call')!;
  let name: EaseName = 'easeInOut';
  let each = 0.1;
  let run: <R>(cb: () => R) => R = (cb) => cb();
  let controls: { cancel(): void } | undefined;
  let p: ReturnType<typeof panel> | undefined;

  const play = (): void => {
    controls?.cancel();
    call.textContent = `stagger(${each}, { ease: ${name.startsWith('cubic') ? '[.32, .23, .4, .9]' : name.startsWith('custom') ? 'p => Math.sin(p)' : `"${name}"`} })`;
    run(() => {
      // The offsets between bars are redistributed by the easing, then each bar loops on its own.
      controls = animate('.bars i', { scaleY: [0.15, 1] }, {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: stagger(each, { ease: EASES[name] as never }),
      });
    });
  };

  const scope = scopeMotion(el, (s) => {
    run = s.run;
    if (preview) {
      each = 0.07;
      play();
    } else {
      hint(el, 'Every bar loops with the same motion; only its start offset differs. Linear gives an even sweep, easeIn bunches the start, easeOut bunches the end.');
      p = panel(el);
      p.select('stagger ease', Object.keys(EASES) as EaseName[], name, (v) => { name = v; play(); });
      p.slider('stagger (s)', { min: 0.01, max: 0.2, step: 0.01, value: each }, (v) => { each = v; play(); });
      play();
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
