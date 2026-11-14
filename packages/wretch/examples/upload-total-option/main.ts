// getUploadTotal tells the progress bar the upload size instead of measuring
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import ProgressAddon from 'wretch/addons/progress';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { makeFile } from '../../shared/files.ts';
import { meter } from '../../shared/meter.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const SIZE = 480_000;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three ways to give the bar its total: let it measure, tell it, or tell it wrong.' });
  const server = createServer(stage, { 'POST /upload': () => ({ status: 201, json: { ok: true } }) }, { readPace: 150 });
  const bar = meter(stage.root, 'Upload');
  const asked = pane(stage.root, 'getUploadTotal');
  const video = makeFile('holiday.mp4', SIZE, 'video/mp4');

  const upload = async (say: string, tell: number | null): Promise<void> => {
    bar.reset();
    asked.set(tell === null ? 'not given: the addon measures the body itself' : 'asked, answers…', 'dim');
    // The option: a function that returns the number of bytes about to be sent.
    const addon =
      tell === null
        ? ProgressAddon()
        : ProgressAddon({
            getUploadTotal: (url) => {
              asked.set(`asked about ${new URL(url).pathname}, answered ${tell} bytes`, 'info');
              return tell;
            },
          });
    stage.say(say);
    await wretch(`${BASE}/upload`)
      .fetchPolyfill(server.fetch)
      .addon([addon, FormDataAddon])
      .formData({ video })
      .onUpload((loaded, total) => {
        if (!stage.disposed) bar.set(loaded, total);
      })
      .post()
      .res()
      .catch(() => {});
    if (!stage.disposed && bar.calls === 0) {
      bar.note('No progress arrived: this browser cannot stream uploads', 'warn');
      stage.say('This browser (Firefox, for one) cannot stream uploads, so there is no bar to show', 'warn');
    }
  };

  runCases(stage, [
    { label: 'Measured', run: () => upload('No option: the addon works out the size itself', null) },
    { label: 'Told, about right', run: () => upload(`getUploadTotal answers ${SIZE + 300} bytes: the bar uses it`, SIZE + 300) },
    { label: 'Told, far too small', run: () => upload('A total that is too small: the bar is full at once and keeps growing its total', 50_000) },
  ]);
  return () => stage.dispose();
};

export default mount;
