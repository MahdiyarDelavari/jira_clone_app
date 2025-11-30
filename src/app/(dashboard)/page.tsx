import { getCurrent } from '@/features/auth/actions';
import { CreateWorkspaceForm } from '@/features/workspaces/components/CreateWorkspaceForm';
import { redirect } from 'next/navigation';


export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return (
    <div className="bg-neutral-500 p-4 h-full rounded-2xl">
    <CreateWorkspaceForm/>
    </div>
  );
}
