export type WPProduct = {
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  _embedded: {
    'wp:featuredmedia': Array<{
      source_url: string;
    }>;
  };
}

export type STProduct = {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  featuredImage: string;
};