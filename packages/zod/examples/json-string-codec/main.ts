// json(schema): a codec from JSON text to a checked object
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const jsonCodec = <T extends z.core.$ZodType>(schema: T) =>
  z.codec(z.string(), schema, {
    decode: (jsonString, ctx) => {
      try {
        return JSON.parse(jsonString);
      } catch (err) {
        ctx.issues.push({
          code: 'invalid_format',
          format: 'json',
          input: jsonString,
          message: (err as Error).message,
        });
        return z.NEVER;
      }
    },
    encode: (value) => JSON.stringify(value),
  });

const jsonToObject = jsonCodec(z.object({ name: z.string(), age: z.number() }));

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'jsonCodec(z.object({ name, age }))',
    codec: jsonToObject,
    samples: [
      { label: 'compact JSON', value: '{"name":"Alice","age":30}' },
      { label: 'spaced JSON', value: '{ "name": "Alice", "age": 30 }', say: '✓ it works, but JSON.stringify writes it compactly: same data, different spacing' },
      { label: 'broken JSON', value: '~~invalid~~', say: '✗ JSON.parse failed and the codec turned that into a Zod issue' },
      { label: 'age is text', value: '{"name":"Alice","age":"30"}', say: '✗ valid JSON, wrong shape: the inner schema refused age (a string, not a number)' },
      { label: 'encode an object', value: { name: 'Bob', age: 25 }, dir: 'encode' },
    ],
  });

export default mount;
