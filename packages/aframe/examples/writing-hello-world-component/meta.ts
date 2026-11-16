// aframe example: Writing a component: hello-world, logging from init
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: hello-world, logging from init',
  summary:
    'The most basic component, registered with registerComponent and used as an attribute in HTML or added later with setAttribute, even on the scene. Its init runs once per attach; the docs\' console.log goes to the board.',
  section: 'Introduction',
  tags: ['registerComponent', 'init', 'setAttribute', 'hello-world'],
  docs: ['repo/docs/introduction/writing-a-component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
