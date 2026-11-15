// Relative imports: a path is relative to the importing file
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

// The files as D2.js's fs sees them: the entry file "index" at the root, x.d2 in a folder.
const files = {
  'd2-stuff/x.d2': `# This file is in d2-stuff/, so ../y means the y.d2 next to index
y: @../y`,
  'y.d2': `shape: hexagon
label: y.d2 (one folder up from x.d2)`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'index imports d2-stuff/x, which imports ../y', files, code: 'x: @d2-stuff/x\nx -> done' },
      { label: '@./y and @y name the same file', files, code: 'a: @./y\nb: @y\na -> b' },
    ],
  });
  return () => stage.dispose();
};

export default mount;
