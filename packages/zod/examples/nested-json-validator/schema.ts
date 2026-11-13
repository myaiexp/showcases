// Order schema with a cross-field refine, plus sample payloads
import { z } from 'zod';

export const orderSchema = z
  .object({
    orderId: z.string().startsWith('ORD-', 'Must start with ORD-'),
    customer: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.email(),
    }),
    items: z
      .array(
        z.object({
          sku: z.string(),
          qty: z.number().int().positive('Qty must be positive'),
          price: z.number().nonnegative(),
        }),
      )
      .min(1, 'Order needs at least one item'),
    total: z.number().nonnegative(),
  })
  .refine((o) => o.total === o.items.reduce((s, i) => s + i.qty * i.price, 0), {
    message: 'total must equal the sum of items',
    path: ['total'],
  });

export const VALID_ORDER = {
  orderId: 'ORD-1042',
  customer: { name: 'Ada Lovelace', email: 'ada@example.com' },
  items: [
    { sku: 'BOOK-01', qty: 2, price: 12.5 },
    { sku: 'PEN-09', qty: 3, price: 1.0 },
  ],
  total: 28,
};

/** Texts the gallery preview cycles through: valid, then two broken variants. */
export const PREVIEW_TEXTS: readonly string[] = [
  JSON.stringify(VALID_ORDER, null, 2),
  JSON.stringify({ ...VALID_ORDER, orderId: '1042', total: 30 }, null, 2),
  JSON.stringify(
    { ...VALID_ORDER, items: [{ sku: 'BOOK-01', qty: -1, price: 12.5 }], customer: { name: '', email: 'ada' } },
    null,
    2,
  ),
];

export interface Problem {
  path: string;
  message: string;
}

/** Parse the text and return the list of problems; empty means valid. */
export function check(text: string): Problem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return [{ path: 'JSON', message: 'Invalid JSON: ' + (e instanceof Error ? e.message : String(e)) }];
  }
  const result = orderSchema.safeParse(parsed);
  if (result.success) return [];
  return result.error.issues.map((issue) => ({
    path: issue.path.length ? issue.path.join('.') : '(root)',
    message: issue.message,
  }));
}
