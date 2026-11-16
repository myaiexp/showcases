// Image filters: a custom ColorMatrix edited cell by cell, with presets
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

// Rows are the output r, g, b (and alpha, left out of the grid); columns are the input r, g, b, a and an offset.
type Matrix = filters.ColorMatrix['matrix'];
const PRESETS: Record<string, number[]> = {
  identity: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  'swap red and blue': [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  negative: [-1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1],
  'red channel only': [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'cool shift': [0.8, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0.1, 0.1, 1.3, 0, 0.05],
  'green to red': [1, 1, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 1, 0, 0],
};
const NAMES = Object.keys(PRESETS);
const OUT = ['R', 'G', 'B'];
const IN = ['R', 'G', 'B', 'A', '+'];

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'portrait');
  const say = status(stage);

  // A ColorMatrix is 20 numbers (4 rows of 5). The last row, the alpha output, stays [0, 0, 0, 1, 0].
  const cm = new filters.ColorMatrix({ matrix: [...PRESETS.identity!, 0, 0, 0, 1, 0] as Matrix });
  const load = (cells: number[]): void => {
    cm.matrix = [...cells, 0, 0, 0, 1, 0] as Matrix;
    show([cm]);
  };
  load(PRESETS['swap red and blue']!);
  say('ColorMatrix: swap red and blue');

  if (stage.bar) {
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(5,auto);gap:2px 14px;justify-content:center';
    stage.box.insertBefore(grid, stage.bar);
    const cells = [...cm.matrix].slice(0, 15);
    let loading = false;
    const inputs = cells.map((v, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      return slider(grid, `${IN[col]}→${OUT[row]}`, col === 4 ? -1 : -2, col === 4 ? 1 : 2, 0.05, v, (n) => {
        cells[i] = n;
        if (!loading) load(cells);
      }, (n) => n.toFixed(2));
    });
    select(stage.bar, 'preset', NAMES, (name) => {
      loading = true;
      PRESETS[name]!.forEach((v, i) => {
        cells[i] = v;
        inputs[i]!.value = String(v);
        inputs[i]!.dispatchEvent(new Event('input'));
      });
      loading = false;
      load(cells);
      say(`ColorMatrix: ${name}`);
    }, 'swap red and blue');
    checkbox(stage.bar, 'colorsOnly', true, (v) => {
      cm.colorsOnly = v;
      load(cells);
    });
  } else {
    cycle(stage, NAMES, (name) => {
      load(PRESETS[name]!);
      say(name);
    }, 1200);
  }
  return stage.dispose;
};

export default mount;
