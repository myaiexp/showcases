// Dots race along tracks, one per ease variant of the chosen built-in family
import { animate } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

// Families from the docs' list of built-in eases; '' is the Power family that takes a power.
const FAMILIES = ['', 'Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Bounce', 'Back', 'Elastic'];
const VARIANTS = ['in', 'out', 'inOut', 'outIn'];
const PREVIEW_EASES = ['linear', 'outQuad', 'inOutExpo', 'outBack', 'outBounce', 'outElastic(1, .4)'];

const mount: Mount = (el, { preview }) => {
  const tracks = document.createElement('div');
  tracks.className = 'tracks';
  el.append(tracks);

  let anims: { revert(): unknown }[] = [];
  const build = (names: string[]): void => {
    anims.forEach((a) => a.revert());
    tracks.replaceChildren();
    anims = names.map((name) => {
      const row = document.createElement('div');
      row.className = 'track';
      const label = document.createElement('code');
      label.textContent = name;
      const lane = document.createElement('div');
      lane.className = 'lane';
      const dot = document.createElement('div');
      dot.className = 'dot';
      lane.append(dot);
      row.append(label, lane);
      tracks.append(row);
      return animate(dot, {
        left: ['0%', '100%'],
        duration: 1400,
        ease: name,
        alternate: true,
        loop: true,
        loopDelay: 300,
      });
    });
  };

  if (preview) {
    build(PREVIEW_EASES);
    return () => anims.forEach((a) => a.revert());
  }

  let family = '';
  let power = 1.675;
  const refresh = (): void =>
    build(VARIANTS.map((v) => (family ? v + family : `${v}(${power})`)));

  const ui = document.createElement('div');
  ui.className = 'controls';
  const sel = document.createElement('select');
  for (const f of FAMILIES) sel.append(new Option(f || 'Power (in, out, inOut)', f));
  sel.addEventListener('change', () => {
    family = sel.value;
    pw.disabled = family !== '';
    refresh();
  });
  const pw = document.createElement('input');
  pw.type = 'range';
  pw.min = '1';
  pw.max = '6';
  pw.step = '0.025';
  pw.value = String(power);
  const pwLabel = document.createElement('span');
  pwLabel.textContent = `power ${power}`;
  pw.addEventListener('input', () => {
    power = Number(pw.value);
    pwLabel.textContent = `power ${power}`;
    refresh();
  });
  ui.append(sel, pw, pwLabel);
  el.prepend(ui);
  refresh();

  return () => anims.forEach((a) => a.revert());
};

export default mount;
