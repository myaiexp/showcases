// Requirement diagrams: markdown in quoted text, style lines, classDef, default class and applying classes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Quotes allow markdown formatting in names, requirement text and docrefs.
const MARKDOWN = `requirementDiagram

requirement "__test_req__" {
    id: 1
    text: "*italicized text* **bold text**"
    risk: high
    verifymethod: test
}

element "**spec** doc" {
    type: "word doc"
    docref: "_reqs/spec_"
}

"**spec** doc" - satisfies -> "__test_req__"`;

// style takes a list of names and CSS-like properties and styles those nodes directly.
const DIRECT = `requirementDiagram

requirement test_req {
    id: 1
    text: styling example
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

style test_req fill:#ffa,stroke:#000, color: green
style test_entity fill:#f9f,stroke:#333, color: blue`;

// classDef declares reusable styles; class attaches them to a list of names, and ::: attaches
// them where a node is defined (one node at a time, but several classes).
const CLASSES = `requirementDiagram

requirement test_req:::important {
    id: 1
    text: "class styling example"
    risk: low
    verifymethod: test
}

requirement second_req {
    id: 2
    text: another one
    risk: medium
    verifymethod: analysis
}

element test_entity {
    type: simulation
}

classDef important fill:#f96,stroke:#333,stroke-width:4px
classDef test fill:#ffa,stroke:#000,color:#222
class second_req,test_entity test`;

// A class named default applies to every node; later classes and style lines override it.
const DEFAULT = `requirementDiagram

requirement test_req:::important {
    id: 1
    text: "default class example"
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

classDef default fill:#f9f,stroke:#333,stroke-width:4px,color:#111
classDef important fill:#f96,stroke:#333,stroke-width:4px,color:#111`;

// The docs' combined example: a class, class on an element, and a direct style on the same element.
const COMBINED = `requirementDiagram

requirement test_req:::important {
    id: 1
    text: "class styling example"
    risk: low
    verifymethod: test
}

element test_entity {
    type: simulation
}

classDef important font-weight:bold

class test_entity important
style test_entity fill:#f9f,stroke:#333`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Markdown text', code: MARKDOWN },
      { label: 'Direct styling', code: DIRECT },
      { label: 'classDef and class', code: CLASSES },
      { label: 'Default class', code: DEFAULT },
      { label: 'Combined', code: COMBINED },
    ],
  });

export default mount;
