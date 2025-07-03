import React, { useState, useEffect } from 'react';
import TrackingForm, { TrackingFormData } from './TrackingForm';
import TrackingResult from './TrackingResult';
import { useTracking } from '../../hooks/useTracking';
import Card from '../ui/Card';


const TrackingPage: React.FC = () => {
  const { trackPackage, trackingData, isLoading, error, resetTracking } = useTracking();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingNumber = params.get('trackingNumber');
    const phoneNumber = params.get('PhoneNumber');

    if (trackingNumber) {
      trackPackage(trackingNumber, phoneNumber || undefined);
      setHasSearched(true);
    }
  }, []);

  const handleSubmit = async (data: TrackingFormData) => {
    await trackPackage(data.trackingNumber, data.phoneNumber);
    setHasSearched(true);
  };

  const handleBack = () => {
    resetTracking();
    setHasSearched(false);
    // Clear query parameters
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">Loading tracking information...</p>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <img width="120px" src="https://cdn.zada.lk/uploads/all/JfPAlnm1jxJNTqPLDcEwx8KSf46JsuFpIyjgRWJW.png"/>
      
          </div>
        </header>
        
        <main className="flex-1 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
            <Card className="mb-8 transform transition-all duration-500 ease-in-out hover:shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Delivery</h2>
                <p className="text-gray-600">
                  Enter your tracking number to get real-time updates on your package.
                </p>
              </div>
              
              {!hasSearched || !trackingData ? (
                <TrackingForm onSubmit={handleSubmit} isLoading={isLoading} />
              ) : (
                <TrackingResult 
                  trackingData={trackingData} 
                  error={error} 
                  onBack={handleBack}
                />
              )}
            </Card>
          </div>
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} <a href="https://zada.lk/">ZADA.LK.</a> All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TrackingPage;