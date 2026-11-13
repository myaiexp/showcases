// Use case diagrams: colour by role, colorScheme rotate, theme variables and the usecase config block
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const BODY = `usecase-beta
direction LR
actor Customer
actor Auditor
systemBoundary Catalogue
  Browse("Browse catalogue")
end
systemBoundary Payment
  Checkout("Checkout")
end
Customer --> Browse
Browse --> Checkout
Auditor --> Checkout
Checkout ..> : include Browse`;

// Default colour scheme (role): all actors share one colour, all use cases another, and each
// boundary takes the next slot of the theme palette. redux-color carries that palette.
const ROLE = `---
config:
  theme: redux-color
---
${BODY}`;

// colorScheme: rotate gives every actor and use case its own palette slot.
const ROTATE = `---
config:
  theme: redux-color
  usecase:
    colorScheme: rotate
---
${BODY}`;

// Theme variables recolour each role directly, including the include and extend line strokes.
const VARIABLES = `---
config:
  theme: base
  themeVariables:
    usecaseActorBkg: "#fde68a"
    usecaseActorBorder: "#f59e0b"
    usecaseBkg: "#1e3a8a"
    usecaseBorder: "#60a5fa"
    usecaseBoundaryBkg: "#0f172a"
    usecaseBoundaryBorder: "#64748b"
    usecaseIncludeLine: "#4ade80"
    usecaseExtendLine: "#f472b6"
    primaryTextColor: "#f8fafc"
---
${BODY}`;

// Config keys: font sizes and weights, spacing and padding.
const CONFIG = `---
config:
  usecase:
    actorFontSize: 18
    actorFontWeight: bold
    usecaseFontSize: 15
    nodeSpacing: 80
    rankSpacing: 90
    diagramPadding: 30
---
${BODY}`;

// Classes and direct styles beat both colour schemes for the properties they set.
const OVERRIDE = `---
config:
  theme: redux-color
  usecase:
    colorScheme: rotate
---
${BODY}
classDef critical stroke:#ef4444,stroke-width:4px
class Checkout critical
style Auditor stroke-dasharray:4`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'By role', code: ROLE },
      { label: 'Rotate', code: ROTATE },
      { label: 'Theme variables', code: VARIABLES },
      { label: 'Config keys', code: CONFIG },
      { label: 'Class overrides', code: OVERRIDE },
    ],
  });

export default mount;
