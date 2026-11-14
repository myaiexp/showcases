// step looks for one customer and aborts the parse as soon as that row arrives
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flash, flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CSV = 'order,customer,city\n1001,Ada,Oslo\n1002,Bruno,Lyon\n1003,Chen,Porto\n1004,Dalia,Turku';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type another customer name, or edit the CSV. The unread part of the text is dimmed.' });
  const f = flow(stage, { from: 'CSV text', via: 'step → parser.abort()', to: 'Found', split: 0.5 });
  const out = output(stage, f.to);
  let target = 'Bruno';
  const input = csvInput(stage, f.from, CSV, () => search());

  const search = (): void => {
    let hitRow = 0; // the row (1 = first after the header) where the customer turned up
    let rowCount = 0;
    let found: Record<string, unknown> | undefined;
    let readTo = 0; // how many characters Papa had read when we stopped it
    const text = input.text;
    Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: true,
      step: (results, parser) => {
        rowCount++;
        if (results.data['customer'] !== target) return;
        found = results.data;
        hitRow = rowCount;
        readTo = results.meta.cursor; // where Papa is in the text right now
        parser.abort(); // stop here: the rest of the text is never read
      },
      complete: (results) => {
        if (stage.disposed) return;
        input.paint({ lineClass: (i) => (hitRow === 0 || i === 0 ? undefined : i < hitRow ? 'pp-ok' : i === hitRow ? 'pp-hit' : 'pp-dim') });
        out.show(dataTable(found ? [found] : [], { empty: `no ${target} in the file`, numbered: false }));
        flash(f.to.body);
        const unread = Math.round((1 - readTo / text.length) * 100);
        out.pill('meta.aborted', String(results.meta.aborted ?? false), found ? 'ok' : 'warn');
        out.pill('characters read', found ? `${readTo} of ${text.length}` : `${text.length} of ${text.length}`);
        stage.say(
          found ? `Found ${target} at row ${hitRow}: ${unread}% of the text never read.` : `${target} is not in the file: all ${rowCount} rows read.`,
          found ? 'ok' : 'warn',
        );
      },
    });
  };

  if (stage.preview) {
    stage.cycle(['Ada', 'Chen', 'Dalia'], 3000, (name) => {
      target = name;
      search();
    });
  } else {
    textInput(stage.bar!, 'Find customer', target, (v) => {
      target = v.trim();
      search();
    }, 10);
    search();
  }
  return stage.dispose;
};

export default mount;
