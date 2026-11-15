// z.hostname() typed live: bare host names only, no scheme, port or underscore
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.hostname()',
    schema: z.hostname(),
    label: 'Host',
    placeholder: 'sub.example.com',
    okText: 'a valid host name',
    samples: ['example.com', 'sub.example.com', 'localhost', 'https://example.com', 'example.com:8080', 'my_server.example.com', '-bad.example.com'],
    typed: ['api.example.com', 'https://example.com', 'my_server.lan'],
  });

export default mount;
