// Jitter: clients that retry together keep crashing into the server together
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { herdStage } from '../../shared/retry-herd-stage.ts';

const mount: Mount = (el, ctx) => {
  const { stage, herd, run, start } = herdStage(el, ctx, 'The ticket server is down for the first second. Many pages ask at once and retry.', 2500, 100);
  let clients = 8;
  let jitter = false;

  const go = async (): Promise<void> => {
    stage.say(jitter ? 'Each client picks a random pause, so they scatter…' : 'Every client waits the same pause, so they stay in step…');
    // `jitter: true` swaps each pause for a random time between 0 and that pause.
    const ok = await run(clients, jitter);
    stage.say(
      jitter
        ? `Never more than ${herd.peak()} requests landed together. All ${ok} got their tickets.`
        : `${herd.peak()} requests landed in the same instant, again and again. A herd stampeding the server.`,
      jitter ? 'ok' : 'warn',
    );
  };

  if (!stage.preview) {
    slider(stage.bar!, 'clients:', 4, 16, 2, clients, (v) => (clients = v));
    checkbox(stage.bar!, 'turn on jitter', false, (v) => (jitter = v));
  }
  start(async () => {
    if (stage.preview) jitter = !jitter;
    await go();
  }, 1200, 'Everyone ask');
  return stage.dispose;
};

export default mount;
