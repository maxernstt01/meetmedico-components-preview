import { getGlobalStats } from '@/lib/stats';
import { getHardcodedValues } from '@/lib/introspection/getHardcodedValues';
import { OverviewContent } from '@/components/OverviewContent';

export default function OverviewPage() {
  const stats = getGlobalStats();
  const hardcoded = getHardcodedValues();

  return <OverviewContent stats={stats} hardcoded={hardcoded} />;
}
