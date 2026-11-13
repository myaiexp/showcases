// Event Modeling: inferred relations vs reset frames, inline data, entity types and typed data blocks
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Without a reset frame every frame is related to the one before it, so OtherUI would feed CartItems.
const INFERRED = `eventmodeling

tf 01 evt ItemAdded
tf 02 ui OtherUI
tf 03 rmo CartItems`;

// rf stops the inferred relation; ->> 01 then connects CartItems to ItemAdded explicitly.
const RESET = `eventmodeling

tf 01 evt ItemAdded
tf 02 ui OtherUI
rf 03 rmo CartItems ->> 01`;

// A reset frame also starts a new flow: an external event enters, a processor reacts, a command follows.
const FLOW = `eventmodeling

tf 01 ui CartUI
tf 02 cmd AddItem
tf 03 evt ItemAdded

rf 04 evt External.InventoryChanged
tf 05 pcr InventoryProcessor
tf 06 cmd ChangeInventory
tf 07 evt Cart.InventoryChanged`;

// Inline data sits in braces on the frame's own line.
const INLINE = `eventmodeling

tf 01 ui CheckoutUI
tf 02 cmd PlaceOrder { items: number, total: number }
tf 03 evt OrderPlaced { orderId: string, total: number }
tf 04 rmo OrderSummary { orderId: string, status: string }`;

// Every entity type, short and long spelling: ui, pcr/processor, cmd/command, rmo/readmodel, evt/event.
const ENTITIES = `eventmodeling

tf 01 ui ShopUI
timeframe 02 processor Autopilot
tf 03 cmd PlaceOrder
timeframe 04 command CancelOrder
tf 05 evt OrderPlaced
timeframe 06 event OrderCancelled
tf 07 rmo OpenOrders
timeframe 08 readmodel History`;

// A backtick data type (json here, text on the other block) precedes the braces, inline or in a block.
const TYPED = `eventmodeling

tf 01 ui AdminUI
tf 02 cmd AddUser \`json\`{ "name": "foo", "admin": false }
tf 03 evt UserAdded [[UserAdded01]]
tf 04 rmo UserList [[Notes]]

data UserAdded01 \`json\`{
  "name": "foo",
  "admin": false
}

data Notes \`text\`{
  First user is created by the installer.
}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Inferred relations', code: INFERRED },
      { label: 'Reset frame + ->>', code: RESET },
      { label: 'Reset starts a flow', code: FLOW },
      { label: 'Inline data', code: INLINE },
      { label: 'Entity types', code: ENTITIES },
      { label: 'Typed data', code: TYPED },
    ],
  });

export default mount;
