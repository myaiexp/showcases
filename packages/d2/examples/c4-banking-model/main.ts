// C4 model in D2: the C4 theme (303), c4-person shapes and Markdown labels
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

// The model sets its theme in vars.d2-config, so no themeID is passed for the first variant.
const model = `vars: {
  d2-config: {
    theme-id: 303
  }
}

customer: |md
  ## Personal Banking Customer
  [person]

  A customer of the bank, with personal bank accounts.
| {
  shape: c4-person
}

internet_banking_system: |md
  ## Internet Banking System
  [Software System]
| {
  shape: rectangle
  label.near: bottom-left
}

internet_banking_system.web_app: |md
  ## Web Application
  [Container: Java and Spring MVC]

  Delivers the static content and the Internet banking single page application.
| {
  shape: rectangle
}

internet_banking_system.spa: |md
  ## Single-Page Application
  [Container: JavaScript and Angular]

  Provides all of the Internet banking functionality to customers via their web browser.
| {
  shape: rectangle
}

internet_banking_system.mobile_app: |md
  ## Mobile App
  [Container: Xamarin]

  Provides a limited subset of the Internet banking functionality to customers via their mobile device.
| {
  shape: rectangle
}

internet_banking_system.api_app: |md
  ## API Application
  [Container: Java and Spring MVC]

  Provides Internet banking functionality via a JSON/HTTPS API.
| {
  shape: rectangle
}

internet_banking_system.database: |md
  ## Database
  [Container: Oracle Database Schema]

  Stores user registration information, hashed authentication credentials, access logs, etc.
| {
  shape: cylinder
}

email_system: |md
  ## E-mail System
  [Software System]

  The internal Microsoft Exchange e-mail system.
| {
  shape: rectangle
}

mainframe: |md
  ## Mainframe Banking System
  [Software System]

  Stores all of the core banking information about customers, accounts, transactions, etc.
| {
  shape: rectangle
}

# Connections
customer -> internet_banking_system.web_app: "Visits bigbank.com/ib using\\n[HTTPS]"
internet_banking_system.web_app -> internet_banking_system.spa: "Delivers to the customer's web browser"
customer -> internet_banking_system.spa: "Views account balances,\\nand makes payments using"
customer -> internet_banking_system.mobile_app: "Views account balances,\\nand makes payments using"
internet_banking_system.spa -> internet_banking_system.api_app: "Makes API calls to\\n[JSON/HTTPS]"
internet_banking_system.mobile_app -> internet_banking_system.api_app: "Makes API calls to\\n[JSON/HTTPS]"
internet_banking_system.api_app -> mainframe: "Makes API calls to\\n[XML/HTTPS]"
customer -> email_system: "Sends e-mails to"
internet_banking_system.api_app -> email_system: "Sends e-mail using"
internet_banking_system.database <-> internet_banking_system.api_app: "Reads from and writes to\\n[SQL/TCP]"`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      { label: 'theme-id: 303 (the C4 theme) from d2-config', code: model },
      { label: 'The same source with themeID: 200 passed to compile, which wins over d2-config', code: model, options: { themeID: 200 } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
