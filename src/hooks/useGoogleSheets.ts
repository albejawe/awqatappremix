import { useState, useEffect } from 'react';
import { TravelOffer } from '@/types/travel';

export function useGoogleSheets() {
  const [offers, setOffers] = useState<TravelOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        
        // Convert the HTML URL to CSV format
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTT8REX1P89_gmlI1Ep-_J-LN13ElvvFUD-fWXGbNSL-ufQv02TUpr8XeeQsktmEO8l1pwhA5axJLY6/pub?output=csv';
        
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const offersData: TravelOffer[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line.trim()) continue;
          
          // Simple CSV parsing (handles basic cases)
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          
          if (values.length < headers.length) continue;
          
          const offer: TravelOffer = {
            country: values[0] || '',
            offerName: values[1] || '',
            price: parseFloat(values[2]) || 0,
            ticketPrice: parseFloat(values[3]) || 0,
            price2: parseFloat(values[4]) || 0,
            price3: parseFloat(values[5]) || 0,
            price4: parseFloat(values[6]) || 0,
            priceChild: parseFloat(values[7]) || 0,
            hotel: values[8] || '',
            roomType: values[9] || '',
            flight: values[10] || '',
            departureDate: values[11] || '',
            departureTime: values[12] || '',
            returnDate: values[13] || '',
            returnTime: values[14] || '',
            photo1: values[15] || '',
            photo2: values[16] || '',
            photo3: values[17] || '',
            photo4: values[18] || '',
            photo5: values[19] || '',
            video: values[20] || '',
            note: values[24] || '', // Note is at index 24 based on the sheet structure
          };
          
          // Only add offers with valid data
          if (offer.country && offer.offerName) {
            offersData.push(offer);
          }
        }
        
        setOffers(offersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching Google Sheets data:', err);
        setError('فشل في تحميل البيانات');
        
        // Fallback mock data for development
        setOffers([
          {
            country: 'طرابزون',
            offerName: 'عرض طرابزون الرائع',
            price: 0,
            ticketPrice: 0,
            price2: 350,
            price3: 320,
            price4: 300,
            priceChild: 200,
            hotel: 'Radisson Blue Hotel Trabzon',
            roomType: 'غرفة ديلوكس',
            flight: 'الجزيرة للطيران',
            departureDate: '22-7-2025',
            departureTime: '04:40',
            returnDate: '1-8-2025',
            returnTime: '20:55',
            photo1: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=600&h=400&fit=crop',
            photo2: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=400&fit=crop',
            photo3: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop',
            photo4: '',
            photo5: '',
            video: 'https://www.youtube.com/watch?v=l3DlAzx10Hc',
            note: 'عرض ١١ يوم ١٠ ليالي ✈️ يشمل الطيران والإقامة'
          },
          {
            country: 'اسطنبول',
            offerName: 'عرض اسطنبول المميز',
            price: 75,
            ticketPrice: 0,
            price2: 220,
            price3: 215,
            price4: 210,
            priceChild: 150,
            hotel: 'The Elysium Taksim',
            roomType: 'غرفة ديلوكس',
            flight: 'الخطوط التركية',
            departureDate: '15-8-2025',
            departureTime: '14:30',
            returnDate: '25-8-2025',
            returnTime: '18:45',
            photo1: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop',
            photo2: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=600&h=400&fit=crop',
            photo3: '',
            photo4: '',
            photo5: '',
            video: '',
            note: 'عرض مميز لمدة 10 أيام يشمل الإقامة والطيران'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
}