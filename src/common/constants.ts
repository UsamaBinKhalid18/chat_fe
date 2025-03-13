import { IMAGES } from 'src/assets/images';

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

export type AIModelType = {
  name: string;
  iconUrl: string;
};

export const aiModels: AIModelType[] = [
  { name: 'Google Gemini 1.5', iconUrl: IMAGES.gemini },
  { name: 'OpenAI GPT 4o Mini', iconUrl: IMAGES.gpt },
  { name: 'OpenAI GPT 4o', iconUrl: IMAGES.gpt },
  { name: 'Anthropic Claude', iconUrl: IMAGES.claude },
];
