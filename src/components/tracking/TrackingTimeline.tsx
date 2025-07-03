import React from 'react';
import { TrackingUpdate } from '../../hooks/useTracking';
import { CheckCircle, Truck, Package, MapPin } from 'lucide-react';

interface TrackingTimelineProps {
  updates: TrackingUpdate[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ updates }) => {
  const getStatusIcon = (status: string | null | undefined) => {
    if (!status) {
      return <MapPin className="h-6 w-6 text-gray-500" />;
    }
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (statusLower.includes('transit') || statusLower.includes('dispatch')) {
      return <Truck className="h-6 w-6 text-blue-500" />;
    } else if (statusLower.includes('branch') || statusLower.includes('scan')) {
      return <Package className="h-6 w-6 text-yellow-500" />;
    } else {
      return <MapPin className="h-6 w-6 text-gray-500" />;
    }
  };

  const toProperCase = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {updates.map((update, idx) => (
          <li key={idx}>
            <div className="relative pb-8">
              {idx !== updates.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getStatusIcon(update.status)}
                  </div>
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-gray-500">
                    <div className="font-medium text-gray-900">{update.status ? toProperCase(update.status) : ''}</div>
                    <div className="mt-1 text-sm text-gray-600 flex flex-col sm:flex-row sm:gap-4">
                      {update.location && (
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {toProperCase(update.location)}
                        </span>
                      )}
                      <span className="flex items-center mt-1 sm:mt-0">
                        {update.date} {update.time}
                      </span>
                    </div>
                    {update.description && update.description !== update.status && (
                      <p className="mt-2 text-sm text-gray-600">{toProperCase(update.description)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackingTimeline;