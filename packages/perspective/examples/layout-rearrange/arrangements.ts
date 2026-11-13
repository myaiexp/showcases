// The layout trees the rearrange example switches between
import type { WorkspaceConfigUpdate } from '@perspective-dev/viewer';

type Layout = NonNullable<WorkspaceConfigUpdate['layout']>;

const cell = (id: string): Layout => ({ type: 'tab-layout', tabs: [id] });

export function arrangements([a, b, c]: string[]): Record<string, Layout> {
  if (!a || !b || !c) throw new Error('expected three panels');
  return {
    'three even columns': { type: 'split-layout', orientation: 'horizontal', sizes: [1, 1, 1], children: [cell(a), cell(b), cell(c)] },
    'first twice as wide': {
      type: 'split-layout',
      orientation: 'horizontal',
      sizes: [0.5, 0.25, 0.25],
      children: [cell(a), cell(b), cell(c)],
    },
    'three rows': { type: 'split-layout', orientation: 'vertical', sizes: [1, 1, 1], children: [cell(a), cell(b), cell(c)] },
    'two over one': {
      type: 'split-layout',
      orientation: 'vertical',
      sizes: [0.6, 0.4],
      children: [{ type: 'split-layout', orientation: 'horizontal', sizes: [0.5, 0.5], children: [cell(a), cell(b)] }, cell(c)],
    },
    'swap first and last': { type: 'split-layout', orientation: 'horizontal', sizes: [1, 1, 1], children: [cell(c), cell(b), cell(a)] },
    'stacked as tabs': { type: 'tab-layout', tabs: [a, b, c], selected: 1 },
  };
}
