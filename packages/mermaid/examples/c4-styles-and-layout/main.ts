// C4 styling calls: UpdateElementStyle, UpdateRelStyle (both parameter forms), UpdateLayoutConfig and c4.wrap
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const ELEMENTS = `    Person(customer, "Customer", "Buys things online.")
    System(shop, "Web Shop", "Takes and fulfils orders from customers all over the world.")
    SystemDb_Ext(erp, "ERP", "Stock levels, invoices and the general ledger of the company.")
    System_Ext(mail, "E-mail system", "Sends receipts.")`;

// UpdateElementStyle(name, bgColor, fontColor, borderColor): named parameters start with $.
const ELEMENT_STYLE = `C4Context
    title Element styles
${ELEMENTS}
    Rel(customer, shop, "Orders from")
    Rel(shop, erp, "Reads stock from")
    Rel(shop, mail, "Sends receipts with")

    UpdateElementStyle(customer, $fontColor="red", $bgColor="grey", $borderColor="red")
    UpdateElementStyle(shop, $bgColor="#0b6e4f", $fontColor="white", $borderColor="#9fe7c9")
    UpdateElementStyle(erp, $bgColor="#7c3aed", $fontColor="white")`;

// UpdateRelStyle(from, to, textColor, lineColor, offsetX, offsetY): positional order, named
// parameters ($textColor...) or only the ones you need. Offsets move the label from its default spot.
const REL_STYLE = `C4Context
    title Relationship styles
${ELEMENTS}
    Rel(customer, shop, "Orders from", "HTTPS")
    Rel(shop, erp, "Reads stock from", "SQL")
    BiRel(shop, mail, "Talks to", "SMTP")

    UpdateRelStyle(customer, shop, "red", "blue", "-40", "60")
    UpdateRelStyle(shop, erp, $offsetX="-40", $offsetY="30", $lineColor="green", $textColor="orange")
    UpdateRelStyle(shop, mail, $offsetY="-30")`;

// UpdateLayoutConfig(c4ShapeInRow, c4BoundaryInRow): defaults are 4 shapes and 2 boundaries per row. Here 2 and 1.
const LAYOUT_NARROW = `C4Context
    title Two shapes per row
${ELEMENTS}
    Rel(customer, shop, "Orders from")
    Rel(shop, erp, "Reads stock from")

    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")`;

// The same with every shape in one row.
const LAYOUT_WIDE = `C4Context
    title Four shapes per row
${ELEMENTS}
    Rel(customer, shop, "Orders from")
    Rel(shop, erp, "Reads stock from")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")`;

// Wrapping is on by default from v11.17.1; c4.wrap: false in frontmatter turns it off, so long descriptions stay on one line.
const NO_WRAP = `---
config:
  c4:
    wrap: false
---
C4Context
    title Wrapping disabled
${ELEMENTS}
    Rel(customer, shop, "Orders from")
    Rel(shop, erp, "Reads stock from")`;

const WRAP = `C4Context
    title Wrapping on (the default)
${ELEMENTS}
    Rel(customer, shop, "Orders from")
    Rel(shop, erp, "Reads stock from")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'UpdateElementStyle', code: ELEMENT_STYLE },
      { label: 'UpdateRelStyle', code: REL_STYLE },
      { label: '2 shapes per row', code: LAYOUT_NARROW },
      { label: '4 shapes per row', code: LAYOUT_WIDE },
      { label: 'Wrapping on', code: WRAP },
      { label: 'c4.wrap: false', code: NO_WRAP },
    ],
  });

export default mount;
