// A timer appends one line at a time to a sequence definition and re-renders it
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// The header lines stay; every tick adds one more of the lines below.
const HEADER = `sequenceDiagram
    autonumber
    actor Customer
    participant Shop
    participant Bank
    participant Courier`;

const LINES = [
  'Customer->>+Shop: Place order',
  'Shop->>+Bank: Authorise payment',
  'Bank-->>-Shop: Approved',
  'Shop-->>-Customer: Order confirmed',
  'Note over Shop,Courier: Packing starts',
  'Shop-)Courier: Pick up parcel',
  'Courier->>Customer: Deliver parcel',
  'Customer-->>Shop: Thanks!',
];

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = statusLine(el);
  let shown = preview ? 4 : 1;
  let timer = 0;
  let busy = false;
  let stopped = false;

  // Renders the first `shown` lines; ticks are skipped while a render is still running.
  const draw = async (): Promise<void> => {
    busy = true;
    const staging = document.createElement('div');
    const code = `${HEADER}\n    ${LINES.slice(0, shown).join('\n    ')}`;
    try {
      await renderInto(staging, code, signal);
      if (stopped || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(`Message ${shown} of ${LINES.length}`);
    } catch (err) {
      if (!stopped && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  const tick = (): void => {
    if (busy) return;
    shown = shown >= LINES.length ? (preview ? 4 : 1) : shown + 1;
    void draw();
  };

  void draw();
  timer = window.setInterval(tick, preview ? 1800 : 1400);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
};

export default mount;
