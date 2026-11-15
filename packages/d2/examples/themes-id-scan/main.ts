// Steps one diagram through theme IDs and reports which are accepted
import type { Mount } from '@/types.ts';
import { d2ErrorText } from '../../shared/errors.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

// Some IDs in the ranges below do not exist; compile rejects them and the caption says so.
const source = `direction: right
client: Client {shape: person}
shop: {
  api
  db: {shape: cylinder}
  api -> db
}
client -> shop.api: order
`;

const ranges: [number, number][] = [
  [0, 12],
  [100, 106],
  [200, 203],
  [300, 304],
];
const ids = ranges.flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => from + i));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an ID, or press Scan to compile every ID in the ranges and list the ones that exist.' });
  let ticket = 0;

  /** Compiles the diagram with one ID. Resolves to the SVG, or null when the ID is unknown. */
  const tryTheme = async (id: number): Promise<string | null> => {
    const d2 = await stage.d2();
    try {
      const result = await d2.compile(source, { themeID: id, pad: 24 });
      return await d2.render(result.diagram, result.renderOptions);
    } catch (err) {
      if (err === STOPPED || stage.disposed) throw err;
      if (/not found/.test(d2ErrorText(err))) return null;
      throw err;
    }
  };

  const show = async (id: number): Promise<void> => {
    const mine = ++ticket;
    try {
      const svg = await tryTheme(id);
      if (mine !== ticket || stage.disposed) return;
      if (svg) {
        stage.show(svg);
        stage.say(`themeID ${id}: compiles`, 'ok');
      } else {
        stage.say(`themeID ${id}: theme ${id} not found`, 'warn');
      }
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    const next = (): void => {
      void show(ids[i++ % ids.length]!);
      stage.after(1800, next);
    };
    next();
    return () => stage.dispose();
  }

  const select = stage.select('themeID', ids.map((id) => String(id)), '0', (v) => void show(Number(v)));
  const panel = stage.side('Scan result');
  const pre = document.createElement('pre');
  pre.className = 'dd-pre';
  pre.textContent = 'Press Scan.';
  panel?.append(pre);
  stage.button('Scan all IDs', () => {
    void (async () => {
      pre.textContent = 'Scanning...';
      const found: number[] = [];
      const missing: number[] = [];
      try {
        for (const id of ids) {
          if ((await tryTheme(id)) === null) missing.push(id);
          else found.push(id);
        }
      } catch (err) {
        stage.fail(err);
        return;
      }
      if (stage.disposed) return;
      pre.textContent = `compile ok:\n${found.join(', ')}\n\nnot found:\n${missing.join(', ')}`;
    })();
  });
  void show(Number(select?.value ?? 0));
  return () => stage.dispose();
};

export default mount;
