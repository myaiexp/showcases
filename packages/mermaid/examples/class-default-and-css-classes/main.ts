// Class styling routes: classDef default, cssClass lists, ::: with a body, and page CSS keyed to a class name
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import './style.css';

// A class named default applies to every node; later classes override it.
const DEFAULT = `classDiagram
  class Animal:::pink
  class Mineral

  classDef default fill:#f96,color:red
  classDef pink color:#f9f`;

// cssClass "id1,id2" name attaches a class to several nodes in one statement.
const CSS_CLASS = `classDiagram
  class Cat
  class Dog
  class Fish
  class Rock
  Animal <|-- Cat
  Animal <|-- Dog
  Animal <|-- Fish

  classDef furry fill:#fde68a,stroke:#b45309,color:#222
  classDef stone fill:#cbd5e1,stroke:#475569,stroke-width:3px,color:#222
  cssClass "Cat,Dog" furry
  cssClass "Rock" stone`;

// The ::: shorthand works on a class with a body as well as on a bare one.
const SHORTHAND = `classDiagram
  class Animal:::someclass {
      -int sizeInFeet
      -canEat()
  }
  class Plant:::other {
      -grow()
  }
  classDef someclass fill:#f96,color:#222,stroke-width:3px
  classDef other fill:#86efac,color:#222`;

// A class name can also be styled by a rule in the page's own CSS (style.css in this folder).
// classDiagram.md § CSS Classes shows the rule `.styleClass > * > g`; in 12.3.0 the node's
// first child holds paths, not a g, so this example targets `.styleClass path` with !important.
// The ::: shorthand cannot be combined with a relation statement, so the class is alone.
const PAGE_CSS = `classDiagram
    class Animal:::styleClass`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'classDef default', code: DEFAULT },
      { label: 'cssClass lists', code: CSS_CLASS },
      { label: '::: with members', code: SHORTHAND },
      { label: 'Page CSS', code: PAGE_CSS },
    ],
  });

export default mount;
