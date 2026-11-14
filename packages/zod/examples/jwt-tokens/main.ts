// Tokens through z.jwt(), with and without a required signing algorithm
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// A token is three base64url parts joined by dots: header.payload.signature.
const part = (obj: object): string => btoa(JSON.stringify(obj)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
const token = (alg: string): string => `${part({ alg })}.${part({ sub: '42' })}.c2ln`;

const INPUTS = [token('HS256'), token('RS256'), 'abc.def.ghi', 'header.payload', 'not a token'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'any token', code: 'z.jwt()', schema: z.jwt() },
      { label: 'HS256 only', code: 'z.jwt({ alg: "HS256" })', schema: z.jwt({ alg: 'HS256' }) },
      { label: 'RS256 only', code: 'z.jwt({ alg: "RS256" })', schema: z.jwt({ alg: 'RS256' }) },
    ],
  });

export default mount;
