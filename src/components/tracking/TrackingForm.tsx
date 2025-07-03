import React from 'react';
import { useForm } from '../../hooks/useForm';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface TrackingFormProps {
  onSubmit: (data: TrackingFormData) => void;
  isLoading: boolean;
}

export interface TrackingFormData {
  trackingNumber: string;
  phoneNumber?: string;
}

const TrackingForm: React.FC<TrackingFormProps> = ({ onSubmit, isLoading }) => {
  const { values, errors, handleChange, handleSubmit, validate } = useForm<TrackingFormData>(
    {
      trackingNumber: '',
      phoneNumber: '',
    },
    submitForm,
    validateForm
  );

  function validateForm(data: TrackingFormData) {
    const newErrors: Partial<Record<keyof TrackingFormData, string>> = {};

    if (!data.trackingNumber) {
      newErrors.trackingNumber = 'Tracking number is required';
    }

    if (data.phoneNumber && !/^\d*$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    }

    return newErrors;
  }

  function submitForm(data: TrackingFormData) {
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <Input
        label="Tracking Number"
        id="trackingNumber"
        name="trackingNumber"
        placeholder="Enter your tracking number"
        value={values.trackingNumber}
        onChange={handleChange}
        error={errors.trackingNumber}
        autoComplete="off"
      />
      
      <Input
        label="Phone Number (Optional)"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="Enter your phone number (optional)"
        value={values.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        autoComplete="off"
      />
      
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-4"
      >
        Track Package
      </Button>
    </form>
  );
};

export default TrackingForm