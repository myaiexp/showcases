// .formData() reads a multipart answer back into named fields
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

/** Builds the form the server answers with; a Response with a FormData body sets its own content type. */
function formFor(which: string): FormData {
  const form = new FormData();
  if (which === 'order') {
    form.append('item', 'Wool socks');
    form.append('size', 'M');
    form.append('note', 'Gift wrap please');
  } else {
    form.append('title', 'Trip photo');
    form.append('photo', new File(['pretend pixels'], 'lake.jpg', { type: 'image/jpeg' }));
  }
  return form;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server answers with a filled-in form. Read it back.' });
  const server = createServer(stage, { 'GET /forms/:which': (req) => ({ body: formFor(req.params['which']!) }) });
  wire(stage, server, { rows: 0 });
  const fields = kv(stage.root, 'Fields in the form');
  fields.set([], 'Nothing yet');

  const open = async (which: string): Promise<void> => {
    stage.say(`api.get("/forms/${which}").formData()`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/forms/${which}`)
      .formData((form) => {
        if (stage.disposed) return;
        fields.set([...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : `file ${v.name} (${v.size} bytes)`]));
        stage.say('Each field of the multipart answer is now a name and a value you can read', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'An order form', run: () => open('order') },
    { label: 'A form with a photo', run: () => open('photo') },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
