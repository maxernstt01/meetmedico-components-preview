import { cardsForPlatform } from '@/lib/cardsRegistry';
import { getCardsStats } from '@/lib/stats';
// Deep-imported straight at EmptyState's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { EmptyState } from 'design-system/src/components/EmptyState/EmptyState';
import { CardsStatsBar } from '@/components/CardsStatsBar';
import { CardsWebGrid } from './CardsWebGrid';

export const metadata = {
  title: 'Cards — Web application — MeetMedico',
};

// Full page-level UI templates (Login, Register, ...) tagged "Web
// application" - built from real design-system components in
// MeetMedicoComponent's src/cards/ folder.
export default function CardsWebPage() {
  const cards = cardsForPlatform('web');
  const stats = getCardsStats('web');

  return (
    <div className="container container--full">
      <CardsStatsBar stats={stats} basePath="/cards/web" />

      {cards.length === 0 ? (
        <EmptyState
          preset="noData"
          title="No web application cards yet"
          description="Full-page UI templates like Login and Register will show up here once they're added."
        />
      ) : (
        <CardsWebGrid />
      )}
    </div>
  );
}
