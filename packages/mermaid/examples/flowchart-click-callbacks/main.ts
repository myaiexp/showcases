// click nodeId callback: with securityLevel 'loose' a node click calls a page function that fills a readout
import type { Mount } from '@/types.ts';
import { diagramBox } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid, renderInto } from '../../shared/setup.ts';

// Edge ids with animate give the card something moving; the click lines bind each stage to showStage.
const PIPELINE = `flowchart LR
    Intake e1@--> Review e2@--> Build e3@--> Ship
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    click Intake showStage "Where requests arrive"
    click Review showStage "A human reads the change"
    click Build call showStage() "Compile and test"
    click Ship call showStage() "Roll out to production"`;

const NOTES: Record<string, string> = {
  Intake: 'Intake: requests arrive and get an owner.',
  Review: 'Review: a person reads the change and signs off.',
  Build: 'Build: compile, test, package.',
  Ship: 'Ship: roll out in stages and watch the graphs.',
};

// Card version: same diagram without click lines (a card has no pointer and needs no loose mode).
const CARD = PIPELINE.split('\n').filter((l) => !l.trim().startsWith('click')).join('\n');

type Win = Window & { showStage?: (id: string) => void };

const mount: Mount = async (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  if (preview) {
    try {
      await renderInto(box, CARD, signal);
    } catch (err) {
      box.textContent = err instanceof Error ? err.message : String(err);
    }
    return () => {};
  }

  const readout = document.createElement('p');
  readout.className = 'mm-status';
  readout.textContent = 'Click a stage in the diagram.';
  el.append(readout);

  // The callback is looked up on window by name, and receives the node id.
  const win = window as Win;
  win.showStage = (id: string): void => {
    readout.textContent = NOTES[id] ?? id;
  };
  // click is disabled under the default 'strict' level, so raise it for this page only.
  mermaid.initialize({ ...BASE_CONFIG, securityLevel: 'loose' });
  try {
    await renderInto(box, PIPELINE, signal);
  } catch (err) {
    readout.textContent = err instanceof Error ? err.message : String(err);
    readout.classList.add('mm-error');
  }
  return () => {
    delete win.showStage;
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
