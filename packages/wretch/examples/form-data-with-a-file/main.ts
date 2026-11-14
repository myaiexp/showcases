// A File in the object goes out as a file part, next to the ordinary text fields
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { filePicker } from '../../shared/controls.ts';
import { envelope } from '../../shared/envelope.ts';
import { makeFile, textFile } from '../../shared/files.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import type { FilePart } from '../../shared/server-body.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open any file, or drop one here: it is read in the page and sent to the simulated server only.' });
  const server = createServer(stage, {
    'POST /albums': (req) => {
      const files = req.body.kind === 'form' ? req.body.entries.filter((e): e is [string, FilePart] => typeof e[1] !== 'string') : [];
      return { status: 201, json: { stored: files.map(([, f]) => `${f.file} (${f.size} bytes)`) } };
    },
  });
  const seen = envelope(stage, { headers: [] });
  const shown = screen(stage.root, 'What the server says it stored');

  const api = wretch(`${BASE}/albums`).fetchPolyfill(server.fetch).addon(FormDataAddon);

  const upload = async (file: File): Promise<void> => {
    stage.say(`.formData({ title, note, cover: ${file.name} })`);
    shown.clear();
    await api
      .formData({ title: 'Lake trip', note: 'First frost', cover: file })
      .post()
      .json((r: { stored: string[] }) => {
        if (stage.disposed) return;
        shown.show(r.stored.join(', '), 'ok');
        stage.say('Two text fields and one file travelled in the same form', 'ok');
      })
      .catch(() => {});
    if (!stage.disposed) seen.show(server.requests.at(-1)!);
  };

  const samples = [textFile('notes.txt', 'Mist over the lake, 6 degrees.\n'.repeat(4)), makeFile('cover.png', 2048, 'image/png')];
  runCases(stage, samples.map((f) => ({ label: `Send ${f.name}`, run: () => upload(f) })));
  if (stage.bar) filePicker(stage.bar, stage.root, (f) => void upload(f));
  return () => stage.dispose();
};

export default mount;
