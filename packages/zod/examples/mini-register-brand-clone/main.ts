// .register(), .brand() and .clone(def) on Zod Mini schemas, each checked live
import * as zm from 'zod/mini';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'schema.register(…)  schema.brand()  schema.clone(def)');

  // A registry of your own: it stores a title for each schema, outside the schema itself.
  const titles = zm.registry<{ title: string }>();
  const name = zm.string();
  const registered = name.register(titles, { title: 'My cool string schema' });

  const usd = zm.string().brand('USD');
  const price = usd.parse('19.90');

  const original = zm.string().check(zm.minLength(3));
  const copy = original.clone(original._zod.def);

  const lines: Fact[] = [
    { label: '.register()', sub: 'files the schema in a registry', text: stage.preview ? `returns the same` : `same schema back: ${registered === name}; registry says ${JSON.stringify(titles.get(name))}`, tone: 'ok' },
    { label: '.brand("USD")', sub: 'a TypeScript-only label', text: stage.preview ? `plain text ${JSON.stringify(price)}` : `parse("19.90") gives ${JSON.stringify(price)}: the value is plain text`, tone: 'ok' },
    {
      label: '.clone(def)',
      sub: 'a copy built from the same definition',
      text: stage.preview ? `a new object: ${copy !== original}` : `new object: ${copy !== original}; "ab" → ${original.safeParse('ab').success ? '✓' : '✗'} and ${copy.safeParse('ab').success ? '✓' : '✗'}; "abc" → ${original.safeParse('abc').success ? '✓' : '✗'} and ${copy.safeParse('abc').success ? '✓' : '✗'}`,
      tone: 'ok',
    },
  ];
  factTable(stage.root, stage, '8em').show(lines);
  stage.say('register files it, brand labels it for TypeScript only, clone copies it', 'info');
  return stage.dispose;
};

export default mount;
