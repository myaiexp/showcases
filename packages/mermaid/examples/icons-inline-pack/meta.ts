// mermaid example: inline icon pack with no network
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Inline icon pack with no network",
  summary:
    "registerIconPacks takes an Iconify JSON object directly, so custom icons need no fetch; used in an architecture diagram and a TreeView.",
  section: "Icons",
  tags: ["icons","registerIconPacks","architecture","treeView"],
  docs: ["repo/packages/mermaid/src/docs/config/icons.md","repo/packages/mermaid/src/docs/syntax/architecture.md","repo/packages/mermaid/src/docs/syntax/treeView.md","repo/docs/config/setup/mermaid/interfaces/SyncIconLoader.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
