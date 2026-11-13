// Renders user journeys: sections of scored steps, each done by one or more actors
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Syntax: `Task name: <score 1-5>: <comma separated actors>`, grouped by `section`.
const WORKING_DAY = `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`;

// Several actors share steps; low scores mark where the experience hurts.
const CHECKOUT = `journey
    title Buying a train ticket online
    section Find a train
      Search timetable: 4: Traveller
      Compare fares: 3: Traveller
    section Pay
      Create an account: 1: Traveller
      Enter card details: 2: Traveller, Bank
      Confirm payment: 3: Traveller, Bank
    section Travel
      Receive e-ticket: 5: Traveller, Conductor
      Board the train: 5: Traveller, Conductor`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'My working day', code: WORKING_DAY },
      { label: 'Ticket checkout', code: CHECKOUT },
    ],
  });

export default mount;
