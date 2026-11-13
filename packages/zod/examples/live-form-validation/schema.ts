// Signup schema and sample inputs for the live form validation demo
import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'At least 3 characters')
    .max(20, '20 characters max')
    .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers, underscore only'),
  email: z.email('Enter a valid email'),
  age: z.coerce.number().int('Must be a whole number').min(13, 'Must be 13 or older').max(120, "That can't be right"),
  website: z.url('Must be a valid URL').optional(),
});

export const FIELDS = ['username', 'email', 'age', 'website'] as const;
export type FieldName = (typeof FIELDS)[number];
export type FormValues = Record<FieldName, string>;

/** Inputs the gallery preview cycles through. */
export const SAMPLES: readonly FormValues[] = [
  { username: 'ada_lovelace', email: 'ada@example.com', age: '29', website: 'https://ada.dev' },
  { username: 'ad', email: 'ada@', age: '9', website: '' },
  { username: 'grace_h', email: 'grace@navy.mil', age: '45', website: '' },
];

/** Run the schema over raw field strings; website is only included when non-empty. */
export function validate(values: FormValues): {
  data: z.infer<typeof signupSchema> | null;
  errors: Partial<Record<FieldName, string>>;
} {
  const input: Record<string, string> = {
    username: values.username,
    email: values.email,
    age: values.age,
  };
  if (values.website.trim() !== '') input.website = values.website.trim();
  const result = signupSchema.safeParse(input);
  if (result.success) return { data: result.data, errors: {} };
  const errors: Partial<Record<FieldName, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && (FIELDS as readonly string[]).includes(key)) {
      const name = key as FieldName;
      if (!(name in errors)) errors[name] = issue.message;
    }
  }
  return { data: null, errors };
}
