// Architecture diagrams: edge sides, arrow heads and edges that leave a group's border
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// db:R -- L:server leaves db on its right and enters server on its left: a straight line.
const STRAIGHT = `architecture-beta
    service db(database)[Database]
    service server(server)[Server]
    service cache(disk)[Cache]

    db:R -- L:server
    server:R -- L:cache`;

// Mixing sides makes the edge turn: db:T and L:server is a 90 degree bend.
const BENDS = `architecture-beta
    service db(database)[Database]
    service server(server)[Server]
    service web(internet)[Web]

    db:T -- L:server
    server:R -- L:web`;

// < before the left side and > after the right side add arrowheads; both gives a double arrow.
const ARROWS = `architecture-beta
    service client(internet)[Client]
    service gateway(server)[Gateway]
    service app(server)[App]
    service store(database)[Store]

    client:R --> L:gateway
    gateway:R <--> L:app
    app:R <-- L:store`;

// {group} after a service id makes the edge start or end on the group's border, next to that service.
const GROUP_EDGES = `architecture-beta
    group edge(cloud)[Edge network]
    group core(cloud)[Core network]

    service gw(server)[Gateway] in edge
    service lb(server)[Balancer] in edge
    service app(server)[App] in core
    service db(database)[Database] in core

    gw:R -- L:lb
    app:R -- L:db
    lb{group}:B --> T:app{group}`;

// Edges between services in different groups without {group} go service to service instead.
const SERVICE_EDGES = `architecture-beta
    group edge(cloud)[Edge network]
    group core(cloud)[Core network]

    service gw(server)[Gateway] in edge
    service app(server)[App] in core
    service db(database)[Database] in core

    app:R -- L:db
    gw:B --> T:app`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Straight edges', code: STRAIGHT },
      { label: 'Bends', code: BENDS },
      { label: 'Arrows', code: ARROWS },
      { label: 'Edges out of groups', code: GROUP_EDGES },
      { label: 'Service-to-service', code: SERVICE_EDGES },
    ],
  });

export default mount;
