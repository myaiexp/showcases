// RegExp functions: regexp() builds a pattern from text and flags, test() sorts ten strings by it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const strings = ['555-0143', 'Cats and dogs', 'noon', 'Bee', 'abc123', '2024-06-30', 'dog', 'cooking', 'ZZZ', '42'].map((s) => ({ s }));
const patterns = ['^\\d{3}-\\d{4}$', '[aeiou]{2}', '^[a-z]+$', '(cat|dog)s?', '\\d+', '^\\w{3}$'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: 8,
    signals: [
      { name: 'pattern', value: patterns[0], bind: { input: 'select', options: patterns } },
      { name: 'flags', value: '', bind: { input: 'select', options: ['', 'i'], labels: ['no flags', 'i (ignore case)'] } },
    ],
    data: [
      {
        name: 'strs',
        values: strings,
        transform: [
          { type: 'window', ops: ['row_number'], as: ['n'] },
          { type: 'formula', as: 'ok', expr: 'test(regexp(pattern, flags), datum.s)' },
        ],
      },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'strs' },
        encode: {
          update: {
            x: { signal: '(datum.n - 1) % 2 * 225' },
            y: { signal: 'floor((datum.n - 1) / 2) * 34' },
            width: { value: 210 },
            height: { value: 28 },
            cornerRadius: { value: 4 },
            fill: { signal: 'datum.ok ? "#2f6b4f" : "#2a2f3a"' },
            stroke: { signal: 'datum.ok ? "#7ad39a" : "#3a4150"' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'strs' },
        encode: {
          update: {
            x: { signal: '(datum.n - 1) % 2 * 225 + 12' },
            y: { signal: 'floor((datum.n - 1) / 2) * 34 + 14' },
            baseline: { value: 'middle' },
            text: { field: 's' },
            fill: { signal: 'datum.ok ? "#fff" : "#8c93a1"' },
            font: { value: 'ui-monospace, monospace' },
            fontSize: { value: 12 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'strs' },
        encode: {
          update: {
            x: { signal: '(datum.n - 1) % 2 * 225 + 198' },
            y: { signal: 'floor((datum.n - 1) / 2) * 34 + 14' },
            baseline: { value: 'middle' },
            align: { value: 'right' },
            text: { signal: 'datum.ok ? "true" : "false"' },
            fill: { signal: 'datum.ok ? "#7ad39a" : "#667"' },
            fontSize: { value: 11 },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 178 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            font: { value: 'ui-monospace, monospace' },
            text: { signal: "'test(regexp(\"' + pattern + '\", \"' + flags + '\"), s): ' + length(data('strs')) + ' strings'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { pattern: patterns[0], flags: '' },
      { pattern: patterns[1], flags: '' },
      { pattern: patterns[2], flags: '' },
      { pattern: patterns[3], flags: '' },
      { pattern: patterns[3], flags: 'i' },
      { pattern: patterns[4], flags: '' },
      { pattern: patterns[5], flags: 'i' },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
