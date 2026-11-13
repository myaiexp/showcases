// Event Modeling timelines: time frames, inline data, data blocks, reset frames, namespaces
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Compact notation: a UI triggers a command, which records an event (state change pattern).
const STATE_CHANGE = `eventmodeling

tf 01 ui CartUI
tf 02 cmd AddItem { description: string }
tf 03 evt ItemAdded { description: string }`;

// Relaxed notation spells the same thing out; the two can be mixed.
const RELAXED = `eventmodeling

timeframe 01 ui CartUI
timeframe 02 command AddItem
timeframe 03 event ItemAdded
timeframe 04 readmodel CartItems
timeframe 05 ui CartUI`;

// Data blocks: [[Id]] on a frame points at a data block, numbered when an entity repeats.
const DATA_BLOCKS = `eventmodeling

tf 01 ui CartUI
tf 02 cmd AddItem [[AddItem01]]
tf 03 evt ItemAdded [[ItemAdded]]
tf 04 cmd AddItem [[AddItem02]]
tf 05 evt ItemAdded [[ItemAdded]]

data AddItem01 {
  description: 'john'
  image: 'avatar_john'
  price: 20.4
}

data AddItem02 {
  description: 'jack'
  image: 'avatar_jack'
  price: 12.5
}

data ItemAdded {
  description: string
  image: string
  price: number
}`;

// Translation: an external event is picked up by a processor that issues a command. rf (reset frame) breaks inference.
const TRANSLATION = `eventmodeling

tf 01 ui CartUI
tf 02 cmd AddItem
tf 03 evt ItemAdded

rf 04 evt External.InventoryChanged
tf 05 pcr InventoryProcessor
tf 06 cmd ChangeInventory
tf 07 evt Cart.InventoryChanged`;

// One read model fed by several events through repeated ->> relations.
const MULTI = `eventmodeling

rf 02 evt CartCreated
rf 03 evt ItemAdded
rf 04 evt ItemRemoved
rf 05 evt CartCleared
tf 01 rmo CartUI ->> 02 ->> 03 ->> 04 ->> 05`;

// A namespace (the part before the dot) plus entity type makes a swimlane of its own.
const NAMESPACES = `eventmodeling

rf 01 evt Inventory.InventoryChanged
rf 02 evt External.InventoryChanged
rf 03 evt Billing.InvoiceIssued`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'State change', code: STATE_CHANGE },
      { label: 'Relaxed notation', code: RELAXED },
      { label: 'Data blocks', code: DATA_BLOCKS },
      { label: 'Translation', code: TRANSLATION },
      { label: 'Multiple relations', code: MULTI },
      { label: 'Namespaces', code: NAMESPACES },
    ],
  });

export default mount;
