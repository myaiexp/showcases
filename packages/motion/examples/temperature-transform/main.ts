// A thermostat that maps one temperature to a colour and a word with transform([...], [...]), clamped or not
import { animate, scopeMotion, transform } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const INPUT = [10, 16, 22, 28, 34];
const COLOURS = ['#3b82f6', '#22d3ee', '#7cf08a', '#f5d142', '#ef4444'];
const LABELS = ['Freezing', 'Cool', 'Comfy', 'Warm', 'Hot'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="thermo${preview ? '' : ' full'}">
      <div class="dial"><div class="degrees"></div></div>
      <div class="word"></div>
      <div class="scale"><i></i></div>
      <code class="out"></code>
    </div>`;
  const dial = el.querySelector<HTMLElement>('.dial')!;
  const degrees = el.querySelector<HTMLElement>('.degrees')!;
  const word = el.querySelector<HTMLElement>('.word')!;
  const marker = el.querySelector<HTMLElement>('.scale i')!;
  const out = el.querySelector<HTMLElement>('.out')!;
  let clampOn = true;
  let temp = 21;
  let p: ReturnType<typeof panel> | undefined;

  // The output range can be colours; with { clamp: false } it carries on past the ends.
  const toColour = (c: boolean) => transform(INPUT, COLOURS, { clamp: c });
  const toAngle = (c: boolean) => transform([10, 34], [-120, 120], { clamp: c });
  const toWord = transform(INPUT, [0, 1, 2, 3, 4], { clamp: true });

  const draw = (t: number): void => {
    const colour = String(toColour(clampOn)(t));
    const angle = toAngle(clampOn)(t);
    dial.style.borderColor = colour;
    dial.style.boxShadow = `0 0 24px ${colour}`;
    dial.style.setProperty('--angle', `${angle}deg`);
    degrees.textContent = `${t.toFixed(1)}°`;
    word.textContent = LABELS[Math.round(toWord(t))]!;
    word.style.color = colour;
    marker.style.left = `${((t - 10) / 24) * 100}%`;
    marker.style.background = colour;
    out.textContent = `transform(INPUT, COLOURS${clampOn ? '' : ', { clamp: false }'})(${t.toFixed(1)}) = ${colour}`;
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      animate(8, 36, { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', onUpdate: draw });
    } else {
      draw(temp);
      hint(el, 'Slide the temperature to see colour, word and needle follow. Slide below 10 or above 34 with clamp on and everything stops at the ends; with it off the needle and colours keep extrapolating.');
      p = panel(el);
      p.slider('temperature', { min: 0, max: 44, step: 0.5, value: temp }, (v) => { temp = v; draw(v); });
      p.toggle('clamp', true, (v) => { clampOn = v; draw(temp); });
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
