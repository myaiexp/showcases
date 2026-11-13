// Class diagrams: namespaces, notes, direction and style / classDef styling
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A labelled namespace and a dotted nested one; relationships cross the boundaries.
const NAMESPACES = `classDiagram
    namespace Auth["Authentication Service"] {
        class UserService {
            +login()
            +logout()
        }
    }
    namespace Company.Engineering.Backend {
        class Developer {
            +writeCode()
        }
    }
    namespace Company.Engineering {
        class TechLead {
            +planSprint()
        }
    }
    TechLead --> Developer : leads
    Developer --> UserService : calls`;

// note and note for, plus direction RL.
const NOTES = `classDiagram
    direction RL
    note "Pets and their owners"
    class Student {
      -idCard : IdCard
    }
    class IdCard {
      -id : int
      -name : string
    }
    note for IdCard "Issued once per student"
    Student "1" --o "1" IdCard : carries`;

// style for one node, classDef + ::: for reuse, and a default class for everything else.
const STYLING = `classDiagram
  class Animal:::pink
  class Mineral
  class Plant:::green {
    -int height
    -grow()
  }
  classDef default fill:#f96,color:#222
  classDef pink fill:#f9f,color:#222
  classDef green fill:#8d8,stroke:#363,stroke-width:3px,color:#222
  style Mineral fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Styling', code: STYLING },
      { label: 'Namespaces', code: NAMESPACES },
      { label: 'Notes and direction', code: NOTES },
    ],
    interval: 4500,
  });

export default mount;
