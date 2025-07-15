import { CategoryCard } from '@/components/CategoryCard';
import { TravelOffer } from '@/types/travel';
import { useNavigate } from 'react-router-dom';

interface CategoryGridProps {
  offers: TravelOffer[];
}

export function CategoryGrid({ offers }: CategoryGridProps) {
  const navigate = useNavigate();
  
  // Group offers by country and get first image for each
  const categories = offers.reduce((acc, offer) => {
    if (!acc[offer.country]) {
      acc[offer.country] = {
        count: 0,
        image: offer.photo1 || 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop'
      };
    }
    acc[offer.country].count++;
    return acc;
  }, {} as Record<string, { count: number; image: string }>);

  const handleCategoryClick = (country: string) => {
    navigate(`/category/${encodeURIComponent(country)}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(categories).map(([country, data], index) => (
        <div 
          key={country}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CategoryCard
            country={country}
            offerCount={data.count}
            image={data.image}
            onClick={() => handleCategoryClick(country)}
          />
        </div>
      ))}
    </div>
  );
}