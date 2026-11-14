// searchParams: {...} builds the ?key=value part from an object
import type { Mount } from '@/types.ts';
import { button, checkbox, select, slider } from '../../shared/controls.ts';
import { attempt, demo, serial } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const SHOES = [
  { name: 'Trail Runner', price: 95, inStock: true },
  { name: 'City Sneaker', price: 60, inStock: true },
  { name: 'Winter Boot', price: 120, inStock: false },
  { name: 'Sandal', price: 35, inStock: true },
  { name: 'Hiking Boot', price: 140, inStock: true },
  { name: 'Slipper', price: 25, inStock: false },
];

interface Filters {
  maxPrice: number;
  inStock: boolean;
  sort: string;
}

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Change a filter and send: the address the server got is rebuilt from the object.',
    // The server reads the address, filters its list and answers with the names.
    routes: {
      '/shoes': (req) => {
        const q = req.url.searchParams;
        const list = SHOES.filter((s) => s.price <= Number(q.get('maxPrice')) && (q.get('inStock') !== 'true' || s.inStock));
        if (q.get('sort') === 'price') list.sort((a, b) => a.price - b.price);
        return { json: list.map((s) => `${s.name} ${s.price}€`) };
      },
    },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: [], fullUrl: false });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  const search = async (f: Filters): Promise<void> => {
    stage.say(`searchParams: { maxPrice: ${f.maxPrice}, inStock: ${f.inStock}, sort: '${f.sort}' }`);
    // Numbers and booleans are fine: Ky writes them into the address as text.
    const out = await attempt(stage, result, () => api.get('https://shop.example/shoes', { searchParams: { ...f } }).json<string[]>());
    if (out.ok) stage.say(`${out.value.length} shoes match the filters in the address.`, 'ok');
  };

  if (stage.preview) {
    const steps: Filters[] = [
      { maxPrice: 150, inStock: false, sort: 'name' },
      { maxPrice: 100, inStock: true, sort: 'price' },
      { maxPrice: 50, inStock: true, sort: 'price' },
    ];
    let i = 0;
    stage.play(async (wait) => {
      await search(steps[i++ % steps.length]!);
      await wait(1600);
    });
    return stage.dispose;
  }
  const f: Filters = { maxPrice: 100, inStock: true, sort: 'price' };
  slider(stage.bar!, 'max price', 20, 150, 5, f.maxPrice, (v) => (f.maxPrice = v), (v) => `${v}€`);
  checkbox(stage.bar!, 'in stock only', f.inStock, (v) => (f.inStock = v));
  select(stage.bar!, 'sort by', [['name', 'name'], ['price', 'price']] as const, (v) => (f.sort = v), 'price');
  const queue = serial(stage);
  button(stage.bar!, 'Search', () => queue(() => search({ ...f })));
  queue(() => search({ ...f }));
  return stage.dispose;
};

export default mount;
