// Headers like "  First Name " and "E-MAIL" cleaned up as they are read
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { eventLog } from '../../shared/widgets.ts';

const TEXT = '  First Name ,E-MAIL,Age (yrs)\nAda,ada@mail.org,41\nBo,bo@mail.org,35';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then retype the header line with your own mess.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  const calls = stage.preview ? null : eventLog(f.to.body, 8);
  const keys = document.createElement('div');
  keys.className = 'pp-hdr-keys';
  let tidy = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    calls?.clear();
    const result = Papa.parse<Record<string, string>>(input.text, {
      header: true,
      skipEmptyLines: true,
      // Called once per header with the name and its column number; the return value is the key.
      transformHeader: tidy
        ? (header, index) => {
            const key = header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
            calls?.add(`transformHeader(${JSON.stringify(header)}, ${index}) → ${JSON.stringify(key)}`);
            return key;
          }
        : undefined,
    });
    f.via.textContent = tidy ? 'Papa.parse(text, { header: true, transformHeader })' : 'Papa.parse(text, { header: true })';
    input.paint({ lineClass: (i) => (i === 0 ? 'pp-hit' : undefined) });
    keys.textContent = (result.meta.fields ?? []).map((k) => JSON.stringify(k)).join(' ');
    keys.className = tidy ? 'pp-hdr-keys pp-ok' : 'pp-hdr-keys pp-bad';
    out.show(keys, dataTable(result.data, { fields: result.meta.fields, numbered: false }));
    stage.say(tidy ? 'Keys are lower-case, no spaces: row.first_name.' : 'Keys keep the spaces and capitals: awkward.', tidy ? 'ok' : 'warn');
  };

  toggle(stage, 'transformHeader', (on) => {
    tidy = on;
    render();
  });
  return stage.dispose;
};

export default mount;
