import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic'; // se quiser forçar dinâmico
export const revalidate = 3600; // opcional: revalida cache a cada 1 hora

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') as string;

  if (!query) {
    return NextResponse.json({ error: 'Parâmetro de busca ausente' }, { status: 400 });
  }

  try {
    const url = `https://superflixapi.digital/pesquisar/?sort=&s=${encodeURIComponent(query)}`;
    
    const res = await fetch(url, {
      cache: 'force-cache', // cache no lado do servidor
      next: {
        tags: ['update-filmes'] // tag para invalidar depois
      }
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const results: {
      title: string;
      image: string;
      pageLink: string;
    }[] = [];

    $('article.relative').each((_, el) => {
      const base = $(el);

      const title = base.find('h3').first().text().trim();
      const image = base.find('img').first().attr('src') || '';
      const href = base.find('a[href^="/filme/"], a[href^="/serie/"]').first().attr('href') || '';
      const match = href.match(/\/(filme|serie)\/([^/?#]+)/);

      if (!match) return;

      const tipo = match[1];
      const id = match[2];
      const pageLink = `/watch/${tipo}/${id}`;

      if (title && image && pageLink) {
        results.push({ title, image, pageLink });
      }
    });

    return NextResponse.json({ results }, {
      status: 200,
      // Tags no response também (opcional, mas reforça)
      headers: {
        'x-nextjs-cache-tags': 'update-filmes'
      }
    });

  } catch (error: any) {
    console.error('Erro ao fazer scraping:', error.message);
    return NextResponse.json({ error: 'Erro ao processar a busca' }, { status: 500 });
  }
}