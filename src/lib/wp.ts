import type { WPProduct } from '../types/wp.ts';


const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2/`;


/**
 * 
 * @param slug 
 * @returns 
 */
export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}pages?slug=${slug}&_embed`);

  if (!response.ok) throw new Error('Failed to fetch page info');

  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo
  } = data;
  const featuredImage = data._embedded['wp:featuredmedia'][0].source_url;

  return { title, content, seo, featuredImage };

};


/**
 * 
 * @returns 
 */
export const getProducts = async () => {
  const response = await fetch(
    `${apiUrl}posts?&_embed`
  );

  if (!response.ok) throw new Error('Failed to fetch latest posts');

  const results: WPProduct[] = await response.json();

  if (!results.length) throw new Error('No posts found');

  const products = results.map(product => {
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug
    } = product;
    const featuredImage = product._embedded['wp:featuredmedia'][0].source_url;

    return { title, excerpt, content, date, slug, featuredImage }
  });

  return products;

};


/**
 * 
 * @param slug 
 * @returns 
 */
export const getProductInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}posts?slug=${slug}`);

  if (!response.ok) throw new Error('Failed to fetch page info');

  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo
  } = data;

  return { title, content, seo };

};
