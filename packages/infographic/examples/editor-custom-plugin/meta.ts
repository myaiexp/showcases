// AntV Infographic example: Editor: a custom plugin that logs the selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: a custom plugin that logs the selection",
  summary:
    "The editor page's custom plugin: a class extending Plugin with a name, an init that listens to the emitter's selection:change event, and a destroy that removes the listener. Click labels in the full view and the side panel logs the selection. The card selects labels from code and the caption reports each change.",
  section: "Editor",
  tags: ["Plugin", "IPlugin", "selection:change", "emitter"],
  docs: ["repo/site/src/content/learn/editor.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
