// ER diagrams: attributes with PK/FK/UK and comments, aliases, direction and classDef styling
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Keys (PK, FK, UK, or PK, FK together) and quoted comments on attributes.
const KEYS = `erDiagram
    CAR ||--o{ NAMED-DRIVER : allows
    CAR {
        string registrationNumber PK
        string make
        string model
        string[] parts
    }
    PERSON ||--o{ NAMED-DRIVER : is
    PERSON {
        string driversLicense PK "The license #"
        string(99) firstName "Only 99 characters are allowed"
        string lastName
        string phone UK
        int age
    }
    NAMED-DRIVER {
        string carRegistrationNumber PK, FK
        string driverLicence PK, FK
    }
    MANUFACTURER only one to zero or more CAR : makes`;

// Entity aliases in square brackets show a friendlier name; optional types end in ?.
const ALIASES = `erDiagram
    p[Person] {
        string firstName
        string? middleName
        string lastName
    }
    a["Customer Account"] {
        string email
    }
    p ||--o| a : has`;

// direction LR lays the diagram out left to right.
const LEFT_RIGHT = `erDiagram
    direction LR
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string custNumber
        string sector
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
        int orderNumber
        string deliveryAddress
    }
    LINE-ITEM {
        string productCode
        int quantity
        float pricePerUnit
    }`;

// classDef with the ::: shorthand, in a relationship and on an entity.
const STYLED = `erDiagram
    direction TB
    CAR {
        string registrationNumber
        string make
    }
    PERSON {
        string firstName
        string lastName
    }
    PERSON:::foo ||--|| CAR : owns
    PERSON o{--|| HOUSE:::bar : has
    classDef foo stroke:#f00,stroke-width:3px
    classDef bar stroke:#0f0,stroke-width:3px`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Aliases', code: ALIASES },
      { label: 'Keys and comments', code: KEYS },
      { label: 'Direction LR', code: LEFT_RIGHT },
      { label: 'Styled with classDef', code: STYLED },
    ],
    interval: 4500,
  });

export default mount;
