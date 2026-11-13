// Use case diagrams: actors, system boundaries and the include/extend/generalization operators
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A boundary groups use cases; ..> : include and ..> : extend are the UML relationships.
const BOUNDARY = `usecase-beta
direction LR
actor Customer("Customer")
actor Admin
systemBoundary Shop["Online shop"]
  Browse("Browse catalogue")
  Checkout("Check out")
  Payment("Pay by card")
  Coupon("Apply coupon")
end
Customer --> Browse
Customer --> Checkout
Checkout ..> : include Payment
Coupon ..> : extend Checkout
Admin --> Browse`;

// Actor variants (normal, hollow, awesome), business marks and one <<stereotype>> per element.
const ACTORS = `usecase-beta
actor Normal("Normal actor")
actor Hollow("Hollow actor")@{ type: hollow }
actor Awesome("Awesome actor")@{ type: awesome }
actor SalesAgent("Sales agent")@{ business: true } <<Employee>>
Quote("Prepare quote")@{ business: true } <<Core>>
Archive[Archive quote] <<Record>>
Normal --> Quote
Hollow --> Quote
Awesome --> Quote
SalesAgent --> Quote
Quote --> Archive`;

// Generalization between actors, and notes attached to an actor or a use case.
const NOTES = `usecase-beta
actor Admin
actor Person
Login("Sign in")
Reset("Reset password")
note for Login "Requires an **active session**"
note for Person "Any registered user"
Admin --|> Person
Person --> Login
Person --> Reset
Reset ..> : include Login`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Boundary, include, extend', code: BOUNDARY },
      { label: 'Actor variants', code: ACTORS },
      { label: 'Generalization and notes', code: NOTES },
    ],
  });

export default mount;
