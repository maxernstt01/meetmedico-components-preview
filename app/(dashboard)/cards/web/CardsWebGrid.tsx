'use client';

// Deep-imported straight at each card's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
// Login/Register use useState internally, so - like every stateful
// MeetMedicoComponent source file - they need a client boundary; this file
// is that boundary for the Server Component page.tsx that renders it.
import { Login } from 'design-system/src/cards/Login/Login';
import { Register } from 'design-system/src/cards/Register/Register';
import { CardShowcase } from '@/components/CardShowcase';

export function CardsWebGrid() {
  return (
    <div className="cardsGrid">
      <section id="login" className="component-block">
        <CardShowcase title="Login">
          <Login />
        </CardShowcase>
      </section>

      <section id="register" className="component-block">
        <CardShowcase title="Register">
          <Register />
        </CardShowcase>
      </section>
    </div>
  );
}
