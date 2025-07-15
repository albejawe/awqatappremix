import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Package } from 'lucide-react';

interface CategoryCardProps {
  country: string;
  offerCount: number;
  image: string;
  onClick: () => void;
}

export function CategoryCard({ country, offerCount, image, onClick }: CategoryCardProps) {
  return (
    <Card className="category-card" onClick={onClick}>
      <div className="relative mb-4">
        <img
          src={image}
          alt={country}
          className="w-full h-32 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-semibold text-gray-800">{offerCount} عروض</span>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-card-foreground">{country}</h3>
        </div>
        
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Package className="w-4 h-4" />
          <span>اكتشف العروض المتاحة</span>
        </div>
      </CardContent>
    </Card>
  );
}