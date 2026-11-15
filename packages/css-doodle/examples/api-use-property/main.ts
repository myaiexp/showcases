// Doodle.use = 'var(--rule)' switches between rules kept in custom properties
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// Three sets of rules stored as custom properties on the page (here on the stage).
// The parentheses make each one a valid custom property value despite its semicolons.
const RULES: Record<string, string> = {
  '--rule-dots': '(background: #e76f51; border-radius: 50%; scale: @r(.3, .9);)',
  '--rule-bars': '(background: #2a9d8f; scale: 1 @r(.2, 1);)',
  '--rule-leaves': '(background: #e9c46a; border-radius: @p(100% 0, 0 100%);)',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  for (const [name, rule] of Object.entries(RULES)) stage.root.style.setProperty(name, rule);

  // The element's own code sets the grid; use adds the rest.
  const doodle = stage.doodle(`@grid: 7 / 100% / #1d1d1d _3px;`, { attrs: { use: 'var(--rule-dots)' } });
  const set = (name: string): void => {
    doodle.use = `var(${name})`; // re-renders with the new rules
    stage.say(`doodle.use = 'var(${name})'`);
  };
  const names = Object.keys(RULES);
  if (stage.bar) for (const n of names) button(stage.bar, n, () => set(n));
  else {
    let i = 0;
    stage.every(2000, () => set(names[(i = (i + 1) % names.length)]!));
  }
  stage.say(`doodle.use is ${JSON.stringify(doodle.use)}`);
  return () => stage.dispose();
};

export default mount;
