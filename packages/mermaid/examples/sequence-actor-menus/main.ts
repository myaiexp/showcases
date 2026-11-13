// Actor popup menus from link and links lines; securityLevel loose opens them, forceMenus holds them open for cards
import type { Mount } from '@/types.ts';
import { playground, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid } from '../../shared/setup.ts';

// `link <actor>: <label> @ <url>`: one line per menu entry. Click an actor box to open its menu.
const LINK = `sequenceDiagram
    participant Alice
    participant John
    link Alice: Docs @ https://mermaid.js.org/intro/
    link Alice: Syntax @ https://mermaid.js.org/syntax/sequenceDiagram.html
    link John: Docs @ https://mermaid.js.org/intro/
    link John: Usage @ https://mermaid.js.org/config/usage.html
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`;

// Advanced syntax: `links <actor>: {JSON}` with label/URL pairs, one line per actor.
const LINKS = `sequenceDiagram
    participant Alice
    participant John
    links Alice: {"Docs": "https://mermaid.js.org/intro/", "Syntax": "https://mermaid.js.org/syntax/sequenceDiagram.html"}
    links John: {"Docs": "https://mermaid.js.org/intro/", "Usage": "https://mermaid.js.org/config/usage.html"}
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`;

// A service diagram where each service has a few useful pages in its menu.
const SERVICES = `sequenceDiagram
    participant Web as Web app
    participant Api as Orders API
    link Web: Dashboard @ https://mermaid.js.org/intro/
    link Web: Repo @ https://github.com/mermaid-js/mermaid
    links Api: {"Health": "https://mermaid.js.org/config/usage.html", "Wiki": "https://mermaid.js.org/intro/"}
    Web->>Api: POST /orders
    Api-->>Web: 201 Created`;

// forceMenus under sequence: in frontmatter draws every menu already open (the config
// type describes it as meant for end-to-end tests), which also makes a static picture.
const forced = (code: string): string => `---\nconfig:\n  sequence:\n    forceMenus: true\n---\n${code}`;

const mount: Mount = (el, ctx) => {
  if (ctx.preview) {
    return playground(el, ctx, {
      variants: [
        { label: 'link', code: forced(LINK) },
        { label: 'links', code: forced(LINKS) },
        { label: 'Services', code: forced(SERVICES) },
      ],
    });
  }
  // The click that opens a menu is an inline onclick on the actor box. Mermaid's sanitiser
  // strips it at the default 'strict' level (the menu is then in the SVG but never opens),
  // so this page raises securityLevel to 'loose' and restores it on cleanup.
  mermaid.initialize({ ...BASE_CONFIG, securityLevel: 'loose' });
  const stop = playground(el, ctx, {
    variants: [
      { label: 'link lines', code: LINK },
      { label: 'links with JSON', code: LINKS },
      { label: 'Several services', code: SERVICES },
      { label: 'forceMenus', code: forced(LINK) },
    ],
  });
  statusLine(el)('Click an actor box to open its menu; the entries open in a new tab.');
  return () => {
    stop();
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
