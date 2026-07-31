import { notFound } from 'next/navigation';
import { COMPONENTS, findComponent } from '@/lib/registry';
import { getProps } from '@/lib/introspection/getProps';
import { getGitLog } from '@/lib/introspection/getGitLog';
import { getTestCases } from '@/lib/introspection/getTestCases';
import { getUsageCount } from '@/lib/introspection/getUsageCount';
import { getGlobalStats } from '@/lib/stats';
import { ComponentTabs } from '@/components/ComponentTabs';
import { StatsBar } from '@/components/StatsBar';
// Deep-imported straight at Typography's own file (never through
// design-system's barrel) - same reasoning as every previews/*.tsx file.
import { Typography } from 'design-system/src/components/Typography/Typography';
import { PREVIEW_MODULES } from './previews/registry';

export function generateStaticParams() {
  return COMPONENTS.filter((c) => c.wired).map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = findComponent(slug);
  if (!meta) notFound();

  const mod = PREVIEW_MODULES[meta.slug];

  if (!meta.wired || !mod) {
    return (
      <div className="container">
        <Typography as="h1" variant="h1" weight="bold">
          {meta.name}
        </Typography>
        <Typography as="p" variant="body">
          This component isn't wired into the preview yet.
        </Typography>
      </div>
    );
  }

  const props = getProps(meta.name);
  const gitLog = getGitLog(meta.name);
  const tests = getTestCases(meta.name);
  const usage = getUsageCount(meta.name);
  const stats = getGlobalStats();

  return (
    <div className="container">
      <StatsBar stats={stats} />
      <Typography as="h1" variant="h1" weight="bold" style={{ display: 'block', marginBottom: 16 }}>
        {meta.name}
      </Typography>
      <ComponentTabs
        name={meta.name}
        PreviewComponent={mod.default}
        code={mod.CODE}
        props={props}
        usage={usage}
        gitLog={gitLog}
        tests={tests}
      />
    </div>
  );
}
