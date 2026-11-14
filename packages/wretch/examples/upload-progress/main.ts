// .onUpload() reports how much of the body has left, where the browser allows
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import ProgressAddon from 'wretch/addons/progress';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { makeFile } from '../../shared/files.ts';
import { meter } from '../../shared/meter.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server reads the upload slowly so the bar has time to move.' });
  const server = createServer(stage, { 'POST /upload': () => ({ status: 201, json: { ok: true } }) }, { readPace: 150 });
  wire(stage, server, { rows: 0 });
  const bar = meter(stage.root, 'Upload');

  const api = wretch(`${BASE}/upload`).fetchPolyfill(server.fetch).addon([ProgressAddon(), FormDataAddon]);
  const video = makeFile('holiday.mp4', 480_000, 'video/mp4');

  const upload = async (): Promise<void> => {
    bar.reset();
    stage.say('.formData({ video }).onUpload(...).post()');
    await api
      .formData({ title: 'Holiday', video })
      .onUpload((loaded, total) => {
        if (!stage.disposed) bar.set(loaded, total);
      })
      .post()
      .res()
      .catch(() => {});
    if (stage.disposed) return;
    if (bar.calls === 0) {
      // Firefox cannot stream a request body: the addon falls back silently and no progress arrives.
      bar.note('No progress arrived: this browser cannot stream uploads', 'warn');
      stage.say('The upload went through, but this browser (Firefox, for one) gave no progress', 'warn');
    } else stage.say('The bar followed the upload piece by piece', 'ok');
  };

  runCases(stage, [{ label: 'Upload again', run: upload }], 1500);
  return () => stage.dispose();
};

export default mount;
