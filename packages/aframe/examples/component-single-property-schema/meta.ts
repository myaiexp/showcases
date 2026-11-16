// aframe example: Single-property schema: foo="20" with type int and default 5
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Single-property schema: foo="20" with type int and default 5',
  summary:
    'A schema holding type and default directly makes a component with one anonymous value. Three boxes use foo bare, foo="20" and foo="7.9"; the int type drops the .9 and the bare one falls back to 5.',
  section: 'Core API',
  tags: ['single-property schema', 'int', 'default', 'registerComponent'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
