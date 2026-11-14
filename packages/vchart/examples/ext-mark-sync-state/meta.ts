// vchart example: ExtensionMark syncState plugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ExtensionMark syncState plugin',
  summary:
    'With registerExtensionMarkSyncStatePlugin, extensionMarks marked syncState follow their bar\'s highlight, blur and selected states, so the dot and value above a hovered or selected bar react with it. The card drives the states from code with setHovered and setSelected.',
  section: 'Extensions',
  tags: ['syncState', 'registerExtensionMarkSyncStatePlugin', 'extensionMark', 'setHovered', 'setSelected', 'state'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/extension_mark_sync_state.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
