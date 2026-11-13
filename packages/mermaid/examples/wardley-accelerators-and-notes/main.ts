// Wardley maps: notes, accelerators and numbered annotations layered onto one platform map
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const CHAIN = `component Customer App [0.85, 0.75]
component API Gateway [0.65, 0.60]
component Auth [0.50, 0.50]
component Database [0.35, 0.45]
component Cloud Platform [0.15, 0.90]

Customer App -> API Gateway
API Gateway -> Auth
API Gateway -> Database
Database -> Cloud Platform`;

// The bare chain first, so each variant below shows what one kind of annotation adds.
const BASE = `wardley-beta
title Platform map

${CHAIN}`;

// note "text" [visibility, evolution] floats free text at a coordinate; the text must be quoted.
const NOTES = `wardley-beta
title Notes

${CHAIN}

note "Rewrite planned for next year" [0.72, 0.30]
note "Commodity: do not build" [0.25, 0.80]`;

// accelerator and deaccelerator mark forces pushing evolution faster or holding it back.
const FORCES = `wardley-beta
title Forces on evolution

${CHAIN}

accelerator "Managed databases" [0.40, 0.65]
deaccelerator "Compliance rules" [0.55, 0.30]`;

// annotations [x, y] positions the key; each annotation N,[v, e] "text" drops a numbered marker on the map.
const NUMBERED = `wardley-beta
title Numbered annotations

${CHAIN}

annotations [0.10, 0.10]
annotation 1,[0.65, 0.55] "Single point of entry"
annotation 2,[0.50, 0.45] "Bought, not built"
annotation 3,[0.35, 0.40] "Backups untested"`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Bare map', code: BASE },
      { label: 'Notes', code: NOTES },
      { label: 'Accelerators', code: FORCES },
      { label: 'Numbered annotations', code: NUMBERED },
    ],
  });

export default mount;
