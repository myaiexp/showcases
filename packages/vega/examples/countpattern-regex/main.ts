// Countpattern pattern: the regular expression decides what a countable token is
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { rowsOf } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const notes = [
  { note: 'Room 12 on floor 3, call 555 or 12, back by 17:30' },
  { note: 'Mia met Tom in Oslo on floor 3 about room 12' },
  { note: 'Bring 3 chairs to Room 7 and 2 tables to floor 3' },
  { note: 'Oslo office: Tom and Mia, rooms 7 and 12' },
];

// Each entry is a regular expression written inside a JSON string, so a backslash is doubled.
const patterns: Record<string, string> = {
  'digits \\d+': '\\d+',
  'capitalised [A-Z][a-z]+': '[A-Z][a-z]+',
  'time \\d+:\\d+': '\\d+:\\d+',
  'vowels [aeiou]': '[aeiou]',
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 200,
    padding: 5,
    signals: [{ name: 'which', value: 'digits \\d+', bind: { input: 'select', options: Object.keys(patterns) } }],
    data: [
      { name: 'notes', values: notes },
      { name: 'patterns', values: Object.entries(patterns).map(([label, pattern]) => ({ label, pattern })) },
      {
        name: 'found',
        source: 'notes',
        transform: [
          {
            type: 'countpattern',
            field: 'note',
            pattern: { signal: "data('patterns')[indexof(pluck(data('patterns'), 'label'), which)].pattern" },
            // 13 is not special here: the stopwords regular expression only skips the digit 3.
            stopwords: '3',
            as: ['token', 'n'],
          },
          { type: 'collect', sort: { field: ['n', 'token'], order: ['descending', 'ascending'] } },
        ],
      },
      rowsOf('top', 'found', 8),
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'top', field: 'token' }, range: 'height', padding: 0.15 },
      { name: 'x', type: 'linear', domain: { data: 'top', field: 'n' }, nice: true, zero: true, range: 'width' },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', tickMinStep: 1 }],
    title: { text: { signal: "'pattern ' + which + ' (skipping 3)'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'top' },
        encode: {
          update: {
            y: { scale: 'y', field: 'token' },
            height: { scale: 'y', band: 1 },
            x: { value: 0 },
            x2: { scale: 'x', field: 'n' },
            fill: { value: 'orange' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'which', Object.keys(patterns), 1600);
  return () => stage.dispose();
};

export default mount;
