// collection.delete(): trim a log by dropping entries older than a cutoff date
import type { Mount } from '@/types.ts';
import { numberField } from '../../shared/controls.ts';
import { demo } from '../../shared/demo.ts';
import { logRows } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const columns = ctx.preview
    ? [{ field: 'date', width: '6.5em' }, 'text']
    : [{ field: 'id', width: '2.6em' }, { field: 'date', width: '7em' }, 'text'];
  const d = demo(el, ctx, { table: 'logs', stores: 'id, date', seed: logRows(6), columns });
  const { t, say, view, out } = d;
  const keep = numberField(d.stage, 'days to keep', 3, 1, 6);
  const cutoff = () => new Date(2026, 10, 14 - Number(keep.value) + 1);
  say.set('Six days of log entries.', "stores: 'id, date'");
  d.run([
    d.step('Older than cutoff', 'Which entries are too old?', "where('date').below(cutoff)", async () =>
      view.mark(await t.where('date').below(cutoff()).primaryKeys(), 'bad'),
    ),
    d.step('Delete them', 'Trim the log.', "where('date').below(cutoff).delete()", async () =>
      out.value(await t.where('date').below(cutoff()).delete(), 'entries deleted', 'warn'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
