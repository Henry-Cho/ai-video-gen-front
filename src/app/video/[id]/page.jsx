import { getAllScripts } from '@/app/utils';
import ClientVideo from './ClientVideo';

export default function VideoPage({ params }) {
  return <ClientVideo params={params} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const scripts = await getAllScripts();

    return scripts.map((script) => (
      {
        id: script.script_id.toString(),
      }
    ));
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return [];
  }
}