// gsap example: CSSRulePlugin.getRule on ::before and ::after, tweened with cssRule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSSRule pseudo-element',
  summary:
    'Three badges share one class. CSSRulePlugin.getRule() finds the ::before and ::after rules, and tweens through cssRule change colour, size and width on all of them at once, something an element-level tween cannot reach.',
  section: 'CSSRule',
  tags: ['CSSRulePlugin', 'getRule', 'cssRule', 'pseudo-element', '::before'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/CSSRulePlugin.md',
    'pages/gsap-com/docs/v3/Plugins/CSSRulePlugin/methods/static-getRule-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
