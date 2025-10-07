import { z } from "zod";
import type { FormField } from "../components/DynamicFormBuilder";

export const useDynamicForm = (formFields: FormField[]) => {
  const createDynamicSchema = (fields: FormField[]) => {
    const schema: any = {};

    fields.forEach((field) => {
      if (field.required) {
        let fieldSchema = z
          .string({ error: `وارد کردن ${field.label} الزامی است.` })
          .min(1, {
            message: `وارد کردن ${field.label} الزامی است.`,
          });

        switch (field.type) {
          case "email":
            fieldSchema = fieldSchema.email({
              message: "فرمت ایمیل نامعتبر است.",
            });
            break;
          case "number":
          case "tel":
            fieldSchema = fieldSchema.regex(/^\d+$/, {
              message: "فقط عدد مجاز است.",
            });
            break;
        }

        schema[field.title] = fieldSchema;
      } else {
        let fieldSchema = z.string().optional();

        switch (field.type) {
          case "email":
            fieldSchema = fieldSchema.refine(
              (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
              { message: "فرمت ایمیل نامعتبر است." }
            );
            break;
          case "number":
          case "tel":
            fieldSchema = fieldSchema.refine(
              (val) => !val || /^\d+$/.test(val),
              { message: "فقط عدد مجاز است." }
            );
            break;
        }

        schema[field.title] = fieldSchema;
      }

      if (field.validation) {
        schema[field.title] = field.validation(schema[field.title]);
      }
    });

    return z.object(schema);
  };

  const dynamicSchema = createDynamicSchema(formFields);

  return {
    schema: dynamicSchema,
    formFields,
  };
};
