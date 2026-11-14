// z.properties(): protocol, port and hostname of a URL checked together
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const SiteLink = z.instanceof(URL).check(
  ...z.properties({
    protocol: z.literal('https:', 'Only https links'),
    port: z.literal('', 'No port numbers'),
    hostname: z.string().endsWith('example.com'),
  }),
);

const SAMPLES = [
  { label: 'shop link', value: new URL('https://shop.example.com/tea') },
  { label: 'http with a port', value: new URL('http://example.com:8080/tea') },
  { label: 'someone else', value: new URL('https://evil.org/tea') },
  { label: 'plain text', value: 'https://shop.example.com/tea' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  objectLab(stage, [{ label: 'link', code: 'z.instanceof(URL).check(...z.properties({ protocol, port, hostname }))', schema: SiteLink }], SAMPLES, {
    plan: [[0, 0], [0, 1], [0, 2], [0, 3]],
    inTitle: 'Link',
    editor: false,
  });
  return stage.dispose;
};

export default mount;
