// playcanvas example: Data asset types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data asset types',
  summary:
    "Besides textures and models, assets can be json, binary, text, css, html or shader files. Six small files are generated in code and loaded from blob URLs: the json resource decides the ring of spheres, the binary ArrayBuffer is read as floats for the bar heights, and the full view lists what each type's resource turns out to be.",
  section: 'Assets',
  tags: ['Asset', 'json', 'binary', 'text', 'css', 'html', 'shader', 'ArrayBuffer', 'AssetRegistry'],
  docs: [
    'repo/docs/user-manual/assets/supported-formats.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
