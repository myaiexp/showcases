// The doodle code inside <template>, inside <style>, or in the use attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three ways to pass the code',
  summary:
    'The getting-started doodle three times: its code wrapped in a <template> (for tools that would parse it as HTML), in a <style> (for CSS highlighting), and passed in the use attribute with the element left empty. All three draw the same leaves.',
  section: 'Getting started',
  tags: ['<template>', '<style>', 'use', '@pn'],
  docs: ['pages/css-doodle-com/getting-started.md', 'pages/css-doodle-com/reference/attribute-use.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
