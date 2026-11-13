// Swimlanes: each top-level subgraph is a lane, arrows across lanes are handoffs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Compact first variant for the card: three lanes, one chain, top to bottom.
const DELIVERY = `swimlane-beta TB
  subgraph Customer
    submit[Submit order]
    confirm[Confirm delivery]
  end

  subgraph Store
    check[Check order]
    pack[Pack items]
  end

  subgraph Carrier
    collect[Collect package]
    deliver[Deliver package]
  end

  submit --> check --> pack --> collect --> deliver --> confirm`;

// Labelled handoffs and a decision placed in the lane that owns it.
const SUPPORT = `swimlane-beta LR
  subgraph Customer
    request[Request service]
    receive[Receive update]
  end

  subgraph Support
    triage[Triage request]
    answer[Send answer]
  end

  subgraph Engineering
    investigate[Investigate issue]
    fix[Prepare fix]
  end

  request --> triage
  triage -->|Known issue| answer
  triage -->|Needs code change| investigate
  investigate --> fix --> answer
  answer --> receive`;

// A loop back to the applicant and shapes: decision diamond in the Reviewer lane.
const APPROVAL = `swimlane-beta LR
  subgraph Applicant
    apply[Submit application]
    sign[Sign agreement]
  end

  subgraph Reviewer
    screen[Screen application]
    decide{Approved?}
  end

  subgraph System
    create[Create account]
    notify[Send welcome email]
  end

  apply -->|Application received| screen
  screen --> decide
  decide -->|Approved| create --> notify --> sign
  decide -->|Needs changes| apply`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Delivery', code: DELIVERY },
      { label: 'Support escalation', code: SUPPORT },
      { label: 'Approval loop', code: APPROVAL },
    ],
    interval: 4500,
  });

export default mount;
