import ClientReview from './ClientReview';
import { getAllScripts } from '@/app/utils';

export default function ReviewPage({ params }) {
  return <ClientReview params={params} />;
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