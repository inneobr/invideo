import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import redis from "@/lib/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') as string;

  try {
    if (!query) {
      return NextResponse.json({ error: 'Parâmetro de busca ausente' }, { status: 400 });
    }
   /* const cacheKey = `search:${query.trim().toLowerCase()}`;

    const videoCache = await redis.get(cacheKey);
    if (videoCache) {
      return NextResponse.json(JSON.parse(videoCache), { status: 200 });
    }*/

    const url = `https://superflixapi.digital/pesquisar/?sort=&s=${encodeURIComponent(query)}`;
    const { data: html } = await axios.get(url);
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
      const year = base.find('span.text-xs').first().text().trim();

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
    //await redis.set(cacheKey, JSON.stringify({ results }), 'EX', 3600);
    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao fazer scraping:', error.message);
    return NextResponse.json({ error: 'Erro ao processar a busca' }, { status: 500 });
  }
}