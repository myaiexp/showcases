// C4Component diagrams: components inside a container boundary, Db/Queue/Ext variants and directional relationships
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Component(alias, label, techn, descr) inside a Container_Boundary, with containers and a system around it.
const BASIC = `C4Component
    title Component diagram for the Orders API

    Container(web, "Web Shop", "TypeScript", "Customers browse and order here.")
    ContainerDb(db, "Orders database", "PostgreSQL", "Stores orders and payments.")
    System_Ext(pay, "Payment provider", "Takes card payments.")

    Container_Boundary(api, "Orders API") {
        Component(ctl, "Orders Controller", "REST controller", "Accepts order requests.")
        Component(svc, "Order Service", "Service class", "Validates and prices an order.")
        Component(gw, "Payment Gateway", "Client library", "Talks to the payment provider.")

        Rel(ctl, svc, "Uses")
        Rel(svc, gw, "Charges through")
    }

    Rel(web, ctl, "Calls", "JSON/HTTPS")
    Rel(svc, db, "Reads and writes", "SQL")
    Rel(gw, pay, "Pays with", "HTTPS")`;

// ComponentDb and ComponentQueue draw a store and a queue; the _Ext forms mark components that sit outside the system.
const VARIANTS = `C4Component
    title Component kinds

    Container_Boundary(app, "Notifier") {
        Component(api, "Intake", "HTTP handler", "Receives events.")
        ComponentQueue(queue, "Event queue", "Redis stream", "Buffers events.")
        ComponentDb(store, "Preferences", "Key-value store", "Who wants what.")
        Component(sender, "Sender", "Worker", "Delivers messages.")
        Component_Ext(mail, "Mail relay", "SMTP", "External relay.")
        ComponentDb_Ext(crm, "CRM", "SaaS", "Customer records.")
        ComponentQueue_Ext(sms, "SMS gateway", "Provider queue", "External carrier.")
    }

    Rel(api, queue, "Publishes")
    Rel(queue, sender, "Feeds")
    Rel(sender, store, "Looks up")
    Rel(sender, mail, "Sends mail via")
    Rel(sender, crm, "Reads contacts")
    Rel(sender, sms, "Texts via")`;

// Direction hints: Rel_U, Rel_D, Rel_L and Rel_R nudge the layout; Rel_Back reverses an arrow so a "Uses" reads from the other side.
const DIRECTIONS = `C4Component
    title Directional relationships

    Container_Boundary(box, "Service") {
        Component(a, "Top", "Module", "Sits above.")
        Component(b, "Middle", "Module", "Centre of the box.")
        Component(c, "Bottom", "Module", "Sits below.")
        Component(l, "Left", "Module", "To the left.")
        Component(r, "Right", "Module", "To the right.")
    }

    Rel_D(a, b, "Rel_D")
    Rel_U(c, b, "Rel_U")
    Rel_R(l, b, "Rel_R")
    Rel_L(r, b, "Rel_L")
    Rel_Back(a, l, "Rel_Back")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Components in a boundary', code: BASIC },
      { label: 'Db, Queue and Ext kinds', code: VARIANTS },
      { label: 'Rel direction', code: DIRECTIONS },
    ],
  });

export default mount;
