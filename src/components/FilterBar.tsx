import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { TravelOffer } from '@/types/travel';

interface FilterBarProps {
  offers: TravelOffer[];
  onFilterChange: (filteredOffers: TravelOffer[]) => void;
}

export function FilterBar({ offers, onFilterChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Get unique countries
  const countries = Array.from(new Set(offers.map(offer => offer.country)));

  const applyFilters = (search: string, country: string | null) => {
    let filtered = offers;

    if (search) {
      filtered = filtered.filter(offer =>
        offer.offerName.includes(search) ||
        offer.country.includes(search) ||
        offer.hotel.includes(search) ||
        offer.note.includes(search)
      );
    }

    if (country) {
      filtered = filtered.filter(offer => offer.country === country);
    }

    onFilterChange(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, selectedCountry);
  };

  const handleCountrySelect = (country: string) => {
    const newCountry = selectedCountry === country ? null : country;
    setSelectedCountry(newCountry);
    applyFilters(searchTerm, newCountry);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry(null);
    onFilterChange(offers);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="ابحث عن الوجهة أو الفندق..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pr-10 text-right"
        />
      </div>

      {/* Country Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          الوجهات:
        </div>
        
        {countries.map((country) => (
          <Button
            key={country}
            variant={selectedCountry === country ? "default" : "outline"}
            size="sm"
            onClick={() => handleCountrySelect(country)}
            className="text-sm"
          >
            {country}
          </Button>
        ))}
        
        {(searchTerm || selectedCountry) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 ml-1" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCountry) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">الفلاتر النشطة:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              البحث: {searchTerm}
              <button 
                onClick={() => handleSearchChange('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {selectedCountry && (
            <Badge variant="secondary" className="gap-1">
              {selectedCountry}
              <button 
                onClick={() => handleCountrySelect(selectedCountry)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}