import { useState, useEffect } from 'react';
import { SALON_INFO } from '../config/salonInfo';

interface SalonStatus {
  isOpen: boolean;
  isJummahBreak: boolean;
  badgeText: string;
  detailText: string;
}

export function useSalonStatus(): SalonStatus {
  const [status, setStatus] = useState<SalonStatus>({
    isOpen: true,
    isJummahBreak: false,
    badgeText: 'Open Now',
    detailText: 'Closes tonight at 11:00 PM',
  });

  useEffect(() => {
    function computeStatus(): SalonStatus {
      // Calculate current date/time in Pakistan (UTC+5)
      const now = new Date();
      // Format to get Pakistan local parts
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);

      let day = '';
      let hour = 12;
      let minute = 0;

      for (const p of parts) {
        if (p.type === 'weekday') day = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
      }

      const isFriday = day === 'Fri';
      const timeDecimal = hour + minute / 60;

      const openHour = SALON_INFO.timings.openHour; // 11
      const closeHour = SALON_INFO.timings.closeHour; // 23
      const jummahStart = SALON_INFO.timings.fridayJummahStart; // 13
      const jummahEnd = SALON_INFO.timings.fridayJummahEnd; // 15

      if (isFriday) {
        if (timeDecimal >= jummahStart && timeDecimal < jummahEnd) {
          return {
            isOpen: false,
            isJummahBreak: true,
            badgeText: 'Jummah Break',
            detailText: 'Reopens at 3:00 PM today',
          };
        }
      }

      if (timeDecimal >= openHour && timeDecimal < closeHour) {
        return {
          isOpen: true,
          isJummahBreak: false,
          badgeText: 'Open Now',
          detailText: isFriday && timeDecimal < jummahStart
            ? 'Jummah break starts at 1:00 PM'
            : 'Open until 11:00 PM tonight',
        };
      }

      // If earlier than openHour
      if (timeDecimal < openHour) {
        return {
          isOpen: false,
          isJummahBreak: false,
          badgeText: 'Closed Now',
          detailText: 'Opens today at 11:00 AM',
        };
      }

      // After closeHour
      return {
        isOpen: false,
        isJummahBreak: false,
        badgeText: 'Closed Now',
        detailText: 'Opens tomorrow at 11:00 AM',
      };
    }

    setStatus(computeStatus());
    const interval = setInterval(() => {
      setStatus(computeStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return status;
}

