// Cynefin: config block, theme variables and accessibility text on one team-decisions map
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const BODY = `cynefin-beta
  title Team decisions

  complex
    "New feature discovery"
    "Pricing experiment"

  complicated
    "Database migration plan"

  clear
    "Release checklist"

  chaotic
    "Outage with no cause yet"

  complex --> complicated : "Pattern found"
  clear --> chaotic : "Complacency"`;

// A fixed seed locks the wavy boundaries so the shape is the same on every render.
const SEEDED = `---
config:
  cynefin:
    seed: 7
---
${BODY}`;

// boundaryAmplitude: 0 turns the wavy boundaries into straight lines.
const STRAIGHT = `---
config:
  cynefin:
    boundaryAmplitude: 0
    seed: 1
---
${BODY}`;

// Wide, tight canvas with the domain subtitles switched off.
const COMPACT = `---
config:
  cynefin:
    width: 1000
    height: 520
    padding: 20
    showDomainDescriptions: false
    seed: 7
---
${BODY}`;

// themeVariables.cynefin recolours the domains, boundaries, cliff and arrows.
const THEMED = `---
config:
  cynefin:
    seed: 7
  themeVariables:
    cynefin:
      complexBg: "#3b0764"
      complicatedBg: "#1e3a8a"
      clearBg: "#14532d"
      chaoticBg: "#7f1d1d"
      confusionBg: "#334155"
      boundaryColor: "#e2e8f0"
      cliffColor: "#fb7185"
      cliffWidth: 4
      arrowColor: "#fde047"
      arrowWidth: 3
      labelColor: "#ffffff"
      textColor: "#f1f5f9"
      domainFontSize: "22px"
      itemFontSize: "15px"
---
${BODY}`;

// accTitle and accDescr become the SVG's title and description for screen readers.
const ACCESSIBLE = `---
config:
  cynefin:
    seed: 7
---
cynefin-beta
  accTitle: Cynefin framework for software delivery decisions
  accDescr: A Cynefin map categorizing software tasks by complexity domain

  complex
    "New feature discovery"

  complicated
    "Database migration plan"

  clear
    "Release checklist"

  chaotic
    "Outage with no cause yet"`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Fixed seed', code: SEEDED },
      { label: 'Straight boundaries', code: STRAIGHT },
      { label: 'Size and padding', code: COMPACT },
      { label: 'Theme variables', code: THEMED },
      { label: 'Accessibility', code: ACCESSIBLE },
    ],
  });

export default mount;
