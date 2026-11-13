// Timeline: one definition, each pre-defined theme chosen in frontmatter
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const BODY = `timeline
    title History of Social Media Platform
      2002 : LinkedIn
      2004 : Facebook : Google
      2005 : YouTube
      2006 : Twitter
      2007 : Tumblr
      2008 : Instagram
      2010 : Pinterest`;

// The theme key in frontmatter outranks the dark theme this gallery sets site-wide.
const themed = (theme: string): string => `---
config:
  theme: '${theme}'
---
${BODY}`;

// The docs list eleven themes; the first four are the v12 redux family.
const THEMES = [
  'redux-color',
  'redux-dark-color',
  'redux',
  'redux-dark',
  'default',
  'neutral',
  'dark',
  'forest',
  'neo',
  'neo-dark',
  'base',
] as const;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: THEMES.map((t) => ({ label: t, code: themed(t) })),
    interval: 2500,
  });

export default mount;
