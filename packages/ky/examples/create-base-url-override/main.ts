// baseUrl: '' on one call escapes the client's baseUrl, to the page's own site
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { ledgerScene } from '../../shared/inst-kit.ts';
import { cycle } from '../../shared/req-kit.ts';

const CHOICES = [
  { label: "baseUrl: ''", options: { baseUrl: '' } },
  { label: "baseUrl: 'https://status.example/'", options: { baseUrl: 'https://status.example/' } },
  { label: 'no override', options: {} },
];

const mount: Mount = (el, ctx) => {
  const { stage, server, log, send } = ledgerScene(el, ctx, {
    hint: "The client sends everything to the shop API. One call needs to reach this page's own site instead.",
    ledger: { host: true },
  });

  // A client made with create: its default address start is the shop API.
  // (create inherits nothing, so the pretend fetch is given again.)
  const api = ky.create({ fetch: server.fetch, baseUrl: 'https://api.example/shop/' });

  cycle(stage, CHOICES, async (item) => {
    log.clear();
    stage.say('Most calls go where the client was set up to send them…');
    await send("'products'", () => api.get('products'));
    stage.say(`One call overrides the address start: ${item.label}`);
    // The Ky option: a baseUrl on this one call beats the client's.
    await send("'status'", () => api.get('status', item.options));
    stage.say(item.label === 'no override' ? 'No override: it went to the shop API like the rest.' : item.label === "baseUrl: ''" ? "An empty baseUrl means this page's own site." : 'That call went to another server.', 'ok');
  });
  return stage.dispose;
};

export default mount;
