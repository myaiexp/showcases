// .accept() asks for a format; the server sends the same data in that format
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { PRODUCTS } from '../../shared/data.ts';
import { envelope } from '../../shared/envelope.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { renderAnswer } from './render.ts';
import './style.css';

const FORMATS = ['application/json', 'text/csv', 'text/html'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same products, asked for in three formats.' });
  const server = createServer(stage, {
    'GET /products': (req) => {
      const want = req.headers.get('accept') ?? '';
      if (want.includes('text/csv')) {
        return { text: ['name,price', ...PRODUCTS.map((p) => `${p.name},${p.price}`)].join('\n'), headers: { 'content-type': 'text/csv' } };
      }
      if (want.includes('text/html')) {
        return { html: `<ul>${PRODUCTS.map((p) => `<li>${p.name}: ${p.price} €</li>`).join('')}</ul>` };
      }
      return { json: PRODUCTS.map((p) => ({ name: p.name, price: p.price })) };
    },
  });
  wire(stage, server, { rows: 0 });
  const seen = envelope(stage, { headers: ['accept'] });
  const view = renderAnswer(stage.root, stage.preview ? 3 : Infinity);

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const ask = async (format: string): Promise<void> => {
    stage.say(`.accept("${format}")`);
    // .res() hands over the Response, so we can look at the content type that came back.
    const answer = await api
      .accept(format)
      .get('/products')
      .res(async (r) => ({ type: r.headers.get('content-type') ?? '', text: await r.text() }))
      .catch(() => null);
    if (stage.disposed || !answer) return;
    seen.show(server.requests.at(-1)!);
    view.show(answer.type, answer.text);
    stage.say(`Same data, delivered as ${answer.type.split(';')[0]}`, 'ok');
  };

  runCases(
    stage,
    FORMATS.map((f) => ({ label: f, run: () => ask(f) })),
    1800,
  );
  return () => stage.dispose();
};

export default mount;
