import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelCard } from '@/components/TravelCard';
import { FilterBar } from '@/components/FilterBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { TravelOffer } from '@/types/travel';

const CategoryOffers = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { offers, loading, error } = useGoogleSheets();
  const [filteredOffers, setFilteredOffers] = useState<TravelOffer[]>([]);

  const decodedCountry = country ? decodeURIComponent(country) : '';

  useEffect(() => {
    if (offers.length > 0) {
      const categoryOffers = offers.filter(offer => offer.country === decodedCountry);
      setFilteredOffers(categoryOffers);
    }
  }, [offers, decodedCountry]);

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

  const categoryOffers = offers.filter(offer => offer.country === decodedCountry);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="mobile-header p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{decodedCountry}</h1>
            <p className="text-sm text-muted-foreground">
              {categoryOffers.length} عرض متاح
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 pb-8">
        {/* Filter Section */}
        <div className="mb-6">
          <FilterBar 
            offers={categoryOffers} 
            onFilterChange={setFilteredOffers}
          />
        </div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-muted-foreground mb-4">
              لا توجد عروض متاحة في {decodedCountry}
            </h2>
            <p className="text-muted-foreground mb-6">
              جرب البحث بمصطلحات أخرى أو تصفح الوجهات الأخرى
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              العودة للوجهات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default CategoryOffers;