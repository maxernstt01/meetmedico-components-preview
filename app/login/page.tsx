'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// Deep-imported straight at each component's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { Card } from 'design-system/src/components/Card/Card';
import { Input } from 'design-system/src/components/Input/Input';
import { PasswordInput } from 'design-system/src/components/PasswordInput/PasswordInput';
import { Button } from 'design-system/src/components/Button/Button';
import { Typography } from 'design-system/src/components/Typography/Typography';
import { AUTH_STORAGE_KEY, DEFAULT_EMAIL, DEFAULT_PASSWORD } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim().toLowerCase() === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      router.push('/components');
      return;
    }
    setError('Invalid email or password.');
  };

  return (
    <div className="login">
      <Card variant="elevated" className="login__card">
        <Typography as="h1" variant="h2" weight="bold" style={{ display: 'block', marginBottom: 4 }}>
          <Typography as="span" variant="h2" weight="bold" color="var(--primary-600)">
            MeetMedico
          </Typography>{' '}
          Components
        </Typography>
        <Typography as="p" variant="body" color="var(--neutral-600)" style={{ display: 'block', marginBottom: 24 }}>
          Sign in to your components account
        </Typography>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-16)' }}>
          <Input
            label="Email ID"
            required
            type="email"
            placeholder={DEFAULT_EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
          />
          <PasswordInput
            label="Password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            error={Boolean(error)}
            helperText={error || undefined}
          />
          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
