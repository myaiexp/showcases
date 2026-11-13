// accTitle/accDescr on six more diagram types, with a readout of what ends up on the rendered SVG
import type { Mount } from '@/types.ts';
import { diagramBox } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

interface Kind {
  label: string;
  title: string;
  desc: string;
  /** Opening keyword line. */
  head: string;
  /** Diagram body after the accessibility lines. */
  body: string;
}

// The docs' samples for these types. The first four lines below each head are accTitle and accDescr.
const KINDS: Kind[] = [
  { label: 'Gantt', head: 'gantt', title: 'My Gantt Chart Accessibility Title', desc: 'My Gantt Chart Accessibility Description',
    body: `  title A Gantt Diagram
  dateFormat  YYYY-MM-DD
  section Section
  A task           :a1, 2014-01-01, 30d
  Another task     :after a1  , 20d
  section Another
  Task in sec      :2014-01-12  , 12d
  another task      : 24d` },
  { label: 'GitGraph', head: 'gitGraph', title: 'My GitGraph Accessibility Title', desc: 'My GitGraph Accessibility Description',
    body: `  commit
  commit
  branch develop
  checkout develop
  commit
  commit
  checkout main
  merge develop
  commit
  commit` },
  { label: 'Class', head: 'classDiagram', title: 'My Class Diagram', desc: 'My Class Diagram Description',
    body: '  Vehicle <|-- Car' },
  { label: 'ER', head: 'erDiagram', title: 'My Entity Relationship Diagram', desc: 'My Entity Relationship Diagram Description',
    body: `  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses` },
  { label: 'Requirement', head: 'requirementDiagram', title: 'My Requirement Diagram', desc: 'My Requirement Diagram Description',
    body: `  requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
  }
  element test_entity {
    type: simulation
  }
  test_entity - satisfies -> test_req` },
  { label: 'Journey', head: 'journey', title: 'My User Journey Diagram', desc: 'My User Journey Diagram Description',
    body: `  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 5: Me` },
];

/** accDescr: one line, or an accDescr { } block with two lines (the multi-line form). */
function build(k: Kind, multi: boolean): string {
  const desc = multi ? `  accDescr {\n    ${k.desc}.\n    A second line of description.\n  }` : `  accDescr: ${k.desc}`;
  return `${k.head}\n  accTitle: ${k.title}\n${desc}\n${k.body}`;
}

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let kind = KINDS[0]!;
  let multi = false;
  let ticket = 0;
  let timer = 0;
  let readout: HTMLElement | null = null;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      const { svg } = await renderInto(staging, build(kind, multi), signal, box);
      if (mine !== ticket || signal.aborted || !svg) return;
      box.replaceChildren(...staging.childNodes);
      if (!readout) return;
      // Read back from the SVG Mermaid produced, not from the source text.
      const rows: [string, string][] = [
        ['aria-roledescription', svg.getAttribute('aria-roledescription') ?? '(none)'],
        ['<title>', svg.querySelector(':scope > title')?.textContent ?? '(none)'],
        ['<desc>', (svg.querySelector(':scope > desc')?.textContent ?? '(none)').replace(/\s+/g, ' ').trim()],
      ];
      readout.replaceChildren(
        ...rows.flatMap(([k, v]) => {
          const dt = document.createElement('dt');
          dt.textContent = k;
          const dd = document.createElement('dd');
          dd.textContent = v;
          return [dt, dd];
        }),
      );
    } catch (err) {
      if (mine === ticket && !signal.aborted) box.textContent = err instanceof Error ? err.message : String(err);
    }
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      kind = KINDS[i++ % KINDS.length]!;
      void draw();
    };
    next();
    timer = window.setInterval(next, 2500);
    return () => {
      ticket++;
      clearInterval(timer);
    };
  }

  const tabs = document.createElement('div');
  tabs.className = 'mm-tabs';
  const buttons = KINDS.map((k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = k.label;
    b.addEventListener('click', () => {
      kind = k;
      for (const o of buttons) o.classList.toggle('active', o === b);
      void draw();
    });
    tabs.append(b);
    return b;
  });
  buttons[0]!.classList.add('active');
  const label = document.createElement('label');
  label.className = 'a11y-more-multi';
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.addEventListener('change', () => {
    multi = check.checked;
    void draw();
  });
  label.append(check, ' multi-line accDescr { } block');
  readout = document.createElement('dl');
  readout.className = 'a11y-more-readout';
  readout.setAttribute('aria-label', 'Attributes read from the rendered SVG');
  el.insertBefore(label, box);
  el.insertBefore(tabs, label);
  el.append(readout);
  void draw();
  return () => {
    ticket++;
  };
};

export default mount;
