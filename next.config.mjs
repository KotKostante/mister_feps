/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/uborka-ofisov", destination: "/uslugi/uborka-ofisov/", permanent: true },
      { source: "/uborka-skladov", destination: "/uslugi/uborka-skladov/", permanent: true },
      { source: "/uborka-posle-remonta", destination: "/uslugi/uborka-posle-remonta/", permanent: true },
      { source: "/uborka-torgovyh-setey", destination: "/uslugi/", permanent: true },
      { source: "/uborka-promoborudovaniya", destination: "/uslugi/uborka-proizvodstva/", permanent: true },
      { source: "/uborka-zhk", destination: "/uslugi/", permanent: true }
    ];
  }
};

export default nextConfig;
