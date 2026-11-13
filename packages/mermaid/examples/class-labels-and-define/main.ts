// Defining classes: the class keyword, relationship-defined classes, [label] display text and `backtick` names
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Two ways to define a class: the class keyword, or naming it in a relationship, which defines both ends.
const DEFINE = `classDiagram
    class Animal
    Vehicle <|-- Car
    Animal <|-- Dog`;

// Members added with the Name : member form, one line each, under a class declared first.
const MEMBERS = `---
title: Bank example
---
classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +Bigdecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdrawal(amount)`;

// Class["label"] keeps a plain id for relationships but shows other text; symbols are fine in a label.
const LABELS = `classDiagram
    class Animal["Animal with a label"]
    class Car["Car with *! symbols"]
    Animal --> Car`;

// Backticks escape special characters in the name itself, so the name is the text.
const BACKTICKS = `classDiagram
    class \`Animal Class!\`
    class \`Car Class\`
    \`Animal Class!\` --> \`Car Class\``;

// Names may be alphanumeric incl. unicode, underscores and dashes.
const NAMES = `classDiagram
    class Order-Item
    class Käufer
    class snake_case_class
    class 客户
    Käufer --> Order-Item : places
    Order-Item --> snake_case_class
    客户 --> Käufer`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Two ways to define', code: DEFINE },
      { label: 'Members', code: MEMBERS },
      { label: 'Labels', code: LABELS },
      { label: 'Backtick names', code: BACKTICKS },
      { label: 'Allowed characters', code: NAMES },
    ],
  });

export default mount;
