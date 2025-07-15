import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Plane, Hotel, Users, Baby, MessageCircle, Play } from 'lucide-react';
import { TravelOffer } from '@/types/travel';
import { ImageSlider } from './ImageSlider';
import { VideoModal } from './VideoModal';

interface TravelCardProps {
  offer: TravelOffer;
}

export function TravelCard({ offer }: TravelCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const photos = [offer.photo1, offer.photo2, offer.photo3, offer.photo4, offer.photo5].filter(Boolean);
  
  const formatPrice = (price: number) => {
    return price > 0 ? `${price} د.ك` : 'غير متوفر';
  };

  const handleBookNow = () => {
    const message = `مرحباً، أريد حجز ${offer.offerName} إلى ${offer.country}`;
    const whatsappUrl = `https://wa.me/96522289080?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <>
      <Card className="travel-card animate-fade-in group">
        <div className="relative">
          <ImageSlider photos={photos} alt={offer.offerName} />
          
          {/* Country Badge */}
          <Badge className="absolute top-4 right-4 bg-gradient-ocean text-white shadow-soft">
            <MapPin className="w-3 h-3 ml-1" />
            {offer.country}
          </Badge>
          
          {/* Video Play Button */}
          {offer.video && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
              {offer.offerName}
            </h3>

            {/* Pricing Grid */}
            <div className="grid grid-cols-2 gap-3">
              {offer.price2 > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Users className="w-4 h-4 ml-1" />
                    شخصين
                  </span>
                  <span className="price-tag">{formatPrice(offer.price2)}</span>
                </div>
              )}
              
              {offer.price3 > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Users className="w-4 h-4 ml-1" />
                    ثلاثة أشخاص
                  </span>
                  <span className="price-tag">{formatPrice(offer.price3)}</span>
                </div>
              )}
              
              {offer.price4 > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Users className="w-4 h-4 ml-1" />
                    أربعة أشخاص
                  </span>
                  <span className="price-tag">{formatPrice(offer.price4)}</span>
                </div>
              )}
              
              {offer.priceChild > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Baby className="w-4 h-4 ml-1" />
                    الطفل
                  </span>
                  <span className="price-tag">{formatPrice(offer.priceChild)}</span>
                </div>
              )}
            </div>

            {/* Hotel Info */}
            {offer.hotel && (
              <div className="flex items-center p-3 bg-muted rounded-lg">
                <Hotel className="w-4 h-4 ml-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{offer.hotel}</p>
                  {offer.roomType && (
                    <p className="text-xs text-muted-foreground">{offer.roomType}</p>
                  )}
                </div>
              </div>
            )}

            {/* Flight Info */}
            {offer.flight && (
              <div className="flex items-center p-3 bg-muted rounded-lg">
                <Plane className="w-4 h-4 ml-2 text-muted-foreground" />
                <p className="text-sm">{offer.flight}</p>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 gap-3">
              {offer.departureDate && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 ml-1" />
                    المغادرة
                  </span>
                  <div className="text-sm">
                    <span className="font-medium">{offer.departureDate}</span>
                    {offer.departureTime && (
                      <span className="flex items-center text-muted-foreground mr-2">
                        <Clock className="w-3 h-3 ml-1" />
                        {offer.departureTime}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {offer.returnDate && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 ml-1" />
                    العودة
                  </span>
                  <div className="text-sm">
                    <span className="font-medium">{offer.returnDate}</span>
                    {offer.returnTime && (
                      <span className="flex items-center text-muted-foreground mr-2">
                        <Clock className="w-3 h-3 ml-1" />
                        {offer.returnTime}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Note */}
            {offer.note && (
              <div className="p-3 bg-accent/10 rounded-lg border-r-4 border-accent">
                <p className="text-sm text-accent-foreground">{offer.note}</p>
              </div>
            )}

            {/* Book Now Button */}
            <Button 
              className="w-full btn-secondary"
              onClick={handleBookNow}
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              احجز الآن عبر واتساب
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Modal */}
      {offer.video && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoId={getYouTubeVideoId(offer.video)}
          title={offer.offerName}
        />
      )}
    </>
  );
}