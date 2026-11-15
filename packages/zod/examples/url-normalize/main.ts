// z.url({ normalize: true }) returns the URL as the browser would write it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// With normalize: true the output is new URL(input).href, not the typed text.
const Link = z.url({ normalize: true });

const SAMPLES = [
  { label: 'messy', value: 'HTTP://ExAmPle.com:80/./a/../b?X=1#f oo' },
  { label: 'no path', value: 'https://example.com' },
  { label: 'dot segments', value: 'https://EXAMPLE.com/docs/old/../new' },
  { label: 'not a URL', value: 'example.com' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.url({ normalize: true })');
  const cp = checkpoint(stage.root, stage, { inTitle: 'Typed', outTitle: 'Stored', pass: 'Normalised' });
  drive(stage, SAMPLES, (value) => {
    const r = Link.safeParse(value);
    cp.show(value, r);
    stage.say(r.success ? (r.data === value ? '✓ already in normal form' : '✓ rewritten as the browser would write it') : `✗ ${r.error.issues[0]!.message}`, r.success ? 'ok' : 'bad');
  }, { editor: stage.root });
  return stage.dispose;
};

export default mount;
