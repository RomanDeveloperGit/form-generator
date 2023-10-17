import { z } from 'zod';

import { StringValidationLength } from '@/constants/validations';

export const formNameSchema = z.object({
  name: z
    .string({
      required_error: 'Название формы не может быть пустым.',
    })
    .refine(
      (value) => {
        return (
          value.length >= StringValidationLength.Min &&
          value.length <= StringValidationLength.Max
        );
      },
      {
        message: `Название формы должно содержать от ${StringValidationLength.Min} до ${StringValidationLength.Max} символов.`,
      },
    ),
});

export type FormNameSchema = z.infer<typeof formNameSchema>;
