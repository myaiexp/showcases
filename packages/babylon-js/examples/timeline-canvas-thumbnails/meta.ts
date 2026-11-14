// babylon-js example: Timeline with canvas thumbnails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline with canvas thumbnails",
  summary:
    "The Timeline control shows a 60 second strip of thumbnails drawn on canvases, a Resizer sharing its WebGL context via getResizedTexture, a loading texture while each thumbnail is pending, and setCurrentTime and setVisibleDurationZoom for scrolling and zoom.",
  section: "2D Controls",
  tags: ['Timeline', 'Resizer', 'getResizedTexture', 'setCurrentTime', 'setVisibleDurationZoom', 'getThumbnailCallback'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/controls/timeline.md',
    'repo/content/features/featuresDeepDive/controls/resizer.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
