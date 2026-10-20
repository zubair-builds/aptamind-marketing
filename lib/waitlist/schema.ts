import { z } from 'zod';

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().max(max).optional(),
  );

export const useCases = [
  'company-sales',
  'market-competitive',
  'opportunity-discovery',
  'something-else',
] as const;

export const attributionSchema = z
  .object({
    utm_source: optionalText(100),
    utm_medium: optionalText(100),
    utm_campaign: optionalText(120),
    utm_content: optionalText(120),
    utm_term: optionalText(120),
  })
  .strict()
  .optional();

export const waitlistSubmissionSchema = z
  .object({
    email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(254),
    role: optionalText(120),
    company: optionalText(160),
    useCase: z.enum(useCases).optional(),
    marketingConsent: z.boolean().default(false),
    startedAt: z.number().int().positive(),
    website: z.string().max(0).optional().default(''),
    attribution: attributionSchema,
  })
  .strict();

export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>;

export type WaitlistRecord = Omit<WaitlistSubmission, 'email' | 'website' | 'startedAt'> & {
  emailNormalized: string;
  consentRecordedAt?: Date;
  createdAt: Date;
};
