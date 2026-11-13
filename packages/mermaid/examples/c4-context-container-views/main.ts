// C4: one web shop drawn as a system context diagram and as a container diagram
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// C4Context: people and systems inside and outside an enterprise boundary, joined by Rel.
const CONTEXT = `C4Context
  title System context for the Web Shop
  Person(shopper, "Shopper", "Buys products online.")
  Enterprise_Boundary(co, "Shop company") {
    System(shop, "Web Shop", "Catalogue, basket and checkout.")
    SystemDb(erp, "ERP", "Stock and orders.")
  }
  System_Ext(pay, "Payment provider", "Takes card payments.")
  System_Ext(mail, "E-mail system", "Sends receipts.")
  Rel(shopper, shop, "Browses and orders")
  Rel(shop, pay, "Charges cards", "HTTPS")
  Rel(shop, erp, "Reserves stock")
  Rel(shop, mail, "Sends receipts", "SMTP")
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")`;

// C4Container: the inside of the Web Shop, with technology per container and a database.
const CONTAINER = `C4Container
  title Containers of the Web Shop
  Person(shopper, "Shopper")
  Container_Boundary(shop, "Web Shop") {
    Container(spa, "Storefront", "TypeScript, Vite", "Catalogue and basket in the browser.")
    Container(api, "Shop API", "Node.js", "Orders, stock and prices over JSON.")
    ContainerDb(db, "Database", "PostgreSQL", "Products, orders, customers.")
    ContainerQueue(jobs, "Job queue", "Redis", "Receipts and stock syncs.")
  }
  System_Ext(pay, "Payment provider", "Takes card payments.")
  Rel(shopper, spa, "Uses", "HTTPS")
  Rel(spa, api, "Calls", "JSON/HTTPS")
  Rel(api, db, "Reads and writes", "SQL")
  Rel(api, jobs, "Enqueues", "RESP")
  Rel(api, pay, "Charges cards", "HTTPS")
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'System context', code: CONTEXT },
      { label: 'Container diagram', code: CONTAINER },
    ],
    interval: 5000,
  });

export default mount;
