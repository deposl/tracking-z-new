import { useState } from 'react';

export interface TrackingUpdate {
  date: string;
  time: string;
  location: string | null;
  status: string;
  description: string;
}

export interface TrackingData {
  delivery_company: string;
  tracking_number: string | null;
  customer_phone: string | null;
  status: string;
  tracking_updates: TrackingUpdate[];
}

export const useTracking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trackPackage = async (trackingNumber: string, phoneNumber?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = `https://n8n-n8n.hnxdau.easypanel.host/webhook/path?trackingNumber=${encodeURIComponent(trackingNumber)}${phoneNumber ? `&PhoneNumber=${encodeURIComponent(phoneNumber)}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tracking data: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTrackingData(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Tracking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTracking = () => {
    setTrackingData(null);
    setError(null);
  };

  return {
    trackPackage,
    resetTracking,
    isLoading,
    trackingData,
    error
  };
};