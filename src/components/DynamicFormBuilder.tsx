import React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { RequiredLabel, RoundedTextField } from "../utils/StyledComponents";
import NumberInput from "../components/NumberInput";
import type z from "zod";
// @ts-ignore
import CustomDatePicker from "../components/CustomDatePicker";
import { toPersianDigits } from "../utils/numberConversions";

export interface FormField {
  title: string;
  label: string;
  type: "text" | "number" | "tel" | "email" | "select" | "date" | "textarea";
  required?: boolean;
  notEditable?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: (schema: z.ZodString) => z.ZodString;
}

interface DynamicFormBuilderProps {
  formFields: FormField[];
  formMethods: UseFormReturn<any>;
  formId?: string;
  className?: string;
}

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  formFields,
  formMethods,
  formId = "dynamic-form",
  className = "",
}) => {
  const {
    control,
    formState: { errors },
  } = formMethods;

  const renderField = (field: FormField) => {
    const commonProps = {
      key: field.title,
      error: !!errors[field.title],
      helperText: errors[field.title]?.message as string,
      placeholder: field.placeholder,
      fullWidth: true,
      size: "small" as const,
      disabled: field.notEditable,
    };

    if (field.type === "number" || field.type === "tel") {
      return (
        <Controller
          name={field.title}
          control={control}
          render={({ field: controllerField }) => (
            <NumberInput
              value={toPersianDigits(controllerField.value ?? "")}
              onChange={(val) =>
                !field.notEditable && controllerField.onChange(val)
              }
              label={field.label}
              error={!!errors[field.title]}
              helperText={errors[field.title]?.message as string}
              required={field.required}
              disabled={field.notEditable}
            />
          )}
        />
      );
    }

    if (field.type === "date") {
      return (
        <Controller
          name={field.title}
          control={control}
          render={({ field: controllerField }) => (
            <CustomDatePicker
              label={field.label}
              value={controllerField.value}
              onChange={(dateTime: any) =>
                !field.notEditable && controllerField.onChange(dateTime)
              }
              error={!!errors[field.title]}
              helperText={errors[field.title]?.message}
              disabled={field.notEditable}
            />
          )}
        />
      );
    }

    switch (field.type) {
      case "select":
        return (
          <Controller
            name={field.title}
            control={control}
            render={({ field: controllerField }) => (
              <FormControl
                error={!!errors[field.title]}
                fullWidth
                size="small"
                disabled={field.notEditable}
              >
                <InputLabel>
                  {field.required ? (
                    <RequiredLabel>{field.label}</RequiredLabel>
                  ) : (
                    field.label
                  )}
                </InputLabel>
                <Select
                  {...controllerField}
                  label={field.label}
                  value={controllerField.value ?? ""}
                  sx={{ borderRadius: "8px" }}
                  MenuProps={{
                    PaperProps: {
                      sx: { textAlign: "right" },
                    },
                  }}
                  renderValue={(selected) => (
                    <span style={{ display: "block", textAlign: "right" }}>
                      {toPersianDigits(
                        field.options?.find((o) => o.value === selected)
                          ?.label || selected
                      )}
                    </span>
                  )}
                >
                  {field.options?.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ textAlign: "right" }}
                    >
                      {toPersianDigits(option.label)}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.title] && (
                  <FormHelperText>
                    {errors[field.title]?.message as string}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={field.title}
            control={control}
            render={({ field: controllerField }) => (
              <RoundedTextField
                {...commonProps}
                {...controllerField}
                value={toPersianDigits(controllerField.value ?? "")}
                onChange={(e) =>
                  !field.notEditable && controllerField.onChange(e.target.value)
                }
                label={
                  field.required ? (
                    <RequiredLabel>{field.label}</RequiredLabel>
                  ) : (
                    field.label
                  )
                }
                multiline
                rows={3}
                inputProps={{
                  style: { textAlign: "right" },
                  readOnly: field.notEditable,
                }}
              />
            )}
          />
        );

      default:
        return (
          <Controller
            name={field.title}
            control={control}
            render={({ field: controllerField }) => (
              <RoundedTextField
                {...commonProps}
                {...controllerField}
                type={field.type}
                value={toPersianDigits(controllerField.value ?? "")}
                onChange={(e) =>
                  !field.notEditable && controllerField.onChange(e.target.value)
                }
                label={
                  field.required ? (
                    <RequiredLabel>{field.label}</RequiredLabel>
                  ) : (
                    field.label
                  )
                }
                inputProps={{
                  style: { textAlign: "right" },
                  readOnly: field.notEditable,
                }}
              />
            )}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`} id={formId}>
      {formFields.map(renderField)}
    </div>
  );
};

export default DynamicFormBuilder;
