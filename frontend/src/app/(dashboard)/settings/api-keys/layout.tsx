import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Keys | Obi Chat',
  description: 'Manage your API keys for programmatic access to Obi Chat',
  openGraph: {
    title: 'API Keys | Obi Chat',
    description: 'Manage your API keys for programmatic access to Obi Chat',
    type: 'website',
  },
};

export default async function APIKeysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
