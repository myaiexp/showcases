// The same input through a plain and a compiled schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { columns, logLine } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { leafText } from '../../shared/value-view.ts';
import { verdictView, type Result } from '../../shared/verdict.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

const Order = z.object({
  customer: z.email(),
  items: z.array(z.object({ sku: z.string(), qty: z.int().positive() })).min(1),
  coupon: z.string().length(6).optional(),
});
const FastOrder = z.compile(Order);

const SAMPLES = [
  { label: 'a good order', value: { customer: 'mina@example.com', items: [{ sku: 'tea-100g', qty: 2 }] } },
  { label: 'extra key', value: { customer: 'mina@example.com', items: [{ sku: 'tea-100g', qty: 1 }], note: 'gift' } },
  { label: 'three problems', value: { customer: 'mina', items: [{ sku: 'mug', qty: 0 }, { sku: 7, qty: 1 }], coupon: 'SHORT' } },
  { label: 'empty basket', value: { customer: 'mina@example.com', items: [] } },
];

/** A result boiled down to something comparable: the data, or each issue's path, code and message. */
const fingerprint = (r: Result): string => (r.success ? leafText(r.data) : JSON.stringify(r.error.issues.map((i) => [i.path, i.code, i.message])));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a sample or edit the JSON: both schemas see the same input.' });
  codeLine(stage.root, 'Order.safeParse(x)  vs  z.compile(Order).safeParse(x)');
  const [plain, fast] = columns(stage.root, ['plain Order', 'z.compile(Order)']);
  drive(
    stage,
    SAMPLES,
    (input) => {
      const a = Order.safeParse(input);
      const b = FastOrder.safeParse(input);
      const max = stage.preview ? 2 : undefined;
      // A card has no room for the whole tree: a good result is one line of text there.
      const show = (r: Result): HTMLElement => {
        if (!stage.preview || !r.success) return verdictView(r, { max });
        const line = document.createElement('div');
        line.textContent = `✓ ${leafText(r.data)}`;
        line.style.cssText = 'color: var(--green); overflow-wrap: anywhere; max-height: 5.2em; overflow: hidden';
        return line;
      };
      plain!.body.replaceChildren(show(a));
      fast!.body.replaceChildren(show(b));
      const same = fingerprint(a) === fingerprint(b);
      logLine(plain!, a.success ? 'clean copy' : plural(a.error.issues.length, 'issue'));
      logLine(fast!, b.success ? 'clean copy' : plural(b.error.issues.length, 'issue'), same ? 'ok' : 'bad');
      stage.say(same ? (a.success ? '✓ the same output from both' : `✓ both found the same ${plural(a.error.issues.length, 'issue')}, word for word`) : '✗ the two schemas disagree', same ? 'ok' : 'bad');
    },
    { editor: stage.root },
  );
  return stage.dispose;
};

export default mount;
