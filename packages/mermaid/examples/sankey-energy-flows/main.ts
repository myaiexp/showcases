// Sankey diagrams from CSV rows, with link colour, alignment, label style and node colours
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Three CSV columns: source, target, value. A comma inside a name needs double quotes.
const HOME_ENERGY = `sankey

Solar,Electricity grid,59.9
Wind,Electricity grid,289.4
Hydro,Electricity grid,7
Electricity grid,Industry,342.2
Electricity grid,"Heating and cooling, homes",113.7
Electricity grid,Road transport,37.8
Electricity grid,Losses,56.7
Gas imports,Gas,40.7
Gas,Industry,48.6
Gas,"Heating and cooling, homes",20.1`;

// linkColor gradient blends source and target colours; showValues false hides the numbers.
const GRADIENT = `---
config:
  sankey:
    showValues: false
    linkColor: gradient
    nodeAlignment: left
---
sankey

Visits,Sign-ups,4200
Visits,Bounced,15800
Sign-ups,Trial,2900
Sign-ups,Dropped,1300
Trial,Paid,860
Trial,Churned,2040`;

// nodeColors maps names to CSS colours; labelStyle outlined and nodeWidth/nodePadding tune the nodes.
const CUSTOM_NODES = `---
config:
  sankey:
    showValues: false
    labelStyle: outlined
    nodeWidth: 15
    nodePadding: 20
    nodeColors:
      Electricity grid: "#4e79a7"
      Industry: "#e15759"
      Losses: "#bab0ab"
---
sankey

Electricity grid,Heating and cooling - homes,113.726
Electricity grid,Industry,342.165
Electricity grid,Losses,56.691`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Custom node colours', code: CUSTOM_NODES },
      { label: 'Gradient funnel', code: GRADIENT },
      { label: 'Energy flows', code: HOME_ENERGY },
    ],
  });

export default mount;
