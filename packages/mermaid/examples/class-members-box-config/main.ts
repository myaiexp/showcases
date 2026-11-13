// class: hideEmptyMembersBox in frontmatter: classes without members lose their empty compartment
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const DIAGRAM = `classDiagram
  class Duck
  class Fish
  class Animal {
    +int age
    +isMammal()
  }
  Animal <|-- Duck
  Animal <|-- Fish`;

// Default (false): every class box has a members compartment, even when it is empty.
const SHOWN = `---
config:
  class:
    hideEmptyMembersBox: false
---
${DIAGRAM}`;

// true: Duck and Fish shrink to the name header; Animal keeps its members.
const HIDDEN = `---
  config:
    class:
      hideEmptyMembersBox: true
---
${DIAGRAM}`;

// The docs' own example: one class and nothing else, with the box hidden.
const SINGLE = `---
  config:
    class:
      hideEmptyMembersBox: true
---
classDiagram
  class Duck`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'false (default)', code: SHOWN },
      { label: 'true', code: HIDDEN },
      { label: 'Single class', code: SINGLE },
    ],
  });

export default mount;
