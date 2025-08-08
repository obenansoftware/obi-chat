import { agentPlaygroundFlagFrontend } from '@/flags';
import { isFlagEnabled } from '@/lib/feature-flags';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Agent Conversation | Kortix Obi Chat',
  description: 'Interactive agent conversation powered by Kortix Obi Chat',
  openGraph: {
    title: 'Agent Conversation | Kortix Obi Chat',
    description: 'Interactive agent conversation powered by Kortix Obi Chat',
    type: 'website',
  },
};

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
