// Cynefin diagrams: items in the five domains, transitions between them, and wavy-boundary config
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Items in every domain of an incident-response map.
const INCIDENT = `cynefin-beta
  title Incident Response

  complex
    "Investigate root cause"
    "Run chaos experiment"

  complicated
    "Analyze performance data"
    "Expert review needed"

  clear
    "Restart service"
    "Apply known fix"

  chaotic
    "Page on-call immediately"

  confusion
    "Unknown failure mode"`;

// Transitions arrow work from one domain to another, with an optional label.
const TRANSITIONS = `cynefin-beta
  title Strategy Categorization

  complex
    "Market research"

  complicated
    "Competitive analysis"

  clear
    "Standard pricing"

  chaotic
    "Crisis management"

  complex --> complicated : "Pattern identified"
  complicated --> clear : "Best practice codified"
  clear --> chaotic : "Complacency"
  chaotic --> complex : "Stabilized"`;

// boundaryAmplitude 0 straightens the boundaries; showDomainDescriptions false drops the subtitles.
const STRAIGHT = `---
config:
  cynefin:
    boundaryAmplitude: 0
    showDomainDescriptions: false
---
cynefin-beta
  title Straight boundaries

  complex
    "Adaptive work"
  complicated
    "Expert analysis"
  clear
    "Known procedure"
  chaotic
    "Crisis response"`;

// A big amplitude and a fixed non-zero seed give a wild but repeatable boundary.
const WAVY = `---
config:
  cynefin:
    boundaryAmplitude: 22
    seed: 7
---
cynefin-beta
  title Very wavy boundaries

  complex
    "Adaptive work"
  complicated
    "Expert analysis"
  clear
    "Known procedure"
  chaotic
    "Crisis response"`;

// With no items the domains alone make a worksheet template.
const EMPTY = `cynefin-beta
  title Cynefin Framework

  complex
  complicated
  clear
  chaotic`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Incident response', code: INCIDENT },
      { label: 'Transitions', code: TRANSITIONS },
      { label: 'Straight boundaries', code: STRAIGHT },
      { label: 'Wavy boundaries', code: WAVY },
      { label: 'Empty worksheet', code: EMPTY },
    ],
  });

export default mount;
