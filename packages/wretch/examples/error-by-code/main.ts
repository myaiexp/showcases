// .error(code, ...) catches any status you name, even odd ones like 418 and 429
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ask the café machine for a drink. It has a few ways to say no.' });
  const server = createServer(stage, {
    'GET /brew/:drink': (req) => {
      const drink = req.params['drink'];
      if (drink === 'tea') return { status: 418, text: "I'm a teapot" };
      if (drink === 'espresso') return { status: 429, headers: { 'retry-after': '30' }, text: 'Too many espressos' };
      return { json: { drink, ready: true } };
    },
  });
  wire(stage, server, { rows: 0 });
  const ran = chips(stage.root, ['.error(418)', '.error(429)', '.json()']);
  const shown = screen(stage.root, 'What the app shows');

  const order = async (drink: string): Promise<void> => {
    ran.reset();
    shown.clear();
    stage.say(`api.get("/brew/${drink}")`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/brew/${drink}`)
      // Any status can get its own handler: pass the number.
      .error(418, (err) => {
        ran.fire('.error(418)', 'warn', `${err.status}: ${err.message}`);
        shown.show('This machine only makes tea, and it is a teapot', 'warn');
        stage.say('418 has no named helper, so .error(418, ...) took it', 'warn');
      })
      .error(429, (err) => {
        const wait = err.response.headers.get('retry-after');
        ran.fire('.error(429)', 'warn', `${err.status}: ${err.message}`);
        shown.show(`Too many orders. Try again in ${wait} seconds`, 'warn');
        stage.say('429 went to .error(429, ...), which also read the Retry-After header', 'warn');
      })
      .json((made: { drink: string }) => {
        ran.fire('.json()', 'ok', `200: ${made.drink} is ready`);
        shown.show(`Your ${made.drink} is ready`, 'ok');
        stage.say('A normal 200 goes to .json()', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Order a coffee', run: () => order('coffee') },
    { label: 'Order tea', run: () => order('tea') },
    { label: 'Order espresso', run: () => order('espresso') },
  ]);
  return () => stage.dispose();
};

export default mount;
