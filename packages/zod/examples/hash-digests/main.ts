// z.hash(): the same digests checked by algorithm and encoding
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// The SHA-256 of an empty file, written three ways, plus a SHA-1 and an MD5.
const SHA256_HEX = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const SHA256_B64 = '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=';
const SHA256_B64URL = '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU';
const SHA1_HEX = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
const MD5_HEX = 'd41d8cd98f00b204e9800998ecf8427e';

const INPUTS = [SHA256_HEX, SHA256_B64, SHA256_B64URL, SHA1_HEX, MD5_HEX, SHA256_HEX.slice(0, 63)];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'sha256 hex', code: 'z.hash("sha256")  // 64 hex characters', schema: z.hash('sha256') },
      { label: 'sha256 base64', code: 'z.hash("sha256", { enc: "base64" })', schema: z.hash('sha256', { enc: 'base64' }) },
      { label: 'sha256 base64url', code: 'z.hash("sha256", { enc: "base64url" })', schema: z.hash('sha256', { enc: 'base64url' }) },
      { label: 'sha1', code: 'z.hash("sha1")  // 40 hex characters', schema: z.hash('sha1') },
      { label: 'md5', code: 'z.hash("md5")  // 32 hex characters', schema: z.hash('md5') },
    ],
  });

export default mount;
