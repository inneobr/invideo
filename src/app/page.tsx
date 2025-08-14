'use client';

import React, { useEffect, useState } from 'react';

export interface Result {
  title: string;
  image: string;
  pageLink: string;
}

export interface ApiResponse {
  results: Result[];
}

export default function Home() {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const search = async () => {
        if (!query.trim()) return;
    
        setLoading(true);
        setError(null);
        setResults([]);
    
        try {
          const res = await fetch(`/api/v1/search?query=${encodeURIComponent(query.trim())}`);
          if (!res.ok) throw new Error(`Erro na busca: ${res.statusText}`);
    
          const data: ApiResponse = await res.json();
    
          setResults(data.results || []);
        } catch (err) {
          setError('Falha ao buscar resultados');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') search();
      };
    
      useEffect(() => {
        const start = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const response = await fetch(`/api/v1/search?query=${encodeURIComponent(query ? query : '%marvel%')}`);
            const data: ApiResponse = await response.json();
            setResults(data.results || []);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError('Falha ao buscar lançamentos');
          } finally {
            setLoading(false);
          }
        };
    
        start();
      }, []);

    return (
        <section className='section'>
            <div className='container mx-auto'>
               <div className='search-section'>
                    <div className='search-container'>
                        <input autoFocus type="search"  value={query} aria-label="Campo de busca" placeholder="Filmes ou Séries" className='search-input'                        
                        onChange={(e) => setQuery(e.target.value)} onKeyDown={onEnter} />

                        <button  onClick={search}  aria-label="Buscar" className='search-button'>
                            Buscar
                        </button>
                    </div>

                    {loading && (
                        <p className="justify-center items-center text-white" style={{ fontStyle: 'italic' }}>
                            Carregando resultados...
                        </p>
                    )}

                    {!loading && results.length === 0 && (
                        <p className="flex justify-center items-center text-white gap-2" style={{ fontStyle: 'italic' }}>
                            <span className='lowercase'>({query})</span>Não encontrado...
                        </p>
                    )}
                    

                    {error && (
                        <p className="flex justify-center items-center text-amber-600 gap-2" style={{ fontStyle: 'italic' }}>
                            Falha no servidor, tente mais tarde...
                        </p>
                    )}

                    <div className='results'>
                        {results.length}
                    </div>                    
                </div>  

                <div className="grid-container">
                    {results.map(({ title, image, pageLink }, index) => (
                        <a key={index} href={pageLink} rel="noopener noreferrer" className='card-open justify-center items-center' aria-label={`detalhes de ${title}`}>
                            <img src={image} alt={title} className='card-tumbnail border-2 border-black/50' loading="lazy" decoding="async" />  
                            <div className='w-full bg-black/50 justify-center items-center rounded-b-md p-2 border-2 border-black/50'>
                                <h2 className='text-center uppercase text-base font-semibold leading-[1.2] m-0 overflow-hidden truncate' title={title}>
                                    {title}
                                </h2>  
                            </div>                             
                        </a>
                    ))}
                </div>  
            </div>                    
        </section>
    )
}