// d2 example: Link to another board
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Link to another board",
  summary:
    "`link: layers.cat` on a shape makes it open the cat board instead of an external page. In the full view the click renders that board; the card shows both boards in turn.",
  section: "Linking",
  tags: ["link", "layers", "internal link"],
  docs: [
    "repo/docs/tour/linking.md",
    "repo/static/bespoke-d2/cat.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
