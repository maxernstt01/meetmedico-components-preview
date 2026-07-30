import { redirect } from 'next/navigation';

// localhost:4400/ opens straight to a component (Breadcrumb) instead of the
// stats dashboard - the dashboard moved to /overview.
export default function RootPage() {
  redirect('/components/breadcrumb');
}
