// Tags as classes: import every model, suspend all, unsuspend one class
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';
import { c4Models } from './models.ts';

const files = { 'c4-models.d2': c4Models };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      { label: 'Only the customer-facing models', files, code: `...@c4-models
**: suspend
**: unsuspend {
  &class: customer-facing
}` },
      { label: 'The same models, with connections added', files, code: `...@c4-models
**: suspend
**: unsuspend {
  &class: customer-facing
}

atm_system -> mobile_banking_api: {
  source-arrowhead: {
    shape: triangle
  }
  target-arrowhead: {
    shape: triangle
  }
  label: "Integration"
  style.stroke: "#4682B4"
}

notification_system -> chatbot: {
  label: "Sends alerts via"
  style.stroke-dash: 5
  style.stroke: "#2E8B57"
}

kyc_system -> investment_platform: {
  label: "Verifies identity"
  style.stroke-width: 2
  style.stroke: "#800080"
}

mobile_banking_api -> bill_payment: {
  label: "Provides access"
  style.stroke: "#FF6347"
}

chatbot -> investment_platform: {
  label: "Answers questions"
  style.stroke-dash: 3
  style.stroke: "#B0E0E6"
}

atm_system -> bill_payment: {
  label: "Allows payments"
  style.stroke: "#87CEEB"
}

kyc_system -> mobile_banking_api: {
  label: "Authenticates"
  style.stroke: "#800080"
}

notification_system -> investment_platform: {
  label: "Sends alerts"
  style.stroke-dash: 5
  style.stroke: "#2E8B57"
}` },
    ],
  });
  return () => stage.dispose();
};

export default mount;
