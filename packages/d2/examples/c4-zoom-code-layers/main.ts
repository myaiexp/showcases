// Zooming in: code diagrams imported as layers, opened by links
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';
import { c4Models } from './models.ts';

const files = {
  'c4-models.d2': c4Models,
  'banking-code.d2': `api_server: |go
  func StartServer(port int) error
  func SetupRoutes(router *mux.Router)
  func AuthMiddleware(next http.Handler) http.Handler
|

graphql_handler: |go
  func NewHandler(schema *graphql.Schema) *Handler
  func ServeHTTP(w http.ResponseWriter, r *http.Request)
  func ExecuteQuery(query string, variables map[string]interface{}) *Result
|

resolvers: |go
  func AccountResolver(p graphql.ResolveParams) (interface{}, error)
  func TransactionResolver(p graphql.ResolveParams) (interface{}, error)
  func UserResolver(p graphql.ResolveParams) (interface{}, error)
|

schema: |go
  func BuildSchema() (*graphql.Schema, error)
  func RegisterTypes(schema *graphql.Schema)
  func RegisterQueries(schema *graphql.Schema)
  func RegisterMutations(schema *graphql.Schema)
|

clients: |go
  func NewAccountClient(baseURL string) *AccountClient
  func NewTransactionClient(baseURL string) *TransactionClient
  func (c *AccountClient) GetAccount(id string) (*Account, error)
  func (c *TransactionClient) ListTransactions(accountID string) ([]*Transaction, error)
|

api_server -> graphql_handler: {
  label: "uses"
}

graphql_handler -> resolvers: {
  label: "calls"
  style.stroke-dash: 3
}

graphql_handler -> schema: {
  label: "uses"
  style.stroke: "#4682B4"
}

resolvers -> clients: {
  label: "calls"
  style.stroke-width: 2
}

schema -> resolvers: {
  label: "references"
  style.stroke-dash: 5
  style.stroke: "#2E8B57"
}`,
  'notification-code.d2': `notification_manager: |go
  func NewNotificationManager(config *Config) *NotificationManager
  func (m *NotificationManager) SendNotification(userID string, message *Message) error
  func (m *NotificationManager) SendBulkNotifications(userIDs []string, message *Message) []error
|

channel_router: |go
  func NewChannelRouter(channels []Channel) *ChannelRouter
  func (r *ChannelRouter) RouteNotification(userID string, message *Message) (Channel, error)
  func (r *ChannelRouter) GetUserPreferences(userID string) (*UserPreferences, error)
|

email_channel: |go
  func NewEmailChannel(smtpConfig *SMTPConfig) *EmailChannel
  func (c *EmailChannel) Send(userID string, message *Message) error
  func (c *EmailChannel) FormatMessage(message *Message) (string, error)
|

sms_channel: |go
  func NewSMSChannel(twilioConfig *TwilioConfig) *SMSChannel
  func (c *SMSChannel) Send(userID string, message *Message) error
  func (c *SMSChannel) FormatMessage(message *Message) (string, error)
|

push_channel: |go
  func NewPushChannel(fcmConfig *FCMConfig) *PushChannel
  func (c *PushChannel) Send(userID string, message *Message) error
  func (c *PushChannel) FormatMessage(message *Message) (map[string]interface{}, error)
|

template_engine: |go
  func NewTemplateEngine(templateDir string) *TemplateEngine
  func (e *TemplateEngine) RenderTemplate(templateName string, data map[string]interface{}) (string, error)
  func (e *TemplateEngine) RegisterHelper(name string, helper interface{}) error
|

notification_manager -> channel_router: {
  label: "uses"
  style.stroke: "#FF6347"
}

channel_router -> email_channel: {
  label: "routes to"
  style.stroke-dash: 3
}

channel_router -> sms_channel: {
  label: "routes to"
  style.stroke-dash: 3
}

channel_router -> push_channel: {
  label: "routes to"
  style.stroke-dash: 3
}

email_channel -> template_engine: {
  label: "renders"
  style.stroke: "#4682B4"
}

sms_channel -> template_engine: {
  label: "renders"
  style.stroke: "#4682B4"
}

push_channel -> template_engine: {
  label: "renders"
  style.stroke: "#4682B4"
}`,
};

const components = `...@c4-models.d2
**: suspend
**: unsuspend {
  &class: customer-facing
}

notification_system.link: layers.notification
mobile_banking_api.link: layers.banking

layers: {
  banking: @banking-code
  notification: @notification-code
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click mobile_banking_api or notification_system to zoom into its code.' });
  playground(stage, {
    variants: [
      { label: 'Components: two of them link to code layers', files, code: components },
      { label: 'layers.banking (banking-code.d2)', files, code: components, options: { target: 'layers.banking' } },
      { label: 'layers.notification (notification-code.d2)', files, code: components, options: { target: 'layers.notification' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
