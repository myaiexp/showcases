// .json() turns the text the server sent into real data you can open up
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { grid, pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { describe } from './describe.ts';

const ANSWERS: Record<string, unknown> = {
  profile: { name: 'Aino', age: 31, member: true, address: { city: 'Jyväskylä' } },
  scores: [12, 7, 30],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server sends text. See what .json() makes of it.' });
  const server = createServer(stage, { 'GET /data/:what': (req) => ({ json: ANSWERS[req.params['what']!] }) });
  wire(stage, server, { rows: 0 });
  const both = grid(stage.root);
  const sent = pane(both, 'Text on the wire');
  const got = pane(both, 'What .json() gives');

  const load = async (what: string): Promise<void> => {
    sent.set(JSON.stringify(ANSWERS[what]), 'dim');
    got.clear();
    stage.say(`api.get("/data/${what}").json()`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/data/${what}`)
      .json((data) => {
        if (stage.disposed) return;
        got.clear();
        describe(data).forEach((line) => got.add(line));
        stage.say('One string became data with named parts you can read directly', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'A profile', run: () => load('profile') },
    { label: 'A list of scores', run: () => load('scores') },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
