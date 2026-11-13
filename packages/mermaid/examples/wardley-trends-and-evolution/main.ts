// Wardley maps: evolve arrows and the link operators in turn
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// evolve draws a red dashed arrow from a component's position to a new evolution value on the same row.
const EVOLVE = `wardley-beta
title Evolution arrows

component Database [0.40, 0.50]
component API [0.55, 0.60]
component Cache [0.25, 0.30]

API -> Database
Database -> Cache

evolve Database 0.75
evolve API 0.80
evolve Cache 0.55`;

// "->" and "-->" are plain dependencies; "; text" annotates one.
const DEPENDENCIES = `wardley-beta
title Dependencies

component Checkout [0.85, 0.70]
component Payments [0.60, 0.65]
component Ledger [0.35, 0.45]
component Fraud Check [0.55, 0.35]

Checkout -> Payments; needs a provider
Payments --> Ledger
Payments -> Fraud Check; third party`;

// Flow operators: -.-> dashed, +> arrow, +< reverse, +<> both ways, +'text'> labelled.
const FLOWS = `wardley-beta
title Flow links

component Sensor [0.20, 0.30]
component Gateway [0.45, 0.50]
component Dashboard [0.80, 0.70]
component Archive [0.20, 0.85]
component Alerts [0.65, 0.35]

Sensor +> Gateway
Gateway +<> Dashboard
Dashboard +< Alerts
Gateway -.-> Alerts
Gateway +'nightly'> Archive`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Evolution arrows', code: EVOLVE },
      { label: 'Dependencies', code: DEPENDENCIES },
      { label: 'Flow links', code: FLOWS },
    ],
  });

export default mount;
