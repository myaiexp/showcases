// A timer walks a traffic-light state machine, moving a classDef onto the current state
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// The definition is rebuilt each step with `class <state> current` pointing at the active state.
// Sample of one step (the generated code looks like this):
export const SAMPLE = `stateDiagram
    direction LR
    classDef current fill:#2e7d32,color:white,font-weight:bold,stroke-width:3px,stroke:yellow
    [*] --> Red
    Red --> RedAmber : timer
    RedAmber --> Green : timer
    Green --> Amber : timer
    Amber --> Red : timer
    class Green current`;

const STATES = ['Red', 'RedAmber', 'Green', 'Amber'];

const definition = (current: string): string => `stateDiagram
    direction LR
    classDef current fill:#2e7d32,color:white,font-weight:bold,stroke-width:3px,stroke:yellow
    [*] --> Red
    Red --> RedAmber : timer
    RedAmber --> Green : timer
    Green --> Amber : timer
    Amber --> Red : timer
    class ${current} current`;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = statusLine(el);
  let step = 0;
  let timer = 0;
  let busy = false;
  let stopped = false;

  const draw = async (): Promise<void> => {
    busy = true;
    const current = STATES[step % STATES.length]!;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, definition(current), signal);
      if (stopped || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(`Current state: ${current}`);
    } catch (err) {
      if (!stopped && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  void draw();
  timer = window.setInterval(() => {
    if (busy) return;
    step++;
    void draw();
  }, 1500);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
};

export default mount;
