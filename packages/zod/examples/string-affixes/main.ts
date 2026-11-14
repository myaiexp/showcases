// startsWith, endsWith and includes: required beginning, ending or middle piece
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      {
        label: 'starts with',
        code: 'z.string().startsWith("https://")',
        schema: z.string().startsWith('https://'),
        inputs: ['https://example.com', 'http://example.com', 'example.com', 'HTTPS://example.com'],
      },
      {
        label: 'ends with',
        code: 'z.string().endsWith(".csv")',
        schema: z.string().endsWith('.csv'),
        inputs: ['sales-2024.csv', 'sales-2024.xlsx', 'sales.csv.bak', 'notes.CSV'],
      },
      {
        label: 'includes',
        code: 'z.string().includes("@")',
        schema: z.string().includes('@'),
        inputs: ['@ada', 'ada@example.com', 'ada', 'ada at example dot com'],
      },
    ],
  });

export default mount;
