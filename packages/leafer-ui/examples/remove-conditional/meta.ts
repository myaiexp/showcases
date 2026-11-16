// leafer-ui example: Remove: by selector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Remove: by selector",
  summary:
    "With the find plugin, leafer.remove(\"#book\") finds elements like find() does and removes every match. The rect with id \"book\" is removed; the blue one stays.",
  section: "Basics",
  tags: ['Leafer.remove', 'id', 'find', '@leafer-in/find'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/remove.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
