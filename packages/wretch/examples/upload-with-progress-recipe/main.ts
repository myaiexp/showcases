// An uploadFile(file) helper: each file in a queue gets its own progress bar
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import ProgressAddon from 'wretch/addons/progress';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { filePicker } from '../../shared/controls.ts';
import { makeFile } from '../../shared/files.ts';
import { meter, type Meter } from '../../shared/meter.ts';
import { solo } from '../../shared/mwscene.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A photo album uploads its files one after the other. Add a file of your own with the button.' });
  const server = createServer(
    stage,
    {
      'POST /upload': (req) => {
        const part = req.body.kind === 'form' ? req.body.entries.find(([k]) => k === 'file') : undefined;
        const name = part && typeof part[1] !== 'string' ? part[1].file : '?';
        return { status: 201, json: { url: `/files/${name}` } };
      },
    },
    { readPace: stage.preview ? 90 : 120 },
  );

  const queue: { file: File; bar: Meter }[] = [];
  const add = (file: File): void => {
    queue.push({ file, bar: meter(stage.root, `${file.name}`) });
  };
  const sizes = stage.preview ? [160_000, 90_000] : [300_000, 90_000, 450_000];
  add(makeFile('beach.jpg', sizes[0]!, 'image/jpeg'));
  add(makeFile('notes.pdf', sizes[1]!, 'application/pdf'));
  if (sizes[2]) add(makeFile('clip.mp4', sizes[2], 'video/mp4'));

  // The recipe's helper: one file in, the server's JSON out, progress reported on the way.
  async function uploadFile(file: File, onPercent: (percent: number) => void) {
    return wretch(`${BASE}/upload`)
      .fetchPolyfill(server.fetch)
      .addon([FormDataAddon, ProgressAddon()])
      .formData({ file })
      .onUpload((loaded, total) => onPercent(Math.round((loaded / total) * 100)))
      .post()
      .json<{ url: string }>();
  }

  const sendOne = async ({ file, bar }: { file: File; bar: Meter }): Promise<void> => {
    bar.reset();
    stage.say(`uploadFile("${file.name}")`);
    const stored = await uploadFile(file, (percent) => {
      if (stage.disposed) return;
      bar.set((percent / 100) * file.size, file.size);
      stage.say(`Uploading ${file.name}: ${percent}%`);
    }).catch(() => null);
    if (stage.disposed) return;
    if (!stored) return bar.note('The upload failed', 'bad');
    // Firefox cannot stream a request body: the helper still works, but no percent ever arrives.
    if (bar.calls === 0) {
      bar.note(`stored at ${stored.url} (this browser gave no progress)`, 'warn');
    } else bar.note(`stored at ${stored.url}`, 'ok');
  };

  const sendAll = solo(async (): Promise<void> => {
    for (const item of queue) await sendOne(item);
    if (!stage.disposed) stage.say('Every file went up, and the helper returned where each one was stored', 'ok');
  });

  runCases(stage, [{ label: 'Upload the queue again', run: sendAll }], 1500);
  if (stage.bar) {
    filePicker(stage.bar, stage.root, (file) => {
      add(file);
      void sendOne(queue.at(-1)!).catch(() => {});
    });
  }
  return () => stage.dispose();
};

export default mount;
