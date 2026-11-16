// aframe example: Writing a component: multiple instances with log__helloworld and log__metaverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: multiple instances with log__helloworld and log__metaverse',
  summary:
    'Setting multiple: true lets one entity carry log__helloworld and log__metaverse; one emitted event reaches both and each reports its attrName and id. A button adds a third instance.',
  section: 'Introduction',
  tags: ['multiple', 'this.id', 'this.attrName', 'emit'],
  docs: ['repo/docs/introduction/writing-a-component.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
