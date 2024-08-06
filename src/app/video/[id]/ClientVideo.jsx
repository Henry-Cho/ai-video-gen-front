"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getVideoData } from '../../utils';
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext';

export default function ClientVideo({ params }) {
  const [data, setData] = useState(null);
  const router = useRouter();

  // Flag to track if user has confirmed going back
  const hasConfirmedBackRef = useRef(false);

  const { user } = useAuth();

  if (!user) {
    alert("User login required")
    redirect('/');
  }


  // Warning when using back button
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handlePopState = () => {
      if (hasConfirmedBackRef.current || confirm('You may lose data and be charged again for regenerating your AI-produced video. Do you still want to go back?')) {
        hasConfirmedBackRef.current = true;
        window.history.back();
      } else {
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const script_id = params.id;
        const data = await getVideoData(script_id);
        if (data) {
          setData(data);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching video from supabase', error);
        router.push('/');
      }
    };

    fetchVideo();
  }, [params.id, router]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { url } = data;

  return (
    <main className="flex flex-col items-center p-24">
      <div className="w-full max-w-lg pt-10">
        <div className="flex justify-center pb-10">
            <Image src="/images/arcticons_form.svg" width={82} height={82} alt="form icon"/>
        </div>
        <video controls className="w-full">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mt-10 flex justify-end">
          <button className="py-2 px-8 bg-[#4F4CDB] rounded text-white">Export</button>
        </div>
      </div>
    </main>
  );
}
