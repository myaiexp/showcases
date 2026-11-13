// Class diagram link / callback / click lines with tooltips; securityLevel loose raised for the full view and restored
import type { Mount } from '@/types.ts';
import { playground, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid } from '../../shared/setup.ts';

// `link <class> "url" "tooltip"` opens a URL in a new tab; `callback <class> "fn" "tooltip"` calls a page function.
// The actions are written on separate lines after every class is declared.
const ACTIONS = `classDiagram
    class Shape
    class Circle
    class Square
    Shape <|-- Circle
    Shape <|-- Square
    link Shape "https://mermaid.js.org/syntax/classDiagram.html" "Open the class diagram docs"
    callback Circle "classCallback" "A callback on Circle"
    callback Square "classCallback" "A callback on Square"`;

// The click forms: click <class> href "url" "tooltip" and click <class> call fn() "tooltip".
const CLICK = `classDiagram
    class Duck
    class Fish
    class Zebra
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    click Animal href "https://mermaid.js.org/syntax/classDiagram.html" "Docs for this diagram type"
    click Duck call classCallback() "Calls the page function"
    click Fish call classCallback() "Fish tooltip"`;

// Tooltips are optional; the reference alone is enough.
const NO_TIPS = `classDiagram
    class Order
    class Invoice
    Order --> Invoice
    link Order "https://mermaid.js.org/intro/"
    callback Invoice "classCallback"`;

const VARIANTS = [
  { label: 'link and callback', code: ACTIONS },
  { label: 'click href / call', code: CLICK },
  { label: 'Without tooltips', code: NO_TIPS },
];

// A card has no pointer, so it gets the diagrams without the action lines.
const ACTION_LINE = /^\s*(link|callback|click)\s/;
const stripped = (code: string): string => code.split('\n').filter((l) => !ACTION_LINE.test(l)).join('\n');

type Win = Window & { classCallback?: (id?: string) => void };

const mount: Mount = (el, ctx) => {
  if (ctx.preview) {
    return playground(el, ctx, { variants: VARIANTS.map((v) => ({ ...v, code: stripped(v.code) })) });
  }
  // These actions are disabled at the default 'strict' level (classDiagram.md § Interaction).
  mermaid.initialize({ ...BASE_CONFIG, securityLevel: 'loose' });
  const win = window as Win;
  const stop = playground(el, ctx, { variants: VARIANTS });
  const readout = statusLine(el);
  readout('Hover a class for its tooltip; click one to follow the link or run the callback.');
  // The callback is looked up on window by name and receives the class id.
  win.classCallback = (id?: string): void => {
    readout(id ? `Callback called with class id "${id}".` : 'Callback called with no arguments.');
  };
  return () => {
    stop();
    delete win.classCallback;
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
