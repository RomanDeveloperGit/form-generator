import { z } from 'zod';

export const formNameSchema = z.object({
  name: z
    .string({
      required_error: 'Название формы не может быть пустым.',
    })
    .min(3, {
      message: 'Название формы должно содержать мининимум 3 символа.',
    })
    .max(50, {
      message: 'Название формы должно содержать максимум 50 символов.',
    }),
});

export type FormNameSchemaFields = z.infer<typeof formNameSchema>;
