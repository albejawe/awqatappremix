import { useState, useEffect } from 'react';
import { TravelCard } from '@/components/TravelCard';
import { FilterBar } from '@/components/FilterBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { TravelOffer } from '@/types/travel';
import { Plane, MapPin, Calendar, MessageCircle } from 'lucide-react';

const Index = () => {
  const { offers, loading, error } = useGoogleSheets();
  const [filteredOffers, setFilteredOffers] = useState<TravelOffer[]>([]);

  // Update filtered offers when offers change
  useEffect(() => {
    setFilteredOffers(offers);
  }, [offers]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">خطأ في التحميل</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-travel text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              أوقات للسفر والسياحة
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              اكتشف أجمل الوجهات السياحية مع أفضل العروض
            </p>
            <div className="flex justify-center items-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6" />
                <span>رحلات مميزة</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span>وجهات متنوعة</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>مواعيد مرنة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="animate-slide-up">
          <FilterBar 
            offers={offers} 
            onFilterChange={setFilteredOffers}
          />
        </div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              لا توجد عروض متاحة
            </h2>
            <p className="text-muted-foreground">
              جرب البحث بمصطلحات أخرى أو قم بمسح الفلاتر
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer, index) => (
              <div 
                key={`${offer.country}-${offer.offerName}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TravelCard offer={offer} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">أوقات للسفر والسياحة</h3>
          <p className="text-muted-foreground mb-4">
            نحن هنا لنجعل رحلتك تجربة لا تُنسى
          </p>
          <div className="flex justify-center items-center gap-4">
            <a 
              href="https://wa.me/96522289080" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              تواصل معنا
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;