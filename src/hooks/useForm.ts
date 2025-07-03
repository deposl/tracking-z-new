import { useState, ChangeEvent, FormEvent } from 'react';

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate: (values: T) => ValidationErrors<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate field on change
    const validationErrors = validate(values);
    setErrors({
      ...errors,
      [name]: validationErrors[name as keyof T],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(values).forEach((key) => {
      allTouched[key as keyof T] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // If no errors, submit
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    resetForm,
    validate,
  };
}