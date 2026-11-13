// Class diagrams: members, visibility, return types, generics and annotations
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Members in braces; +public -private #protected ~package; a return type follows the ). Annotations nest in the body.
const ACCOUNT = `classDiagram
    class BankAccount {
        <<abstract>>
        +String owner
        #BigDecimal balance
        -String pin
        ~int branchCode
        +deposit(amount) bool
        +withdraw(amount) int
        +interestRate()* float
        +openCount()$ int
    }
    class Savings
    BankAccount <|-- Savings`;

// Generics use tildes: Repository~T~, List~int~, nested List~List~int~~.
const GENERICS = `classDiagram
    class Repository~T~ {
        +find(id) T
        +findAll() List~T~
        +save(entity T)
        +pages() List~List~int~~
    }
    class User {
        +String name
    }
    Repository~User~ <.. User`;

// Annotations: inline, on a separate line, or inside the body.
const ANNOTATIONS = `classDiagram
    class Shape
    <<interface>> Shape
    Shape : noOfVertices
    Shape : draw()
    class Color {
        <<enumeration>>
        RED
        BLUE
        GREEN
    }
    class Logger <<service>>
    Shape --> Color : fill`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Visibility and classifiers', code: ACCOUNT },
      { label: 'Generics', code: GENERICS },
      { label: 'Annotations', code: ANNOTATIONS },
    ],
    interval: 4500,
  });

export default mount;
