// Motion: tiny animation library built on the Web Animations API
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Motion',
  npm: 'motion',
  tagline: 'A tiny, performant animation library built on the Web Animations API.',
  about:
    "Motion (formerly Motion One) wraps the browser's native Web Animations API with a friendly, powerful interface. Animations run off the main thread, so they stay smooth even when JS is busy. It is a fraction of the size of GSAP or Anime.js, supports spring physics out of the box, and has a stagger utility that makes sequenced animations trivial.",
  category: 'Animation',
  homepage: 'https://motion.dev',
  docsUrl: 'https://motion.dev/docs',
  repo: 'https://github.com/motiondivision/motion',
  added: '2026-03-03',
  sections: ['Basics'],
});
