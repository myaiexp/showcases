// aframe example: link: the portal look, highlighted and peekMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "link: the portal look, highlighted and peekMode",
  summary: "The link component draws a portal with a 360 degree thumbnail, a title and a border. backgroundColor, borderColor and titleColor restyle it, highlighted switches the border to highlightedColor, and peekMode expands the preview image. Traversal is bound to a custom event that nothing emits, so clicking never leaves the example.",
  section: 'Components',
  tags: ["link", "visualAspectEnabled", "title", "image", "highlighted", "highlightedColor", "peekMode", "backgroundColor", "borderColor", "titleColor", "on"],
  docs: ["repo/docs/components/link.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
