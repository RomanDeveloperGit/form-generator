import { z } from 'zod';

import { StringValidationLength } from '@/constants/validations';

export const fieldSchema = z.object({
  name: z
    .string({
      required_error: 'Название поля не может быть пустым.',
    })
    .refine(
      (value) => {
        return (
          value.length >= StringValidationLength.Min &&
          value.length <= StringValidationLength.Max
        );
      },
      {
        message: `Название поля должно содержать от ${StringValidationLength.Min} до ${StringValidationLength.Max} символов.`,
      },
    ),
  placeholder: z
    .string()
    .refine(
      (value) => {
        if (!value || !value.length) return true;

        return (
          value.length >= StringValidationLength.Min &&
          value.length <= StringValidationLength.Max
        );
      },
      {
        message: `Параметр "placeholder" должен содержать от ${StringValidationLength.Min} до ${StringValidationLength.Max} символов, либо остаться незаполненным.`,
      },
    ),
  defaultValue: z
    .string()
    .refine(
      (value) => {
        if (!value || !value.length) return true;

        return (
          value.length >= StringValidationLength.Min &&
          value.length <= StringValidationLength.Max
        );
      },
      {
        message: `Параметр "defaultValue" должен содержать от ${StringValidationLength.Min} до ${StringValidationLength.Max} символов, либо остаться незаполненным.`,
      },
    ),
});

export type FieldSchema = z.infer<typeof fieldSchema>;
