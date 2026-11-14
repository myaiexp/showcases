// deck-gl example: styling a custom widget through className, style and CSS variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: className, style and CSS variables',
  summary:
    "A custom widget styled only by CSS that reads variables with fallbacks to the built-in theme variables. The app restyles one instance by passing CSS variables in the style prop and a class in className, and overrides --widget-margin; the base class applies both to the root element.",
  section: 'Custom widgets',
  tags: ['Widget', 'style', 'className', 'CSS variables', 'theme', 'setProps'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
    'repo/docs/api-reference/widgets/styling.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
