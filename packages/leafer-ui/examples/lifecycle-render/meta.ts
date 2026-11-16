// leafer-ui example: Lifecycle: from change to render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lifecycle: from change to render",
  summary:
    "A change flows through events: PropertyEvent when a value changes, then the layout events, then the render events. Moving the rect by assignment logs the sequence the engine emits.",
  section: "Advanced",
  tags: ['Leafer', 'PropertyEvent', 'LayoutEvent', 'RenderEvent', 'on'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/life/render.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
