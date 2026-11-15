// A string schema from each import path, probed for telltale markers
import * as z from 'zod';
import * as z4 from 'zod/v4';
import * as zm from 'zod/mini';
import * as core from 'zod/v4/core';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// What distinguishes the flavours: Zod 4 internals, Zod 3 internals, chained checks, .check(), parse methods.
function probe(schema: object, short: boolean): string {
  const s = schema as Record<string, unknown>;
  const markers: [string, boolean][] = [
    ['_zod', '_zod' in s],
    ['_def', '_def' in s],
    ['.min', typeof s['min'] === 'function'],
    ['.check', typeof s['check'] === 'function'],
    ['.parse', typeof s['parse'] === 'function'],
  ];
  // A card is narrow: drop .parse() there and list only what the schema has.
  const has = markers.filter(([name, yes]) => yes && !(short && name === '.parse')).map(([name]) => name);
  const lacks = markers.filter(([, yes]) => !yes).map(([name]) => name);
  return short ? has.join(' ') : `has ${has.join(' ') || 'nothing'}   lacks ${lacks.join(' ') || 'nothing'}`;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every mark is read from a live schema, not written by hand.' });
  codeLine(stage.root, 'import * as z from "<path>"; z.string()');
  const table = factTable(stage.root, stage);
  const lines: Fact[] = [
    { label: '"zod"', sub: 'Zod 4 classic', text: probe(z.string(), stage.preview), tone: 'ok' },
    { label: '"zod/v4"', sub: `the same classes as "zod": ${z4.ZodString === z.ZodString}`, text: probe(z4.string(), stage.preview), tone: 'ok' },
    { label: '"zod/mini"', sub: 'functional, tree-shakable', text: probe(zm.string(), stage.preview), tone: 'ok' },
    { label: '"zod/v4/core"', sub: 'bare base classes', text: probe(new core.$ZodString({ type: 'string' }), stage.preview), tone: 'ok' },
    { label: '"zod/v3"', sub: 'Zod 3, kept for compatibility', text: probe(z3.string(), stage.preview), tone: 'bad' },
  ];
  table.show(lines);
  stage.say('Only Zod 4 schemas carry _zod; Mini drops the chained methods, core drops every method', 'info');
  return stage.dispose;
};

export default mount;
