// The same file bytes read by default (garbled) and as windows-1252 (right)
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { textFile } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { fileChip } from '../../shared/widgets.ts';

const TEXT = 'item,supplier\ncafé,Müller\nnaïve,Müller';
/** windows-1252 spells every letter here with one byte, the same number as its code point. */
const cp1252 = (text: string): Uint8Array => Uint8Array.from(text, (c) => c.charCodeAt(0));
const utf8 = (text: string): Uint8Array => new TextEncoder().encode(text);

const ENCODINGS = [
  [undefined, 'default (UTF-8)'],
  ['windows-1252', 'windows-1252'],
  ['ISO-8859-1', 'ISO-8859-1'],
  ['UTF-16', 'UTF-16'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the encoding, and switch what the file was really saved as. Only the right pair reads cleanly.' });
  const f = flow(stage, { from: 'File on disk', via: 'Papa.parse(file, { header: true })', to: 'Rows', split: 0.4 });
  let saved: 'windows-1252' | 'UTF-8' = 'windows-1252';
  let run = 0;

  const read = (encoding: string | undefined): void => {
    const mine = ++run;
    const bytes = (saved === 'UTF-8' ? utf8 : cp1252)(TEXT);
    const file = textFile('suppliers.csv', [bytes as BlobPart]);
    // The bytes of the first word with an accent, so the reader can see what is on disk.
    const word = Array.from((saved === 'UTF-8' ? utf8 : cp1252)('café'), (b) => b);
    const hex = document.createElement('div');
    hex.append('café = ');
    word.forEach((b) => {
      const span = document.createElement('span');
      span.textContent = `${b.toString(16).toUpperCase().padStart(2, '0')} `;
      if (b > 127) span.className = 'pp-glyph';
      hex.append(span);
    });
    f.from.show(fileChip(file), hex);
    f.via.textContent = encoding ? `encoding: '${encoding}'` : 'no encoding option';
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      // Which text encoding FileReader should use to turn the file's bytes into letters.
      encoding,
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        const garbled = results.data.some((r) => Object.values(r).some((v) => String(v).includes('�') || /Ã|Â/.test(String(v))));
        f.to.show(
          dataTable(results.data, {
            fields: results.meta.fields,
            numbered: false,
            cellClass: (v) => (/[^\x20-\x7e]/.test(String(v)) ? (garbled ? 'pp-bad' : 'pp-ok') : undefined),
          }),
        );
        stage.say(garbled ? 'Garbled: the reader used the wrong alphabet.' : 'Café, Müller, naïve: read correctly.', garbled ? 'bad' : 'ok');
      },
    });
  };

  if (stage.preview) stage.cycle([undefined, 'windows-1252'], 3200, read);
  else {
    let current: string | undefined;
    select(stage.bar!, 'File saved as', [['windows-1252', 'windows-1252 (old Excel)'], ['UTF-8', 'UTF-8']] as const, (v) => {
      saved = v;
      read(current);
    });
    select(stage.bar!, 'encoding', ENCODINGS.map(([v, l]) => [v, l] as const), (v) => {
      current = v;
      read(v);
    });
    read(current);
  }
  return stage.dispose;
};

export default mount;
