// zephyr3d example: TextSprite: canvas text as a sprite
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextSprite: canvas text as a sprite',
  summary:
    'TextSprite draws its text into an offscreen texture with a canvas font string and shows it as a camera-facing sprite. text, font, resolutionX/Y, textColor and anchorX/anchorY are all live; each change redraws the texture.',
  section: 'Basic Framework',
  tags: ['TextSprite', 'text', 'font', 'resolutionX', 'resolutionY', 'textColor', 'anchorX', 'anchorY'],
  docs: ['repo/apps/doc/web/en/text-rendering.md', 'repo/apps/doc/src/tut-54/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
