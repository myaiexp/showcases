// Pizzicato.js example: white noise computed in a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'White noise from a function',
  summary:
    "With source 'script' you write the sound yourself: Pizzicato calls your audioFunction for every block of samples, and you fill the block. A random number per sample is white noise, the hiss of an untuned radio.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'script'", 'audioFunction', 'noise'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
