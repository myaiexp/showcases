// Timeline: cScale colours, multicolor on and off, and how long text wraps
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const SOCIAL = `timeline
    title History of Social Media Platform
      2002 : LinkedIn
      2004 : Facebook : Google
      2005 : YouTube
      2006 : Twitter
      2007 : Tumblr
      2008 : Instagram
      2010 : Pinterest`;

// Each period (no sections here) takes the next cScale colour; cScaleLabelN is that slot's text colour.
const SCALE = `---
config:
  theme: default
  themeVariables:
    cScale0: '#ff0000'
    cScaleLabel0: '#ffffff'
    cScale1: '#00ff00'
    cScale2: '#0000ff'
    cScaleLabel2: '#ffffff'
---
${SOCIAL}`;

// With disableMulticolor the whole timeline shares one colour scheme instead of one per period.
const SINGLE = `---
config:
  theme: base
  timeline:
    disableMulticolor: true
---
${SOCIAL}`;

// Sections take the colours instead: periods under one section share its cScale slot.
const SECTIONS = `---
config:
  theme: base
  themeVariables:
    cScale0: '#0e7490'
    cScale1: '#b45309'
    cScaleLabel0: '#ecfeff'
    cScaleLabel1: '#fffbeb'
---
timeline
    title Platform eras
    section Early web
      2002 : LinkedIn
      2004 : Facebook : Google
    section Video and microblogs
      2005 : YouTube
      2006 : Twitter`;

// Long text wraps on its own; <br> forces a break. The second event line (leading colon) adds
// another event to the same period.
const WRAP = `timeline
        title England's History Timeline
        section Stone Age
          7600 BC : Britain's oldest known house was built in Orkney, Scotland
          6000 BC : Sea levels rise and Britain becomes an island.<br> The people who live here are hunter-gatherers.
        section Bronze Age
          2300 BC : People arrive from Europe and settle in Britain. <br>They bring farming and metalworking.
                  : New styles of pottery and ways of burying the dead appear.
          2200 BC : The last major building works are completed at Stonehenge.<br> People now bury their dead in stone circles.
                  : The first metal objects are made in Britain.Some other nice things happen. it is a good time to be alive.`;

// <br> also works in section names, and continuation lines add events to a period.
const BREAKS = `timeline
        title MermaidChart 2023 Timeline
        section 2023 Q1 <br> Release Personal Tier
          Bullet 1 : sub-point 1a : sub-point 1b
               : sub-point 1c
          Bullet 2 : sub-point 2a : sub-point 2b
        section 2023 Q2 <br> Release XYZ Tier
          Bullet 3 : sub-point <br> 3a : sub-point 3b
               : sub-point 3c
          Bullet 4 : sub-point 4a : sub-point 4b`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'cScale colours', code: SCALE },
      { label: 'One colour scheme', code: SINGLE },
      { label: 'Section colours', code: SECTIONS },
      { label: 'Wrapping', code: WRAP },
      { label: 'Forced breaks', code: BREAKS },
    ],
  });

export default mount;
