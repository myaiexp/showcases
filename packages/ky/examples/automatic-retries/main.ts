// A flaky server fails twice; Ky quietly tries again, waiting longer each time
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { resultView } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server is busy (503) on the first two tries.' });
  // Answers 503 "Service Unavailable" to the first two requests, then the data.
  const server = stage.server({
    '/weather': (req) => (req.n <= 2 ? { status: 503 } : { json: { city: 'Oulu', temp: -12 } }),
  });
  stage.wire(server);
  const times = timeline(stage.root, server, stage.signal, { span: 3000 });
  const result = resultView(stage.root, 'Your code got');

  // The pretend server stands in for the network: Ky sends through it via the `fetch` option.
  const api = ky.extend({ fetch: server.fetch });

  const run = async (): Promise<void> => {
    server.reset();
    times.reset();
    result.pending('waiting… (Ky is retrying)');
    stage.say('Asking for the weather…');
    // No retry settings: by default Ky retries a GET up to 2 times on a 503,
    // after 0.3 s and then 0.6 s.
    const weather = await api.get('https://api.example/weather').json();
    result.value(weather, 'success on try 3');
    stage.say('Two failures, two pauses, one success: your code only sees the success.', 'ok');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await run();
      await wait(1800);
    });
  } else {
    button(stage.bar!, 'Ask again', () => stage.task(run));
    stage.task(run);
  }
  return stage.dispose;
};

export default mount;
