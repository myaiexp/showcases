// leafer-ui example: Opacity: worldOpacity through nested elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opacity: worldOpacity through nested elements",
  summary: "worldOpacity is the element's opacity after every parent has been applied, and it reads 0 once visible is false. The readout shows the product while the Group fades.",
  section: "Appearance",
  tags: ["opacity","worldOpacity","visible","Group"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/opacity.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/visible.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
