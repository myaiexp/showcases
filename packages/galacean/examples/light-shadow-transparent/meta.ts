// galacean example: Transparent and alpha-cutout shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transparent and alpha-cutout shadows",
  summary:
    "Since 1.3 alpha-cutoff and transparent objects can cast shadows when enableTransparentShadow is on. A cut-out grille and a glass sphere throw shadows only while the switch is on.",
  section: "Light",
  tags: ['scene.enableTransparentShadow', 'alphaCutoff', 'isTransparent', 'renderFace'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
