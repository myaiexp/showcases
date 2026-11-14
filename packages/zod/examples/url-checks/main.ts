// z.url() typed live: permissive, so mailto: and javascript: links pass
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.url()',
    schema: z.url(),
    label: 'Link',
    placeholder: 'https://…',
    okText: 'the browser can read this as a URL',
    hint: 'Type a link: z.url() hands it to the browser\'s URL parser.',
    samples: ['https://example.com', 'http://localhost', 'mailto:noreply@zod.dev', 'javascript:alert(1)', 'example.com', 'not a url'],
    typed: ['https://example.com/a', 'example.com', 'mailto:noreply@zod.dev'],
  });

export default mount;
