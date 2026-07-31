import { COMPONENTS } from '@/lib/registry';
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
import { PREVIEW_MODULES } from './[slug]/previews/registry';

export const metadata = {
  title: 'Components — MeetMedico',
};

// All 51 wired components stacked on one scrollable page, each anchored by
// its own slug (id={c.slug}) - the sidebar links here with a `#slug` hash
// instead of routing to a separate page per component. The old
// /components/[slug] pages still exist and still work for direct/shareable
// links; this is the new primary browsing view.
export default function ComponentsIndexPage() {
  const stats = getGlobalStats();
  const wired = COMPONENTS.filter((c) => c.wired && PREVIEW_MODULES[c.slug]);

  return (
    <div className="container container--full">
      <StatsBar stats={stats} />

      {wired.map((meta) => {
        const mod = PREVIEW_MODULES[meta.slug];
        const props = getProps(meta.name);
        const gitLog = getGitLog(meta.name);
        const tests = getTestCases(meta.name);
        const usage = getUsageCount(meta.name);

        return (
          <section key={meta.slug} id={meta.slug} className="component-block">
            <Typography as="h2" variant="h1" weight="bold" style={{ display: 'block', marginBottom: 16 }}>
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
          </section>
        );
      })}
    </div>
  );
}
