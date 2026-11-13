// Registering a plugin object with gsap.registerPlugin(), then using its vars key in tweens
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { counterPlugin } from './plugin.ts';
import './style.css';

// Register once, before the first tween that uses it.
gsap.registerPlugin(counterPlugin);

const STATS = [
  { label: 'Revenue', start: '$0', vars: { to: 12840, prefix: '$' } },
  { label: 'Pi', start: '0.00000', vars: { to: Math.PI, decimals: 5 } },
  { label: 'Uptime', start: '90.0%', vars: { to: 99.9, decimals: 1, suffix: '%' } },
];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const cards = STATS.map((s) => {
    const card = document.createElement('div');
    card.className = 'card';
    const num = document.createElement('div');
    num.className = 'num';
    num.textContent = s.start;
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = s.label;
    card.append(num, label);
    root.append(card);
    return num;
  });
  const info = document.createElement('p');
  info.className = 'info';
  info.textContent = `counterTo plugin, running on GSAP ${gsap.version}`;
  root.append(info);
  el.append(root);

  const ctx = gsap.context(() => {
    STATS.forEach((s, i) => {
      // counterTo is not a CSS property: the registered plugin picks it up and animates it
      gsap.to(cards[i] as HTMLElement, {
        counterTo: s.vars,
        duration: 2.2,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 1,
        delay: i * 0.25,
      });
    });
  }, el);

  return () => ctx.revert();
};

export default mount;
