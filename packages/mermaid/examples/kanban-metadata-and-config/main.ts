// Kanban: each metadata key alone, the four priority levels, ticketBaseUrl links and a full board
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// priority takes exactly four values; each one gets its own colour stripe on the card.
const PRIORITY = `kanban
  todo[Priorities]
    p1[Server is down]@{ priority: 'Very High' }
    p2[Slow checkout]@{ priority: 'High' }
    p3[Tidy the settings page]@{ priority: 'Low' }
    p4[Rename a variable]@{ priority: 'Very Low' }`;

// assigned names who owns the card and ticket shows the issue id; either can stand alone.
const OWNERS = `kanban
  doing[In progress]
    a1[Only an owner]@{ assigned: 'ana' }
    a2[Only a ticket]@{ ticket: SH-204 }
    a3[Both]@{ ticket: SH-205, assigned: 'ben' }
    a4[No metadata at all]`;

// ticketBaseUrl turns every ticket into a link; #TICKET# is replaced by the card's ticket value.
const LINKS = `---
config:
  kanban:
    ticketBaseUrl: 'https://tracker.example.com/browse/#TICKET#'
---
kanban
  todo[Todo]
    t1[Fix login redirect]@{ ticket: WEB-17, priority: 'High' }
  doing[Doing]
    t2[Cache the catalogue]@{ ticket: WEB-21, assigned: 'cy' }
  done[Done]
    t3[Upgrade the build]@{ ticket: WEB-9, assigned: 'dee', priority: 'Low' }`;

// The docs' full board: seven columns, long card text that wraps, and every key together.
const FULL = `---
config:
  kanban:
    ticketBaseUrl: 'https://mermaidchart.atlassian.net/browse/#TICKET#'
---
kanban
  Todo
    [Create Documentation]
    docs[Create Blog about the new diagram]
  [In progress]
    id6[Create renderer so that it works in all cases. We also add some extra text here for testing purposes. And some more just for the extra flare.]
  id9[Ready for deploy]
    id8[Design grammar]@{ assigned: 'knsv' }
  id10[Ready for test]
    id4[Create parsing tests]@{ ticket: MC-2038, assigned: 'K.Sveidqvist', priority: 'High' }
    id66[last item]@{ priority: 'Very Low', assigned: 'knsv' }
  id11[Done]
    id5[define getData]
    id2[Title of diagram is more than 100 chars when user duplicates diagram with 100 char]@{ ticket: MC-2036, priority: 'Very High'}
    id3[Update DB function]@{ ticket: MC-2037, assigned: knsv, priority: 'High' }

  id12[Can't reproduce]
    id3[Weird flickering in Firefox]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Priority levels', code: PRIORITY },
      { label: 'Owner and ticket', code: OWNERS },
      { label: 'ticketBaseUrl links', code: LINKS },
      { label: 'Full board', code: FULL },
    ],
  });

export default mount;
