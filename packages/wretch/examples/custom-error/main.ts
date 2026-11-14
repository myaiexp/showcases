// .customError() reads the server's explanation into the error object
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { alertBox } from './alert.ts';
import './style.css';

interface ApiError {
  status: number;
  code: number;
  message: string;
}

const PROBLEMS = {
  short: { status: 422, json: { code: 1042, message: 'The title needs at least 5 characters' } },
  taken: { status: 409, json: { code: 2017, message: 'A post with that title already exists' } },
  down: { status: 500, json: { code: 9000, message: 'The database is resting, try again soon' } },
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server explains each failure in the body of its answer.' });
  const server = createServer(stage, {
    'POST /posts/:problem': (req) => PROBLEMS[req.params['problem'] as keyof typeof PROBLEMS],
  });
  wire(stage, server, { rows: 0 });
  const alert = alertBox(stage.root);
  const shown = screen(stage.root, 'What the app shows');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    // The error now carries whatever the answer's JSON said, next to status and url.
    .customError<ApiError>(async (error, response) => ({ ...error, ...(await response.json()) }))
    .catcher([409, 422, 500], (error) => {
      alert.show(error.code, error.message, error.status);
      stage.say(`error.code is ${error.code} and error.message is the server's own sentence`, 'warn');
    });

  const send = async (problem: keyof typeof PROBLEMS, say: string): Promise<void> => {
    alert.hide();
    shown.clear('Waiting…');
    stage.say(say);
    await api.post({ title: 'Hi' }, `/posts/${problem}`).json().catch(() => {});
    if (!stage.disposed) shown.show('The post was not saved', 'warn');
  };

  runCases(stage, [
    { label: 'Title too short', run: () => send('short', 'POST: the server answers 422') },
    { label: 'Title taken', run: () => send('taken', 'POST: the server answers 409') },
    { label: 'Server down', run: () => send('down', 'POST: the server answers 500') },
  ]);
  return () => stage.dispose();
};

export default mount;
