// Timelines: sections group periods, TD turns the axis, disableMulticolor unifies the colors
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Sections color their periods together; <br> forces a line break inside an event.
const SECTIONS = `timeline
    title Timeline of Industrial Revolution
    section 17th-20th century
        Industry 1.0 : Machinery, Water power, Steam <br>power
        Industry 2.0 : Electricity, Internal combustion engine, Mass production
        Industry 3.0 : Electronics, Computers, Automation
    section 21st century
        Industry 4.0 : Internet, Robotics, Internet of Things
        Industry 5.0 : Artificial intelligence, Big data, 3D printing`;

// "timeline TD" runs the same data from the top down.
const TOP_DOWN = `timeline TD
    title Timeline of Industrial Revolution
    section 17th-20th century
        Industry 1.0 : Machinery, Water power, Steam <br>power
        Industry 2.0 : Electricity, Internal combustion engine, Mass production
        Industry 3.0 : Electronics, Computers, Automation
    section 21st century
        Industry 4.0 : Internet, Robotics, Internet of Things
        Industry 5.0 : Artificial intelligence, Big data, 3D printing`;

// Without sections each period gets its own colors (the default multicolor behaviour).
const MULTICOLOR = `timeline
    title History of Social Media Platform
      2002 : LinkedIn
      2004 : Facebook : Google
      2005 : YouTube
      2006 : Twitter`;

// disableMulticolor: true makes every period and event share one color scheme.
const SINGLE_COLOR = `---
config:
  theme: base
  timeline:
    disableMulticolor: true
---
timeline
    title History of Social Media Platform
      2002 : LinkedIn
      2004 : Facebook : Google
      2005 : YouTube
      2006 : Twitter`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Sections', code: SECTIONS },
      { label: 'Direction TD', code: TOP_DOWN },
      { label: 'Multicolor periods', code: MULTICOLOR },
      { label: 'disableMulticolor', code: SINGLE_COLOR },
    ],
  });

export default mount;
