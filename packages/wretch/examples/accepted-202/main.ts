// A 202 "accepted" answer is a success, yet means "not ready yet"
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

class AcceptedError extends Error {
  override name = 'AcceptedError';
  response: Response;
  constructor(response: Response) {
    super('Request accepted for processing');
    this.response = response;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Exporting a report takes a while: the server first says "accepted", later "here it is".' });
  const server = createServer(stage, {
    'POST /exports': () => ({ status: 202, json: { job: 7 } }),
    'GET /exports/7': () => ({ json: { file: 'report-7.csv', rows: 120 } }),
  });
  wire(stage, server, { rows: stage.preview ? 2 : 4 });
  const ran = chips(stage.root, ['AcceptedError', '.json()']);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .middlewares([
      (next) => async (url, opts) => {
        const response = await next(url, opts);
        // 202 counts as ok, so wretch would call .json(). Turn it into an error it can route.
        if (response.status === 202) throw new AcceptedError(response);
        return response;
      },
    ])
    .catcher('AcceptedError', () => {
      ran.fire('AcceptedError', 'warn', 'status 202: the server is still working');
      return { status: 'processing' };
    });

  const call = async (request: Promise<unknown>): Promise<void> => {
    const result = (await request.catch(() => null)) as { status?: string; file?: string; rows?: number } | null;
    if (stage.disposed || !result) return;
    if (result.status === 'processing') {
      shown.show('Your export is being prepared…', 'warn');
      stage.say('The catcher returned a value, so the call resolved with it instead of failing', 'warn');
    } else {
      ran.fire('.json()', 'ok', 'status 200: the finished file');
      shown.show(`Ready: ${result.file} (${result.rows} rows)`, 'ok');
      stage.say('A normal 200 reached .json() as usual', 'ok');
    }
  };

  runCases(stage, [
    {
      label: 'Start the export',
      run: () => {
        ran.reset();
        shown.clear('Asking…');
        stage.say('POST /exports');
        return call(api.post({ format: 'csv' }, '/exports').json());
      },
    },
    {
      label: 'Check on it',
      run: () => {
        ran.reset();
        shown.clear('Asking…');
        stage.say('GET /exports/7');
        return call(api.get('/exports/7').json());
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
