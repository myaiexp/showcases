// .customError() keeps the server's reason, so a form can say what to fix
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { signupForm } from './form.ts';
import './style.css';

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each sign-up fails for a different reason. The server explains in the body of its answer, or not at all.' });
  const server = createServer(stage, {
    'POST /signup': (req) => {
      const { email, password } = (req.body.kind === 'json' ? req.body.value : {}) as { email: string; password: string };
      if (email.startsWith('crash')) return { status: 500, text: 'upstream connect error' };
      if (email === 'aino@mail.example') {
        return { status: 409, json: { code: 'EMAIL_TAKEN', message: 'That email already has an account', details: { email: 'Try logging in instead' } } };
      }
      return { status: 422, json: { code: 'WEAK_PASSWORD', message: `Password is ${password.length} characters long`, details: { password: 'Use at least 8 characters' } } };
    },
  });
  wire(stage, server, { rows: 0 });
  const form = signupForm(stage.root);
  const shown = screen(stage.root, 'error.apiError');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    // The error is rebuilt with the answer's JSON attached; if the body is not JSON, a stand-in.
    .customError(async (error, response) => {
      const body = await response.json().catch(() => ({ message: 'Unknown error' }));
      return { ...error, apiError: body as ApiError };
    });

  const signUp = async (email: string, password: string): Promise<void> => {
    form.fill(email, password);
    shown.clear('Waiting…');
    stage.say('POST /signup with what was typed');
    await api
      .post({ email, password }, '/signup')
      .res()
      .catch((error: { apiError?: ApiError }) => {
        if (stage.disposed) return;
        const { apiError } = error;
        form.fail(apiError?.message ?? 'Something went wrong', apiError?.details);
        const lines = [`code: ${apiError?.code ?? '(none)'}`, `message: ${apiError?.message}`];
        shown.show(stage.preview ? lines[apiError?.code ? 0 : 1]! : lines.join('\n'), 'warn');
        stage.say(apiError?.code ? `The reason came from the body: ${apiError.code}` : 'The body was not JSON, so the stand-in message was used', 'warn');
      });
  };

  runCases(stage, [
    { label: 'Email taken', run: () => signUp('aino@mail.example', 'longenough1') },
    { label: 'Weak password', run: () => signUp('new@mail.example', 'abc') },
    { label: 'Server crash (no JSON)', run: () => signUp('crash@mail.example', 'longenough1') },
  ]);
  return () => stage.dispose();
};

export default mount;
