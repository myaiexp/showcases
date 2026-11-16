// leafer-ui example: Data: getPath with curve and pathForRender
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: getPath with curve and pathForRender",
  summary:
    "getPath(curve, pathForRender) returns the numeric path commands: curve rewrites every command as M, L, C or Z, pathForRender adds the corner radius. The rect's path changes as the flags flip.",
  section: "Data",
  tags: ["getPath","curve","pathForRender"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/getPath.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
