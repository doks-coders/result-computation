
export default async function  handler (req, res) {

const sitemap = `google-site-verification: google37f97ca63317a5b8.html`;
res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');
res.end(sitemap);
}