// C4Dynamic diagrams: relationships numbered by the order written, RelIndex, and UpdateRelStyle for colours and offsets
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// C4Dynamic draws relationships with a sequence number, in the order the Rel lines are written.
const LOGIN = `C4Dynamic
    title Dynamic diagram: signing in

    ContainerDb(db, "Database", "SQL", "Stores users and hashed credentials.")
    Container(spa, "Single-Page App", "JavaScript", "The customer's browser app.")
    Container_Boundary(b, "API Application") {
        Component(sec, "Security Component", "Service", "Checks credentials.")
        Component(ctl, "Sign In Controller", "REST controller", "Handles sign-in requests.")
    }
    Rel(spa, ctl, "Submits credentials to", "JSON/HTTPS")
    Rel(ctl, sec, "Calls isAuthenticated() on")
    Rel(sec, db, "select * from users where username = ?", "JDBC")

    UpdateRelStyle(spa, ctl, $textColor="red", $offsetY="-40")
    UpdateRelStyle(ctl, sec, $textColor="red", $offsetX="-40", $offsetY="60")
    UpdateRelStyle(sec, db, $textColor="red", $offsetY="-40", $offsetX="10")`;

// RelIndex(index, from, to, label) is the C4-PlantUML form; the index argument is ignored and
// the number comes from the line's position, so the lines below are numbered 1, 2, 3 and 4.
const REL_INDEX = `C4Dynamic
    title Dynamic diagram: checkout with RelIndex

    Person(buyer, "Buyer")
    Container(shop, "Web Shop", "TypeScript", "Takes the order.")
    Container(pay, "Payments", "Go", "Charges the card.")
    System_Ext(bank, "Card network")

    RelIndex(1, buyer, shop, "Places an order")
    RelIndex(2, shop, pay, "Requests payment")
    RelIndex(3, pay, bank, "Authorises")
    RelIndex(4, shop, buyer, "Sends confirmation")`;

// Named style parameters recolour one relationship each; the offsets move its label.
const STYLED = `C4Dynamic
    title Dynamic diagram: styled steps

    Person(user, "User")
    Container(app, "App", "Kotlin", "Mobile client.")
    Container(api, "API", "Java", "Backend.")
    ContainerDb(store, "Store", "SQL", "Data.")

    Rel(user, app, "Taps refresh")
    Rel(app, api, "Fetches feed", "HTTPS")
    Rel(api, store, "Queries", "JDBC")
    Rel(store, api, "Returns rows")
    Rel(api, app, "Responds", "JSON")

    UpdateRelStyle(user, app, $textColor="blue", $lineColor="blue")
    UpdateRelStyle(app, api, $textColor="green", $lineColor="green", $offsetY="-20")
    UpdateRelStyle(api, store, $textColor="orange", $lineColor="orange", $offsetX="-30")
    UpdateRelStyle(store, api, $textColor="red", $lineColor="red", $offsetX="30")`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Sign-in flow', code: LOGIN },
      { label: 'RelIndex', code: REL_INDEX },
      { label: 'Styled steps', code: STYLED },
    ],
  });

export default mount;
