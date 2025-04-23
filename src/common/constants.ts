export const errorCodes = {
  UNAUTHORIZED_CODE: 401,
};
export const TOKEN_KEYS = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  USER: 'user',
};

export const CLAUSES = {
  VALID_EMAIL: 'Enter a valid email',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  FIRST_NAME_REQUIRED: 'First name is required',
  LAST_NAME_REQUIRED: 'Last name is required',
};

export type ModelIcons = 'gemini' | 'gpt' | 'anthropic' | 'deepseek';

export type AIModelType = {
  name: string;
  model: string;
  icon: ModelIcons;
  description: string;
  isPro: boolean;
};

export const aiModels: AIModelType[] = [
  {
    name: 'Google Gemini 2.0 Flash',
    model: 'gemini',
    icon: 'gemini',
    description: `Google's latest and fastest model`,
    isPro: false,
  },
  {
    name: 'OpenAI GPT-4o-Mini',
    model: 'gpt-4o-mini',
    icon: 'gpt',
    description: `OpenAI's fastest compact model`,
    isPro: false,
  },
  {
    name: 'OpenAI GPT o3-mini',
    icon: 'gpt',
    model: 'gpt-o3-mini',
    description: `OpenAI's efficient reasoning model`,
    isPro: true,
  },
  // {
  //   name: 'OpenAI GPT o3-mini (High)',
  //   icon: 'gpt',
  //   model: 'gpt-o3-mini-high',
  //   description: `OpenAI's best reasoning model`,
  //   isPro: true,
  // },
  {
    name: 'DeepSeek R1',
    icon: 'deepseek',
    model: 'deepseek',
    description: `Model optimized for reasoning tasks`,
    isPro: true,
  },
  {
    name: 'OpenAI GPT-4o',
    icon: 'gpt',
    model: 'gpt-4o',
    description: `OpenAI's most advanced model`,
    isPro: true,
  },
  {
    name: 'Anthropic Claude 3.7 Sonnet',
    icon: 'anthropic',
    model: 'claude',
    description: `Anthropic's most advanced model`,
    isPro: true,
  },
];

export type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  description: string;
  discount: number;
  previousPrice: number;
  frequency: string;
  per: string;
};
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Pro Monthly',
    price: 20,
    description: 'Get a taste of pro membership and enjoy unlimited chats for one month.',
    discount: 0,
    previousPrice: 0,
    frequency: 'monthly',
    per: 'month',
  },
  {
    id: 2,
    name: 'Pro Quarterly',
    price: 14,
    description: 'Enjoy access to pro member features and unlimited chats for 3 months.',
    discount: 30,
    previousPrice: 20,
    frequency: 'quarterly',
    per: 'quarter',
  },
  {
    id: 3,
    name: 'Pro Yearly',
    price: 7.08,
    description:
      'Get the best value for your money. Enjoy unlimited chats and pro member features for a year.',
    discount: 69,
    previousPrice: 20,
    frequency: 'yearly',
    per: 'year',
  },
];
