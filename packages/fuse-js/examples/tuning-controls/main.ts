// Fuse search with sliders that rebuild the index options; card sweeps threshold
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PACKAGES, type Pkg } from './data.ts';
import { renderAll, renderResults } from './render.ts';
import './style.css';

const INITIAL = { threshold: 0.4, distance: 100, minMatchCharLength: 1 };

interface Slider {
  key: keyof typeof INITIAL;
  min: number;
  max: number;
  step: number;
  value: number;
  desc: string;
  fmt: (v: number) => string;
}

const SLIDERS: readonly Slider[] = [
  { key: 'threshold', min: 0, max: 1, step: 0.05, value: 0.4, fmt: (v) => v.toFixed(2),
    desc: '0 = perfect match only, 1 = match everything' },
  { key: 'distance', min: 0, max: 1000, step: 10, value: 100, fmt: (v) => String(v),
    desc: 'How far from the expected location a match can be' },
  { key: 'minMatchCharLength', min: 1, max: 8, step: 1, value: 1, fmt: (v) => String(v),
    desc: 'Minimum characters that must match' },
];

const makeFuse = (threshold: number, distance: number, minMatchCharLength: number): Fuse<Pkg> =>
  new Fuse<Pkg>(PACKAGES, {
    keys: ['name', 'description'],
    includeScore: true,
    includeMatches: true,
    threshold,
    distance,
    minMatchCharLength,
  });

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.placeholder = 'Type here to test tuned search...';
  const list = document.createElement('ul');
  list.className = 'results-list';

  const values = { ...INITIAL };

  const search = (): void => {
    const query = input.value.trim();
    if (!query) {
      renderAll(PACKAGES, list);
      return;
    }
    const fuse = makeFuse(values.threshold, values.distance, values.minMatchCharLength);
    renderResults(fuse.search(query), list, preview ? 2 : 10);
  };

  if (preview) {
    input.readOnly = true;
    input.value = 'frmework';
    const label = document.createElement('div');
    label.className = 'sweep';
    el.append(label, input, list);
    const thresholds = [0.1, 0.3, 0.5, 0.7];
    let i = 0;
    const step = (): void => {
      values.threshold = thresholds[i++ % thresholds.length] ?? 0.4;
      label.textContent = `threshold ${values.threshold.toFixed(2)}`;
      search();
    };
    step();
    const timer = window.setInterval(step, 2200);
    return () => clearInterval(timer);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const cleanups: (() => void)[] = [];
  for (const s of SLIDERS) {
    const row = document.createElement('div');
    row.className = 'control-row';
    const label = document.createElement('label');
    const name = document.createElement('span');
    name.textContent = s.key;
    const val = document.createElement('span');
    val.className = 'val';
    val.textContent = s.fmt(s.value);
    label.append(name, val);
    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(s.min);
    range.max = String(s.max);
    range.step = String(s.step);
    range.value = String(s.value);
    const desc = document.createElement('span');
    desc.className = 'control-desc';
    desc.textContent = s.desc;
    const onInput = (): void => {
      const v = Number(range.value);
      values[s.key] = v;
      val.textContent = s.fmt(v);
      search();
    };
    range.addEventListener('input', onInput);
    cleanups.push(() => range.removeEventListener('input', onInput));
    row.append(label, range, desc);
    controls.append(row);
  }
  const field = document.createElement('div');
  field.className = 'field';
  field.append(input, list);
  el.append(controls, field);
  renderAll(PACKAGES, list);
  input.addEventListener('input', search);

  return () => {
    input.removeEventListener('input', search);
    cleanups.forEach((c) => c());
  };
};

export default mount;
