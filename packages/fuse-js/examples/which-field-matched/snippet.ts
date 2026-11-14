// Cuts a long value down to the stretch around its first match
import type { RangeTuple } from 'fuse.js';

/** `value` trimmed to ~`around` characters either side of the first match, with the ranges shifted to fit. */
export function snippet(value: string, indices: readonly RangeTuple[] | undefined, around = 22): { text: string; indices: RangeTuple[] } {
  const first = indices?.[0];
  if (!first || value.length <= around * 2 + 10) return { text: value, indices: [...(indices ?? [])] };
  const from = Math.max(0, first[0] - around);
  const to = Math.min(value.length, first[1] + 1 + around);
  const lead = from > 0 ? '…' : '';
  const shift = lead.length - from;
  const kept = (indices ?? []).filter(([s, e]) => s >= from && e < to).map(([s, e]): RangeTuple => [s + shift, e + shift]);
  return { text: `${lead}${value.slice(from, to)}${to < value.length ? '…' : ''}`, indices: kept };
}
