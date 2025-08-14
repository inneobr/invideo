'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PlayerPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const rawParams = params?.params;

  const fullPath = Array.isArray(rawParams)
    ? rawParams.join('/')
    : rawParams || '';

  const url = `https://playerflixapi.com/${fullPath}`;
  
  useEffect(() => {
    setLoading(true);
  }, [url]);

  
  return (
    <section className='section'>
        <div className='container mx-auto '>
          {loading && (
            <div className="w-full h-screen flex justify-center items-center loading-overlay">
              <span className='text-2xl text-amber-600'>Loading video...</span>
            </div>
          )}

          <iframe
            src={url}
            allowFullScreen
            className="w-full [height:calc(100vh-15vh)] rounded-2xl"
            title="Vídeo Player"
            onLoad={() => setLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
      </div>
    </section>
  );
}