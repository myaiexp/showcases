// A dropped connection, a refusal and a crash each call for other advice
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer, type Reply } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const ANSWERS: Record<string, Reply> = {
  offline: { network: true },
  refused: { status: 400, json: { error: 'The message is empty' } },
  crash: { status: 500, text: 'Something broke' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Sending a chat message. Pick how it goes wrong.' });
  const server = createServer(stage, { 'POST /messages/:how': (req) => ANSWERS[req.params['how']!]! });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.fetchError()', '.badRequest()', '.internalError()']);
  const shown = screen(stage.root, 'What the app tells the user');

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .resolve((chain) =>
      chain
        .fetchError((error) => {
          ran.fire('.fetchError()', 'warn', `no answer at all: ${error.message}`);
          throw error; // log it, then let the caller decide
        })
        .badRequest((error) => {
          ran.fire('.badRequest()', 'warn', `${error.status}: the server understood and refused`);
          throw error;
        })
        .internalError((error) => {
          ran.fire('.internalError()', 'bad', `${error.status}: the server itself failed`);
          throw error;
        }),
    );

  const send = async (how: string): Promise<void> => {
    ran.reset();
    shown.clear('Sending…');
    stage.say(`POST /messages/${how}`);
    await api
      .post({ text: 'hello' }, `/messages/${how}`)
      .res()
      .catch((error: { status?: number }) => {
        if (stage.disposed) return;
        // Each handler rethrew, so the caller still gets the failure and picks the message.
        if (error.status === undefined) {
          shown.show(stage.preview ? 'Offline. We will retry soon.' : 'You seem to be offline. We will try again when you are back.', 'warn');
          stage.say('No status means nothing arrived: retrying later makes sense', 'warn');
        } else if (error.status < 500) {
          shown.show(stage.preview ? 'Message refused. Fix it first.' : 'The message was refused. Fix it before sending again.', 'warn');
          stage.say('A 4xx is the request\'s fault: sending the same thing again will fail again', 'warn');
        } else {
          shown.show(stage.preview ? 'Server problem. Try again soon.' : 'Our server had a problem. It is not you. Try again soon.', 'bad');
          stage.say('A 5xx is the server\'s fault: waiting and retrying may well work', 'bad');
        }
      });
  };

  runCases(stage, [
    { label: 'Connection drops', run: () => send('offline') },
    { label: 'Empty message (400)', run: () => send('refused') },
    { label: 'Server crash (500)', run: () => send('crash') },
  ]);
  return () => stage.dispose();
};

export default mount;
