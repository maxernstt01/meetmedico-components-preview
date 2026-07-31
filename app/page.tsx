import Link from 'next/link';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { Typography } from 'design-system/src/components/Typography/Typography';
import { Button } from 'design-system/src/components/Button/Button';

export const metadata = {
  title: 'Welcome — MeetMedico Components',
};

export default function WelcomePage() {
  return (
    <div className="welcome">
      <div className="welcome__card">
        <Typography as="h1" variant="h1" weight="bold" style={{ display: 'block', marginBottom: 12 }}>
          Welcome to MeetMedico Components
        </Typography>
        <Typography as="p" variant="body" color="var(--neutral-600)" style={{ display: 'block', marginBottom: 24 }}>
          This is the shared home for every reusable UI component in the MeetMedico design system - built once,
          documented here, and used consistently across the whole platform.
        </Typography>

        <Typography as="h2" variant="h3" weight="bold" style={{ display: 'block', marginBottom: 8 }}>
          What you&apos;ll find here
        </Typography>
        <ul className="welcome__list">
          <li>A live preview of every component, rendered from the real design-system source.</li>
          <li>Auto-extracted props, so the documentation can never drift from the actual code.</li>
          <li>Real usage counts, git history, and test coverage for each component.</li>
          <li>Copy-paste-ready usage snippets to speed up development.</li>
        </ul>

        <Typography as="h2" variant="h3" weight="bold" style={{ display: 'block', margin: '20px 0 8px' }}>
          Purpose
        </Typography>
        <ul className="welcome__list">
          <li>Give developers and designers one visual reference for the whole component library.</li>
          <li>Encourage reuse and cut down on design/code duplication.</li>
          <li>Serve as living documentation for how each component behaves.</li>
        </ul>

        <Link href="/login" style={{ display: 'inline-block', marginTop: 24 }}>
          <Button variant="primary" size="lg">
            Go to Components
          </Button>
        </Link>
      </div>
    </div>
  );
}
