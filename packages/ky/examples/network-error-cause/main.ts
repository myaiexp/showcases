// NetworkError: Ky names the failure and keeps the browser's own error as its cause
import { isNetworkError } from 'ky';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { kyName, loop } from '../../shared/err-kit.ts';
import { demo, notes } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'The connection drops before any answer arrives. Plain fetch and Ky report it differently.',
    server: { latency: 80, delay: 60 },
    // drop: true loses the connection, which makes fetch reject with TypeError('Failed to fetch').
    routes: { '/weather': { drop: true } },
  });
  const row = stage.row();
  const plain = notes(row, 'Plain fetch throws');
  const withKy = notes(row, 'Ky throws');
  let retries = false;
  if (!stage.preview) checkbox(stage.bar!, 'let Ky retry (its default for GET)', false, (v) => (retries = v));

  loop(
    stage,
    async () => {
      server.reset();
      plain.pending();
      withKy.pending();
      stage.say('Asking for the weather, but the line is down…');
      try {
        // The same pretend server, without Ky: what fetch itself does.
        await server.fetch('https://api.example/weather');
      } catch (error) {
        if (stage.disposed) throw error;
        plain.set([[`${kyName(error)}: ${(error as Error).message}`, 'bad'], 'Which request? Why? Unknown.']);
      }
      try {
        await api.get('https://api.example/weather', { retry: retries ? 2 : 0 });
      } catch (error) {
        if (stage.disposed) throw error;
        if (!isNetworkError(error)) throw error;
        const cause = error.cause as Error | undefined;
        withKy.set([
          [`${kyName(error)}`, 'bad'],
          `request: ${error.request.method} ${error.request.url.replace('https://', '')}`,
          `cause: ${cause ? `${kyName(cause)}: ${cause.message}` : 'none'}`,
        ]);
        stage.say('NetworkError: the browser\'s TypeError is kept as its cause.', 'ok');
      }
    },
    { label: 'Drop the connection again', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
