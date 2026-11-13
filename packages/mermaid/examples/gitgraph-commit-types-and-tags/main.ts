// GitGraph commit attributes: id, type (NORMAL, REVERSE, HIGHLIGHT) and tag, alone and combined
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// id: "..." replaces the generated commit id with your own text.
const IDS = `gitGraph
   commit id: "Alpha"
   commit id: "Beta"
   commit id: "Gamma"`;

// type sets the look: NORMAL is a solid circle, REVERSE a crossed circle, HIGHLIGHT a filled rectangle.
const TYPES = `gitGraph
   commit id: "Normal"
   commit
   commit id: "Reverse" type: REVERSE
   commit
   commit id: "Highlight" type: HIGHLIGHT
   commit`;

// tag: "..." decorates a commit like a release version.
const TAGS = `gitGraph
   commit
   commit id: "Release" tag: "v1.0.0"
   commit
   commit id: "Hotfix" tag: "v1.0.1"
   commit`;

// id, type and tag mix freely on one commit.
const COMBINED = `gitGraph
   commit
   commit id: "Normal" tag: "v1.0.0"
   commit
   commit id: "Reverse" type: REVERSE tag: "RC_1"
   commit
   commit id: "Highlight" type: HIGHLIGHT tag: "8.8.4"
   commit`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Custom ids', code: IDS },
      { label: 'Commit types', code: TYPES },
      { label: 'Tags', code: TAGS },
      { label: 'All together', code: COMBINED },
    ],
  });

export default mount;
