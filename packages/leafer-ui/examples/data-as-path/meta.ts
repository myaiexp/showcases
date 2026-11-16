// leafer-ui example: Data: asPath and pathInputed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: asPath and pathInputed",
  summary:
    "asPath() turns an element into path data (polygon.path = polygon.getPath()), after which its own properties such as sides no longer change the shape; path = null restores it. pathInputed reports the mode.",
  section: "Data",
  tags: ["asPath","pathInputed","path","Polygon"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/getPath.md',
    'pages/www-leaferjs-com/ui/en/reference/UI/path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
