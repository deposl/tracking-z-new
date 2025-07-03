import React from 'react';
import { TrackingData } from '../../hooks/useTracking';
import Button from '../ui/Button';
import { AlertTriangle, Package, Truck, MapPin } from 'lucide-react';
import TrackingTimeline from './TrackingTimeline';

interface TrackingResultProps {
  trackingData: TrackingData | null;
  error: string | null;
  onBack: () => void;
}

const TrackingResult: React.FC<TrackingResultProps> = ({ trackingData, error, onBack }) => {
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={onBack} variant="secondary">
          Try Again
        </Button>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading tracking information...</p>
      </div>
    );
  }

  return (
    <div className="tracking-result animate-fadeIn">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tracking Details</h3>
            <p className="text-gray-500 mt-1">Delivery by {trackingData.delivery_company}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            trackingData.status?.toLowerCase() === 'delivered' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {trackingData.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Package className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-900">Shipment Information</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Truck className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Courier: {trackingData.delivery_company}</span>
              </li>
              {trackingData.tracking_number && (
                <li className="flex items-center text-gray-600">
                  <Package className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Tracking #: {trackingData.tracking_number}</span>
                </li>
              )}
              {trackingData.tracking_updates?.[0]?.location && (
                <li className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Last Location: {trackingData.tracking_updates[0].location}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {trackingData.tracking_updates && trackingData.tracking_updates.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
          <TrackingTimeline updates={trackingData.tracking_updates} />
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button onClick={onBack} variant="secondary">
          Track Another Package
        </Button>
      </div>
    </div>
  );
};

export default TrackingResult;