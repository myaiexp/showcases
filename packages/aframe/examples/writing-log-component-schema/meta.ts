// aframe example: Writing a component: a log component with a schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: a log component with a schema',
  summary:
    'The log component defines a message property in its schema (a string defaulting to Hello, World!) and logs this.data.message in init. Three entities give it a value, the default, and a custom message.',
  section: 'Introduction',
  tags: ['schema', 'string', 'this.data', 'registerComponent', 'init'],
  docs: ['repo/docs/introduction/writing-a-component.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
