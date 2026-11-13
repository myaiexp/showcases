// Nested namespaces by dot notation and by nesting blocks, plus compact rendering (hierarchicalNamespaces: false)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Dot notation creates the intermediate namespaces Company and Company.Engineering for you.
const DOTTED = `classDiagram
    namespace Company.Engineering.Backend {
        class Developer {
            +writeCode()
        }
    }
    namespace Company.Engineering.Frontend {
        class Designer {
            +createMockup()
        }
    }
    namespace Company.Engineering {
        class TechLead {
            +planSprint()
        }
    }
    TechLead --> Developer : leads
    TechLead --> Designer : leads`;

// Syntactic nesting: a namespace block inside another, next to a class that belongs to the outer one.
const NESTED = `classDiagram
    namespace Platform {
        namespace Auth {
            class UserService {
                +login()
                +logout()
            }
        }
        namespace Data {
            class Repository {
                +find()
                +save()
            }
        }
        class Gateway {
            +route()
        }
    }
    Gateway --> UserService : delegates
    Gateway --> Repository : delegates`;

// Both styles combine: Shop.Web is dotted, Inner is written inside Shop.Web, and labels go on any of them.
const COMBINED = `classDiagram
    namespace Shop["Online shop"] {
        class Checkout {
            +pay()
        }
    }
    namespace Shop.Web {
        namespace Inner["Widgets"] {
            class Cart {
                +add()
            }
        }
        class Page {
            +render()
        }
    }
    Page --> Cart
    Cart --> Checkout`;

// hierarchicalNamespaces: false: only declared namespaces are drawn, each as one flat box
// named by its full dotted path; classes of skipped ancestors move to the nearest declared one.
const COMPACT = `---
config:
  class:
    hierarchicalNamespaces: false
---
classDiagram
    namespace Company.Engineering.Backend {
        class Developer {
            +writeCode()
        }
    }
    namespace Company.Engineering.Frontend {
        class Designer {
            +createMockup()
        }
    }
    namespace Company {
        class CEO {
            +makeDecisions()
        }
    }
    CEO --> Developer : oversees
    CEO --> Designer : oversees`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Dot notation', code: DOTTED },
      { label: 'Syntactic nesting', code: NESTED },
      { label: 'Combined with labels', code: COMBINED },
      { label: 'Compact rendering', code: COMPACT },
    ],
  });

export default mount;
