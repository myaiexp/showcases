// Class diagrams: relationship arrows, labels, multiplicity and lollipop interfaces
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Cardinality in quotes either side of the arrow, plus a label after the colon.
const SHOP = `classDiagram
  class Customer {
    +String name
  }
  class Order {
    +total() Money
  }
  class LineItem
  class Payment {
    <<interface>>
    +authorise() bool
  }
  Customer "1" --> "*" Order : places
  Order "1" *-- "1..*" LineItem : contains
  Order --> Payment : settled by`;

// All the arrow kinds: inheritance, composition, aggregation, association, link, dependency, realization.
const KINDS = `classDiagram
  classA <|-- classB : Inheritance
  classC *-- classD : Composition
  classE o-- classF : Aggregation
  classG --> classH : Association
  classI -- classJ : Link(Solid)
  classK ..> classL : Dependency
  classM ..|> classN : Realization
  classO .. classP : Link(Dashed)`;

// Arrowheads can go either way, and two-way relations combine two ends.
const DIRECTIONS = `classDiagram
  Animal <|--|> Zebra
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides
  Galaxy --> "many" Star : Contains
  Student "1" --> "1..*" Course`;

// Lollipop interfaces: bar ()-- foo and foo --() bar.
const LOLLIPOP = `classDiagram
  class Class01 {
    int amount
    draw()
  }
  Class01 --() bar
  Class02 --() bar
  foo ()-- Class01`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Shop with cardinality', code: SHOP },
      { label: 'Relationship kinds', code: KINDS },
      { label: 'Two-way and multiplicity', code: DIRECTIONS },
      { label: 'Lollipop interfaces', code: LOLLIPOP },
    ],
    interval: 4500,
  });

export default mount;
