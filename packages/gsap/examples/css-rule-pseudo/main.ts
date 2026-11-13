// CSSRulePlugin: tween the ::before and ::after rules of a class, which changes every element that uses it
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// CSSRulePlugin hands the work to CSSPlugin, so both are registered.
gsap.registerPlugin(CSSPlugin, CSSRulePlugin);

const mount: Mount = (el, { preview }) => {
  // This example's own CSS is nested under a scope selector, so the rule being tweened lives
  // in a <style> element created here, with a name no other stylesheet uses.
  const cls = `cssrule-${Math.random().toString(36).slice(2, 8)}`;
  const style = document.createElement('style');
  style.textContent = `
    .${cls} { display: inline-block; margin: 8px; padding: 10px 14px; border-radius: 8px; background: #2a2a2e; color: #ddd; font: 600 14px sans-serif; }
    .${cls}::before { content: "NEW "; color: #0ae448; font-size: 14px; }
    .${cls}::after { content: ""; display: block; height: 4px; width: 20%; margin-top: 6px; background-color: #ff8709; }
  `;
  document.head.append(style);

  const row = h('div', 'row');
  for (const word of ['alpha', 'beta', 'gamma']) h('span', cls, word, row);
  el.append(row);

  // getRule returns the style object for the exact selector, pseudo-element included.
  const before = CSSRulePlugin.getRule(`.${cls}::before`);
  const after = CSSRulePlugin.getRule(`.${cls}::after`);

  const ctx = gsap.context(() => {
    if (preview) {
      // Properties already defined in the rule tween from their real start value.
      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.2, ease: 'sine.inOut' } });
      tl.to(before, { cssRule: { color: '#f100cb', fontSize: 22 } }, 0);
      tl.to(after, { cssRule: { width: '100%', backgroundColor: '#00bae2' } }, 0);
    }
  }, el);

  let readout: HTMLElement | undefined;
  if (!preview) {
    const info = h('p', 'info', 'Three elements share one class. Each button tweens a rule, not an element, so all three change together. Note the rule has the values being tweened already defined; a property the rule never set would start from transparent or 0 (use fromTo then).');
    readout = h('code', 'readout', '');
    const bar = h('div', 'controls');
    const show = (): void => {
      readout!.textContent = `::before { ${before.cssText} }\n::after { ${after.cssText} }`;
    };
    const run = (rule: object, cssRule: object): void =>
      ctx.add(() => {
        gsap.to(rule, { duration: 1.2, ease: 'power2.inOut', cssRule, onUpdate: show, onComplete: show });
      });
    btn('::before to pink, bigger', () => run(before, { color: '#f100cb', fontSize: 24 }), bar);
    btn('::after grows', () => run(after, { width: '100%', backgroundColor: '#00bae2' }), bar);
    btn('Both back (fromTo)', () => ctx.add(() => {
      // fromTo states the start values, so nothing depends on the rule's current look
      gsap.fromTo(before, { cssRule: { color: '#f100cb', fontSize: 24 } }, { duration: 1, cssRule: { color: '#0ae448', fontSize: 14 }, onUpdate: show, onComplete: show });
      gsap.fromTo(after, { cssRule: { width: '100%', backgroundColor: '#00bae2' } }, { duration: 1, cssRule: { width: '20%', backgroundColor: '#ff8709' } });
    }), bar);
    el.append(info, bar, readout);
    show();
  }

  return () => {
    ctx.revert();
    style.remove();
  };
};

export default mount;
