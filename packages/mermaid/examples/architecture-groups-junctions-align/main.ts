// Architecture diagrams with the built-in icons: groups, services, a junction and align directives
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A group with services inside and edges leaving from chosen sides (T B L R).
const GROUP = `architecture-beta
    group api(cloud)[API]
    service db(database)[Database] in api
    service disk1(disk)[Storage] in api
    service disk2(disk)[Backup] in api
    service server(server)[Server] in api
    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db`;

// A junction is a 4-way split: three disks and two gateways meet through two junctions.
const JUNCTION = `architecture-beta
    service left_disk(disk)[Disk]
    service top_disk(disk)[Disk]
    service bottom_disk(disk)[Disk]
    service top_gateway(internet)[Gateway]
    service bottom_gateway(internet)[Gateway]
    junction junctionCenter
    junction junctionRight
    left_disk:R -- L:junctionCenter
    top_disk:B -- T:junctionCenter
    bottom_disk:T -- B:junctionCenter
    junctionCenter:R -- L:junctionRight
    top_gateway:B -- T:junctionRight
    bottom_gateway:T -- B:junctionRight`;

// align row and align column pin groups of services into a tidy grid.
const GRID = `architecture-beta
    group sources(cloud)[Sources]
        service src_a(server)[Source A] in sources
        service src_b(server)[Source B] in sources
        service src_c(server)[Source C] in sources
    group storage(database)[Storage]
        service db_one(database)[DB One] in storage
        service db_two(database)[DB Two] in storage
        service db_three(database)[DB Three] in storage
    src_a:B --> T:db_one
    src_b:B --> T:db_two
    src_c:B --> T:db_three
    align row src_a src_b src_c
    align row db_one db_two db_three
    align column src_a db_one
    align column src_b db_two
    align column src_c db_three`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Group and edges', code: GROUP },
      { label: 'Junctions', code: JUNCTION },
      { label: 'Aligned grid', code: GRID },
    ],
    interval: 5000,
  });

export default mount;
