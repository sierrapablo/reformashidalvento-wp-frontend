const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2/`;

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

export const getLatestPosts = async ({ perPage = 10 }: { perPage?: number } = {}) => {
  const response = await fetch(
    `${apiUrl}posts?per_page=${perPage}&_embed`
  );

  if (!response.ok) throw new Error('Failed to fetch latest posts');

  const results = await response.json();

  if (!results.length) throw new Error('No posts found');

  const posts = results.map(post => {
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug
    } = post;
    const featuredImage = post._embedded['wp:featuredmedia'][0].source_url;

    return { title, excerpt, content, date, slug, featuredImage }
  });

  return posts;

};

export const getPostInfo = async (slug: string) => {
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