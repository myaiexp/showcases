// `suspend` hides shapes and connections as model-only; `unsuspend` restores.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'All models',
        code: `# -----
# Models
# -----
restaurants: Restaurants {
  style.stroke-dash: 2
  *.style.fill: "#66c4e3"
  chip: Chipotle
  cfa: Chick-Fil-A
  bk: Burger King

  chip -> bk: competes with
}

diners: Diners {
  daniel
  zack
}

# -----
# Model Relationships
# -----
diners -> restaurants: eat at

diners.daniel -> restaurants.chip: likes
diners.daniel -> restaurants.cfa: dislikes

diners.zack -> restaurants.bk: likes
diners.zack -> restaurants.chip: likes
`,
      },
      {
        label: 'Top level only',
        code: `# -----
# Models
# -----
restaurants: Restaurants {
  style.stroke-dash: 2
  *.style.fill: "#66c4e3"
  chip: Chipotle
  cfa: Chick-Fil-A
  bk: Burger King

  chip -> bk: competes with
}

diners: Diners {
  daniel
  zack
}

# -----
# Model Relationships
# -----
diners -> restaurants: eat at

diners.daniel -> restaurants.chip: likes
diners.daniel -> restaurants.cfa: dislikes

diners.zack -> restaurants.bk: likes
diners.zack -> restaurants.chip: likes

# Treat the above as models
**: suspend
(** -> **)[*]: suspend

# Display only top level
*: unsuspend
(* -> *)[*]: unsuspend
`,
      },
      {
        label: 'Connections into bk',
        code: `# -----
# Models
# -----
restaurants: Restaurants {
  style.stroke-dash: 2
  *.style.fill: "#66c4e3"
  chip: Chipotle
  cfa: Chick-Fil-A
  bk: Burger King

  chip -> bk: competes with
}

diners: Diners {
  daniel
  zack
}

# -----
# Model Relationships
# -----
diners -> restaurants: eat at

diners.daniel -> restaurants.chip: likes
diners.daniel -> restaurants.cfa: dislikes

diners.zack -> restaurants.bk: likes
diners.zack -> restaurants.chip: likes

# Treat the above as models
**: suspend
(** -> **)[*]: suspend

(** -> **)[*]: unsuspend {
  &dst: restaurants.bk
}
`,
      },
      {
        label: 'Only "likes"',
        code: `# -----
# Models
# -----
restaurants: Restaurants {
  style.stroke-dash: 2
  *.style.fill: "#66c4e3"
  chip: Chipotle
  cfa: Chick-Fil-A
  bk: Burger King

  chip -> bk: competes with
}

diners: Diners {
  daniel
  zack
}

# -----
# Model Relationships
# -----
diners -> restaurants: eat at

diners.daniel -> restaurants.chip: likes
diners.daniel -> restaurants.cfa: dislikes

diners.zack -> restaurants.bk: likes
diners.zack -> restaurants.chip: likes

# Treat the above as models
**: suspend
(** -> **)[*]: suspend

(** -> **)[*]: unsuspend {
  &label: likes
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
