import { getCardsStats } from '@/lib/stats';
import { CardsStatsBar } from '@/components/CardsStatsBar';

export const metadata = {
  title: 'Cards — Mobile App — MeetMedico',
};

// The grid below is intentionally left blank for now, per request - Mobile
// App cards are a future addition, not started yet. The stats bar still
// shows (all zeros) for the same reason the Web tab's does: real numbers,
// not hidden just because they're currently zero.
export default function CardsMobilePage() {
  const stats = getCardsStats('mobile');

  return (
    <div className="container container--full">
      <CardsStatsBar stats={stats} basePath="/cards/mobile" />
    </div>
  );
}
