// Requirement diagrams: requirements, elements and typed relationships between them
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A requirement (id, text, risk, verifymethod), the element that satisfies it, and one relationship.
const SMALL_SPEC = `requirementDiagram
  requirement login_req {
    id: 1
    text: Users must sign in with a password.
    risk: high
    verifymethod: test
  }
  element auth_service {
    type: service
    docref: docs/auth
  }
  auth_service - satisfies -> login_req`;

// All six requirement types and the relationship keywords: contains, derives, refines, traces, verifies, copies.
const ALL_TYPES = `requirementDiagram
  requirement platform_req {
    id: 1
    text: The platform shall be available all day.
    risk: high
    verifymethod: analysis
  }
  functionalRequirement login_req {
    id: 1.1
    text: Users can sign in.
    risk: low
    verifymethod: inspection
  }
  performanceRequirement latency_req {
    id: 1.2
    text: Pages load in under 2 seconds.
    risk: medium
    verifymethod: demonstration
  }
  interfaceRequirement api_req {
    id: 1.2.1
    text: Public API is versioned.
    risk: medium
    verifymethod: analysis
  }
  physicalRequirement rack_req {
    id: 1.2.2
    text: Servers fit a 2U rack.
    risk: low
    verifymethod: inspection
  }
  designConstraint tls_req {
    id: 1.2.3
    text: All traffic uses TLS.
    risk: medium
    verifymethod: test
  }
  element load_test {
    type: "test suite"
    docRef: tests/load
  }
  element runbook {
    type: word doc
    docRef: ops/runbook
  }
  platform_req - contains -> latency_req
  latency_req - contains -> api_req
  api_req - derives -> rack_req
  rack_req - refines -> tls_req
  platform_req - traces -> login_req
  load_test - verifies -> latency_req
  platform_req <- copies - runbook`;

// direction LR lays the same kind of graph out left to right (the default is TB).
const LEFT_TO_RIGHT = `requirementDiagram
  direction LR
  requirement brake_req {
    id: 7
    text: Stop from 100 km/h within 40 m.
    risk: high
    verifymethod: test
  }
  element brake_controller {
    type: firmware
  }
  element track_trial {
    type: simulation
  }
  brake_controller - satisfies -> brake_req
  track_trial - verifies -> brake_req`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Small spec', code: SMALL_SPEC },
      { label: 'All requirement types', code: ALL_TYPES },
      { label: 'Direction LR', code: LEFT_TO_RIGHT },
    ],
  });

export default mount;
