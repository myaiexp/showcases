// A 429 with Retry-After: Ky waits exactly as long as the server asks
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import type { Reply } from '../../shared/server.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let seconds = 1;
  let sends = true;
  const lab = retryLab(el, ctx, {
    hint: 'The photo server says "too many requests" once. See how long Ky waits before asking again.',
    span: 3000,
    fullSpan: 6000,
    routes: {
      // 429 "Too Many Requests", with the server's own request to wait N seconds.
      '/photos': (req): Reply => {
        const headers: Record<string, string> = sends ? { 'retry-after': String(seconds) } : {};
        return req.n === 1 ? { status: 429, headers } : { json: { photos: 24 } };
      },
    },
  });

  const search = (): Promise<boolean> =>
    lab.attempt({
      say: sends ? `The server says: wait ${seconds} s…` : 'The server says "too many requests", but not for how long…',
      // No retry options. `Retry-After: 2` on a 429 (or 503, 413) replaces Ky's own
      // 300 ms pause. The card uses 1 s only to keep the loop short.
      call: () => lab.api.get('https://photos.example/photos').json(),
      ok: () => {
        const waited = lab.gaps()[0] ?? 0;
        return {
          say: sends
            ? `Ky waited about ${(Math.round(waited / 100) / 10).toFixed(1)} s, the time the server asked for, then asked again.`
            : `No Retry-After, so Ky used its own pause (about ${Math.round(waited / 10) * 10} ms).`,
        };
      },
      bad: () => 'Ky gave up.',
    });

  if (!lab.stage.preview) {
    slider(lab.stage.bar!, 'Retry-After:', 0, 4, 1, seconds, (v) => (seconds = v), (v) => `${v} s`);
    checkbox(lab.stage.bar!, 'server sends Retry-After', true, (v) => (sends = v));
  }
  lab.start(async () => void (await search()), 1400, 'Search');
  return lab.dispose;
};

export default mount;
