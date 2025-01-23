import { CLAUSES } from 'src/common/constants.ts';
import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().email(CLAUSES.VALID_EMAIL).required(CLAUSES.EMAIL_REQUIRED),
  password: string().required(CLAUSES.PASSWORD_REQUIRED),
});

export const signupSchema = object().shape({
  email: string().email(CLAUSES.VALID_EMAIL).required(CLAUSES.EMAIL_REQUIRED),
  password: string().required(CLAUSES.PASSWORD_REQUIRED),
  firstName: string().required(CLAUSES.FIRST_NAME_REQUIRED),
  lastName: string().required(CLAUSES.LAST_NAME_REQUIRED),
});
