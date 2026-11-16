// aframe example: <a-link>: portals with a 360° preview, a title and a highlight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-link>: portals with a 360° preview, a title and a highlight',
  summary:
    '<a-link> is the link component with its portal look turned on: href, title and image map to link properties, and the image is a 360° preview inside the portal. A timer cycles highlighted across the portals, a checkbox turns on peekMode, which spreads the preview around the camera, and clicking a portal sets window.location to its href.',
  section: 'Primitives',
  tags: ['a-link', 'link', 'href', 'title', 'image', 'highlighted', 'peekMode', 'visualAspectEnabled'],
  docs: ['repo/docs/primitives/a-link.md', 'repo/docs/components/link.md', 'repo/docs/components/cursor.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
