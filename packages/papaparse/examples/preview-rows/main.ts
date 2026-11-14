// A temperature log read only as far as preview says
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { rng } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

/** `count` hourly temperatures as CSV text. */
const log = (count: number): string => {
  const r = rng(5);
  const rows = Array.from({ length: count }, (_, i) => `${String(8 + i).padStart(2, '0')}:00,${(17 + r() * 6).toFixed(1)}`);
  return ['time,temp', ...rows].join('\n');
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide preview along: the faded lines are never read. 0 means no limit.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { preview: 2 })', to: 'rows' });
  const out = output(stage, f.to);
  let n = 1;
  const input = csvInput(stage, f.from, log(stage.preview ? 3 : 12), () => render());

  const render = (): void => {
    // preview: stop after n rows (with header: true the header line is not counted). 0 = no limit.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true, preview: n });
    f.via.textContent = `Papa.parse(text, { preview: ${n} })`;
    // Line 0 is the header; data row k sits on line k.
    input.paint({ lineClass: (i) => (n > 0 && i > n ? 'pp-dim' : undefined) });
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false }));
    out.pill('rows read', result.data.length);
    out.pill('meta.truncated', result.meta.truncated, result.meta.truncated ? 'warn' : 'ok');
    stage.say(`${result.data.length} rows read, truncated: ${result.meta.truncated}`, result.meta.truncated ? 'warn' : 'ok');
  };

  stage.cycle(stage.preview ? [1, 2, 3] : [2], 2200, (v) => {
    n = v;
    render();
  });
  if (stage.bar) slider(stage.bar, 'preview', 0, 12, 1, n, (v) => {
    n = v;
    render();
  });
  return stage.dispose;
};

export default mount;
