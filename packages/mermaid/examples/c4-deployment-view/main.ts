// C4Deployment diagrams: nested Deployment_Node blocks holding containers, plus Node, Node_L and Node_R
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Deployment_Node(alias, label, type, descr) nests: device, then runtime, then the container on it.
const NESTED = `C4Deployment
    title Deployment diagram: production

    Deployment_Node(mob, "Customer's phone", "iOS or Android") {
        Container(app, "Mobile App", "Swift, Kotlin", "The customer-facing app.")
    }

    Deployment_Node(dc, "Data centre", "Hosting provider") {
        Deployment_Node(srv, "api-server x4", "Ubuntu 22.04") {
            Deployment_Node(jvm, "JVM", "Java 21") {
                Container(api, "API", "Java, Spring", "Serves the mobile app.")
            }
        }
        Deployment_Node(dbn, "db-primary", "Ubuntu 22.04") {
            Deployment_Node(pg, "PostgreSQL", "PostgreSQL 16") {
                ContainerDb(db, "Database", "SQL", "Stores everything.")
            }
        }
    }

    Rel(app, api, "Calls", "JSON/HTTPS")
    Rel(api, db, "Reads and writes", "JDBC")`;

// Node is the short name of Deployment_Node, and Node_L / Node_R are its left- and right-aligned forms.
const SHORT = `C4Deployment
    title Short forms and alignment

    Node(edge, "Edge", "CDN") {
        Container(cache, "Static cache", "Varnish", "Serves assets.")
    }
    Node_L(left, "Region A", "Cloud region") {
        Container(a, "Service A", "Go", "Runs in A.")
    }
    Node_R(right, "Region B", "Cloud region") {
        Container(b, "Service B", "Go", "Runs in B.")
    }

    Rel(cache, a, "Falls back to")
    Rel(cache, b, "Falls back to")
    Rel_R(a, b, "Fails over to")`;

// Two database nodes with replication, the way the docs lay out a primary and a secondary.
const REPLICATED = `C4Deployment
    title Replicated database

    Deployment_Node(web, "Web tier", "Kubernetes") {
        Container(app, "Web Application", "Node.js", "Serves the site.")
    }
    Deployment_Node(d1, "db-01", "Ubuntu") {
        Deployment_Node(o1, "Primary", "Oracle 12c") {
            ContainerDb(db1, "Database", "Schema", "Primary copy.")
        }
    }
    Deployment_Node(d2, "db-02", "Ubuntu") {
        Deployment_Node(o2, "Secondary", "Oracle 12c") {
            ContainerDb(db2, "Database", "Schema", "Replica.")
        }
    }

    Rel(app, db1, "Writes to", "JDBC")
    Rel(app, db2, "Reads from", "JDBC")
    Rel_R(db1, db2, "Replicates data to")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Nested nodes', code: NESTED },
      { label: 'Node, Node_L, Node_R', code: SHORT },
      { label: 'Replicated database', code: REPLICATED },
    ],
  });

export default mount;
