// A score axis for "aple" with a threshold line: fruits past the line drop out
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { FRUITS } from '../../shared/data.ts';
import { scoreColor } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CARD_FRUITS = FRUITS.filter((f) => f !== 'mango' && f !== 'papaya' && f !== 'plum');
const THRESHOLDS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.5];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fruits whose dot sits right of the line do not make it into the results.' });
  const fruits = stage.preview ? CARD_FRUITS : FRUITS;
  const box = searchBox(stage.root, stage, { value: 'aple', tries: ['aple', 'banan', 'pech', 'chery', 'orrange'] });

  const chart = document.createElement('div');
  chart.className = 'cut';
  const axis = document.createElement('div');
  axis.className = 'cut-axis';
  const line = document.createElement('div');
  line.className = 'cut-line';
  const lineLabel = document.createElement('b');
  line.append(lineLabel);
  axis.append(line);
  const scale = document.createElement('div');
  scale.className = 'cut-scale';
  scale.append(document.createElement('span'));
  const ends = document.createElement('span');
  ends.innerHTML = '<span>0 perfect</span><span>1 nothing alike</span>';
  scale.append(ends);
  stage.root.append(chart, scale);

  const rows = new Map<string, { row: HTMLElement; dot: HTMLElement; num: HTMLElement }>();
  for (const name of fruits) {
    const row = document.createElement('div');
    row.className = 'cut-row';
    const label = document.createElement('span');
    label.className = 'cut-name';
    label.textContent = name;
    const track = document.createElement('div');
    track.className = 'cut-track';
    const dot = document.createElement('span');
    dot.className = 'cut-dot';
    const num = document.createElement('span');
    num.className = 'cut-num';
    track.append(dot, num);
    row.append(label, track);
    chart.append(row);
    rows.set(name, { row, dot, num });
  }
  chart.append(axis);

  let threshold = 0.5;
  const run = (): void => {
    const query = box.value.trim();
    if (!query) {
      stage.say('Type something to score the fruits');
      return;
    }
    // Threshold 1 lets every fruit through, so each one comes back with its score ...
    const all = new Fuse(fruits, { includeScore: true, threshold: 1 }).search(query);
    const scores = new Map(all.map((r) => [r.item, r.score ?? 1]));
    // ... and the real search, with the dial at its current position, decides who stays.
    const kept = new Set(new Fuse(fruits, { includeScore: true, threshold }).search(query).map((r) => r.item));

    // Rows sorted best first, so the dots climb across the scale like a staircase.
    const order = [...fruits].sort((a, b) => (scores.get(a) ?? 1) - (scores.get(b) ?? 1));
    for (const name of order) {
      const { row, dot, num } = rows.get(name)!;
      const s = scores.get(name) ?? 1;
      chart.insertBefore(row, axis);
      row.dataset['pass'] = kept.has(name) ? 'yes' : 'no';
      dot.style.left = `${s * 100}%`;
      dot.style.background = scoreColor(s);
      num.style.left = `${s * 100}%`;
      num.textContent = scores.has(name) ? s.toFixed(2) : '';
    }
    line.style.left = `${threshold * 100}%`;
    lineLabel.textContent = `threshold ${threshold.toFixed(2)}`;
    lineLabel.style.left = threshold > 0.65 ? '-92px' : '5px';
    stage.say(
      kept.size
        ? `${kept.size} of ${fruits.length} fruits score ${threshold.toFixed(2)} or better for "${query}"`
        : `Nothing scores ${threshold.toFixed(2)} or better for "${query}": raise the threshold`,
      kept.size ? 'ok' : 'warn',
    );
  };

  box.onInput(run);
  if (stage.preview) {
    stage.cycle(THRESHOLDS, 1500, (t) => {
      threshold = t;
      run();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'threshold', 0, 1, 0.01, threshold, (v) => ((threshold = v), run()), (v) => v.toFixed(2));
    run();
  }
  return stage.dispose;
};

export default mount;
