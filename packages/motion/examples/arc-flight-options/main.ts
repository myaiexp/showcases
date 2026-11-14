// A paper plane thrown back and forth: arc() options (strength, peak, direction, rotate) driven by a spring
import { animate, arc, cancelFrame, delay, frame, scopeMotion } from 'motion';
import type { ArcOptions } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// Each preset is one flight in the card; the full view edits a single options object.
const PRESETS: ArcOptions[] = [
  { strength: 0.5, rotate: true },
  { strength: 1.1, peak: 0.25, rotate: 0.5 },
  { strength: 0.6, direction: 'ccw', rotate: true },
];

const describe = (o: ArcOptions): string =>
  `strength ${o.strength ?? 0.5} · peak ${o.peak ?? 0.5} · ${o.direction ?? 'auto'} · rotate ${o.rotate ?? false}`;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="flight${preview ? '' : ' full'}">
      <div class="field"><span class="pad a"></span><span class="pad b"></span><div class="plane"></div></div>
      <code class="label"></code>
    </div>`;
  const field = el.querySelector<HTMLElement>('.field')!;
  const plane = el.querySelector<HTMLElement>('.plane')!;
  const label = el.querySelector<HTMLElement>('.label')!;
  let opts: ArcOptions = { ...PRESETS[0] };
  let spring = true;
  let atEnd = false;
  let throwNo = 0;
  let p: ReturnType<typeof panel> | undefined;
  const dots: HTMLElement[] = [];
  let sampler: (() => void) | undefined;

  // One arc() instance serves every flight until an option changes, so a flight started
  // mid-air continues from the old curve (the docs' "Memoisation").
  let path = arc(opts);
  const setOptions = (next: ArcOptions): void => {
    opts = next;
    path = arc(opts);
    label.textContent = describe(opts);
  };

  const scope = scopeMotion(el, (s) => {
    const fly = s.bind((): void => {
      const w = field.clientWidth - 56;
      const to = atEnd ? { x: 0, y: 0 } : { x: w, y: -field.clientHeight * 0.1 };
      atEnd = !atEnd;
      for (const d of dots.splice(0)) d.remove();
      if (sampler) cancelFrame(sampler);
      // Leave a dot on every frame so the curve itself stays visible after the plane lands.
      const f = field.getBoundingClientRect();
      const sample = (): void => {
        const r = plane.getBoundingClientRect();
        const d = document.createElement('i');
        d.style.left = `${r.left - f.left + r.width / 2}px`;
        d.style.top = `${r.top - f.top + r.height / 2}px`;
        field.prepend(d);
        dots.push(d);
      };
      sampler = sample;
      frame.read(sample, true);
      const transition = spring ? { type: 'spring' as const, bounce: 0.35, visualDuration: 1 } : { duration: 1, ease: 'easeInOut' as const };
      animate(plane, { x: to.x, y: to.y }, { ...transition, path }).then(() => cancelFrame(sample));
    });

    if (preview) {
      const tick = (): void => {
        setOptions({ ...PRESETS[throwNo++ % PRESETS.length] });
        fly();
        delay(tick, 2);
      };
      delay(tick, 0.4);
    } else {
      setOptions(opts);
      hint(el, 'Throw the plane and change the options. Strength sets how far the curve bulges, peak where it tops out, direction which side, rotate how much the plane tilts along the path.');
      p = panel(el);
      p.button('Throw', fly);
      p.slider('strength', { min: 0, max: 2, step: 0.1, value: 0.5 }, (v) => setOptions({ ...opts, strength: v }));
      p.slider('peak', { min: 0.1, max: 0.9, step: 0.05, value: 0.5 }, (v) => setOptions({ ...opts, peak: v }));
      p.select('direction', ['auto', 'cw', 'ccw'] as const, 'auto', (v) => setOptions({ ...opts, direction: v === 'auto' ? undefined : v }));
      p.select('rotate', ['off', '0.5', 'true'] as const, 'off', (v) => setOptions({ ...opts, rotate: v === 'off' ? false : v === 'true' ? true : 0.5 }));
      p.select('driven by', ['spring', 'tween'] as const, 'spring', (v) => { spring = v === 'spring'; });
    }
  });

  return () => {
    scope.cancel();
    if (sampler) cancelFrame(sampler);
    p?.dispose();
  };
};

export default mount;
