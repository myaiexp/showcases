// GSAP: the industry-standard JavaScript animation engine
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'GSAP',
  npm: 'gsap',
  tagline: 'The industry-standard animation engine with timelines, easing and scriptable tweens.',
  about:
    "GSAP (GreenSock Animation Platform) is the tool the web's most impressive sites reach for. Unlike CSS transitions, it gives you precise, scriptable control: sequence dozens of animations on a timeline, scrub them back and forth, and choose from a deep library of eases that make motion feel physical. It is framework-agnostic, battle-tested for over a decade, and as of v3.13 the full toolkit, including the former Club plugins (SplitText, MorphSVG, ScrollSmoother, Inertia and more), is free on npm.",
  category: 'Animation',
  homepage: 'https://gsap.com',
  docsUrl: 'https://gsap.com/docs/v3/',
  repo: 'https://github.com/greensock/GSAP',
  added: '2026-06-14',
  // Core (docs/v3/GSAP) first, then the plugin groups in the docs overview's order
  // (Scroll, Text, SVG, Other), then Eases, the Helper functions chapter and the
  // gsap.com/resources guides.
  sections: [
    'Getting started',
    'Tweens',
    'Timelines',
    'gsap methods',
    'Utility methods',
    'Core plugins',
    'ScrollTrigger',
    'ScrollSmoother',
    'ScrollTo',
    'Observer',
    'SplitText',
    'ScrambleText',
    'Text',
    'DrawSVG',
    'MorphSVG',
    'MotionPath',
    'Flip',
    'Draggable',
    'Inertia',
    'Physics',
    'GSDevTools',
    'CSSRule',
    'Easel',
    'Pixi',
    'Eases',
    'Custom eases',
    'Helper functions',
    'Resources',
  ],
});
