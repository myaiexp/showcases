// InnerEditor: a custom inner editor with a handle and a Done button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InnerEditor: a custom inner editor with a handle and a Done button",
  summary: "A subclass of InnerEditor, registered under a unique tag and bound to a Star class with setEditInner, opens on double-click: it adds a control point and a Done button that calls closeInnerEditor().",
  section: 'Graphic editor',
  tags: ["InnerEditor", "registerInnerEditor", "setEditInner", "closeInnerEditor", "onCreate", "onLoad", "onUpdate", "onUnload"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/InnerEditor.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editInner/register.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editInner/load.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editInner/use.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
