'use client';

import { useState } from 'react';
// Deep-imported straight at Button's own file (never through design-system's
// barrel) - same reasoning as every previews/*.tsx file.
import { Button } from 'design-system/src/components/Button/Button';

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="code-block">
      <div className="code-block__copy">
        <Button
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? 'Copied' : 'Copy Code'}
        </Button>
      </div>
      <code>{code}</code>
    </div>
  );
}
