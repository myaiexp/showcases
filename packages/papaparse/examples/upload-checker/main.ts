// An uploaded file is checked and every problem listed by line, with a pass or fail badge
import Papa, { type ParseError } from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { filePicker, select } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, lineOfRecord, marks, recordOf } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';

interface Scene {
  name: string;
  text: string;
}
const CLEAN: Scene = { name: 'prices.csv', text: 'id,item,price\n1,Tea,4.50\n2,Mug,8.00\n3,Pot,24.90' };
const MESSY: Scene = { name: 'prices.csv', text: 'id,item,price\n1,Tea,4.50\n2,Mug\n3,Pot,24.90,old\n4,Jug,9.00' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open your own CSV (it stays in your browser), drop one on the text, or edit it.' });
  const f = flow(stage, { from: 'File: prices.csv', via: stage.preview ? 'Papa.parse(text, { header: true })' : 'Papa.parse(text, { header: true, skipEmptyLines: true })', to: 'Report', split: 0.4 });
  const out = output(stage, f.to);

  const render = (): void => {
    // Papa does not stop at the first problem: it reads the whole file and lists them all.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true });
    const m = marks(input.text, result, true, true);
    input.paint({ lineClass: m.lineClass });
    const pass = result.errors.length === 0;
    const badge = document.createElement('div');
    const mark = document.createElement('span');
    mark.className = `pp-badge ${pass ? 'pp-ok' : 'pp-bad'}`;
    mark.textContent = pass ? 'PASS' : 'FAIL';
    badge.append(mark, pass ? ` ${result.data.length} rows, no problems` : ` ${result.errors.length} problems in ${result.data.length} rows`);
    const where = (e: ParseError): string => {
      const record = recordOf(e, true);
      return record === undefined ? 'whole file' : `line ${lineOfRecord(input.text, record, true)}`;
    };
    out.show(badge, errorList(result.errors, { compact: stage.preview, max: stage.preview ? 2 : 0, type: !stage.preview, where, none: 'Nothing to fix.' }));
    stage.say(pass ? 'Clean file: it can go straight in.' : 'Each problem names its line: fix and re-check.', pass ? 'ok' : 'bad');
  };
  const input = csvInput(stage, f.from, MESSY.text, render);
  const show = (s: Scene): void => {
    input.set(s.text);
    f.from.title.textContent = `File: ${s.name}`;
    render();
  };
  stage.cycle(stage.preview ? [MESSY, CLEAN] : [MESSY], 3200, show);
  if (stage.bar) {
    select(stage.bar, 'Sample', [[MESSY, 'messy file'], [CLEAN, 'clean file']], show);
    filePicker(stage.bar, f.from.el, (file) => {
      void file.text().then((text) => {
        if (stage.disposed) return;
        show({ name: file.name, text });
      });
    });
  }
  return stage.dispose;
};

export default mount;
