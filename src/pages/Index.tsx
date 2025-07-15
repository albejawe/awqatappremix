import { useState, useEffect } from 'react';
import { CategoryGrid } from '@/components/CategoryGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { Plane, MapPin, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const { offers, loading, error } = useGoogleSheets();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter offers based on search
  const filteredOffers = searchTerm 
    ? offers.filter(offer =>
        offer.country.includes(searchTerm) ||
        offer.offerName.includes(searchTerm)
      )
    : offers;

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
      {/* Mobile App Hero Section */}
      <div className="bg-gradient-travel text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              أوقات للسفر والسياحة
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              اختر وجهتك المفضلة واكتشف أفضل العروض
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                placeholder="ابحث عن الوجهة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full"
              />
            </div>

            <div className="flex justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>رحلات مميزة</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>وجهات متنوعة</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>مواعيد مرنة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">اختر وجهتك</h2>
            <p className="text-muted-foreground">
              {filteredOffers.length > 0 
                ? `${Array.from(new Set(filteredOffers.map(o => o.country))).length} وجهة متاحة`
                : 'جاري التحميل...'
              }
            </p>
          </div>

          <div className="animate-slide-up">
            <CategoryGrid offers={filteredOffers} />
          </div>

          {filteredOffers.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                لا توجد نتائج للبحث "{searchTerm}"
              </h3>
              <p className="text-muted-foreground">
                جرب البحث بمصطلحات أخرى
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;