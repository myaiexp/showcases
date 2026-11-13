// Tween parameters: set delay, duration or ease globally or locally on x, and compare
import { animate } from 'animejs';
import type { AnimationParams, JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Param = 'delay' | 'duration' | 'ease';
type Scope = 'global' | 'local';

const VALUES: Record<Param, number | string> = { delay: 600, duration: 2400, ease: 'inOut(4)' };
const PARAMS: Param[] = ['delay', 'duration', 'ease'];
const SCOPES: Scope[] = ['global', 'local'];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const box = document.createElement('div');
  box.className = 'box';
  stage.append(box);
  const code = document.createElement('pre');
  code.className = 'code';
  const info = document.createElement('pre');
  info.className = 'info';
  el.append(stage, code);
  if (!preview) el.append(info);

  let param: Param = 'delay';
  let scope: Scope = 'local';
  let anim: JSAnimation | null = null;
  const build = (): void => {
    anim?.revert();
    const tween = { [param]: VALUES[param] };
    // Global parameters sit beside the properties, local ones inside one property's object.
    const base = { scale: 1.8, opacity: 0.4, duration: 1000, ease: 'linear', loop: true, alternate: true };
    const params: AnimationParams =
      scope === 'global' ? { x: '10rem', ...base, ...tween } : { x: { to: '10rem', ...tween }, ...base };
    anim = animate(box, {
      ...params,
      onUpdate: (self) => {
        info.textContent = `duration: ${self.duration} ms   currentTime: ${Math.round(self.currentTime)}   progress: ${self.progress.toFixed(2)}`;
      },
    });
    const v = typeof VALUES[param] === 'string' ? `'${VALUES[param]}'` : VALUES[param];
    code.textContent =
      scope === 'global'
        ? `animate(box, { x: '10rem', scale: 1.8, opacity: .4, ${param}: ${v} })`
        : `animate(box, { x: { to: '10rem', ${param}: ${v} }, scale: 1.8, opacity: .4 })`;
  };
  build();

  let timer = 0;
  const cleanups: (() => void)[] = [];
  if (preview) {
    let step = 0;
    timer = window.setInterval(() => {
      step++;
      param = PARAMS[step % 3] ?? 'delay';
      scope = SCOPES[Math.floor(step / 3) % 2] ?? 'local';
      build();
    }, 3500);
  } else {
    const group = (title: string, options: string[], pick: (o: string) => void): void => {
      const row = document.createElement('div');
      row.className = 'panel';
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = title;
      row.append(label);
      options.forEach((o) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = o;
        const click = (): void => pick(o);
        btn.addEventListener('click', click);
        cleanups.push(() => btn.removeEventListener('click', click));
        row.append(btn);
      });
      el.append(row);
    };
    group('Tween parameter', PARAMS, (o) => {
      param = o as Param;
      build();
    });
    group('Set it', ['global', 'local'], (o) => {
      scope = o as Scope;
      build();
    });
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Local means only x gets it; scale and opacity keep the global values.';
    el.append(note);
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    anim?.revert();
  };
};

export default mount;
