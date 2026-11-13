// ZenUML sequence syntax: sync calls with nested blocks, replies, and if/par/try fragments
import zenuml from '@mermaid-js/mermaid-zenuml';
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';

// ZenUML is not bundled with mermaid: register the package as an external diagram once
// for the page (zenuml.md § Integrating with your library/website).
const registered = mermaid.registerExternalDiagrams([zenuml]);

// Annotators pick a participant's symbol; `as` gives it a short alias; -> is an async message.
const PARTICIPANTS = `zenuml
    title Checkout
    @Actor C as Customer
    Web
    @Database DB
    C->Web: Place order
    Web->DB: Save order
    Web->C: Order confirmed`;

// Sync calls nest with {}; replies come from an assignment or a return; new creates an object.
const NESTING = `zenuml
    title Sync calls and replies
    Client->OrderService.place(cart) {
      new Order(cart)
      total = PriceService.quote(cart)
      PaymentService.charge(total) {
        // **Markdown** comments render above the message
        return receipt
      }
      return orderId
    }`;

// if / else and opt fragments.
const ALT = `zenuml
    title Alt and opt
    Client->Inventory.reserve(item) {
      if(in_stock) {
        return reserved
      } else {
        Inventory->Supplier: Reorder item
        return backordered
      }
    }
    opt {
      Inventory->Client: Notify when shipped
    }`;

// par runs messages side by side; try / catch / finally models a failure path.
const PAR_TRY = `zenuml
    title Parallel and try/catch
    par {
      API->Mailer: Send receipt
      API->Analytics: Track purchase
    }
    try {
      API->Ledger: Post entry
    } catch {
      API->Ops: Page on-call
    } finally {
      API->Audit: Log outcome
    }`;

const mount: Mount = async (el, ctx) => {
  await registered;
  return playground(el, ctx, {
    variants: [
      { label: 'Participants', code: PARTICIPANTS },
      { label: 'Nesting and replies', code: NESTING },
      { label: 'Alt and opt', code: ALT },
      { label: 'Par and try/catch', code: PAR_TRY },
    ],
  });
};

export default mount;
