// searchParams as string, object, pairs or URLSearchParams: same address
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { demo, serial, shortUrl } from '../../shared/req-kit.ts';
import { logView } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Four ways to write the same filter. The server sees one address.',
    routes: { '/shirts': { json: { ok: true } } },
  });
  const log = logView(stage.row(), 'Address the server got', 5);

  const run = async (colour: string, size: string): Promise<void> => {
    log.clear();
    server.reset();
    const url = 'https://shop.example/shirts';
    // Four spellings of the same two filters:
    const forms = [
      ['string', () => api.get(url, { searchParams: `colour=${colour}&size=${size}` })],
      ['object', () => api.get(url, { searchParams: { colour, size } })],
      ['pairs', () => api.get(url, { searchParams: [['colour', colour], ['size', size]] })],
      ['URLSearchParams', () => api.get(url, { searchParams: new URLSearchParams({ colour, size }) })],
    ] as const;
    for (const [name, call] of forms) {
      stage.say(`searchParams as ${name}`);
      await call();
      log.add(`${name.padEnd(15)} ${shortUrl(server.requests.at(-1)!.url)}`, 'ok');
    }
    const urls = new Set(server.requests.map((r) => r.url.href));
    stage.say(urls.size === 1 ? 'All four give one address: use whichever you have.' : 'The addresses differ.', urls.size === 1 ? 'ok' : 'bad');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await run('red', 'M');
      await wait(2200);
    });
  } else {
    const queue = serial(stage);
    let colour = 'red';
    let size = 'M';
    select(stage.bar!, 'colour', [['red', 'red'], ['green', 'green'], ['navy blue', 'navy blue']] as const, (v) => { colour = v; queue(() => run(colour, size)); });
    select(stage.bar!, 'size', [['M', 'M'], ['L', 'L'], ['XL', 'XL']] as const, (v) => { size = v; queue(() => run(colour, size)); });
    queue(() => run(colour, size));
  }
  return stage.dispose;
};

export default mount;
