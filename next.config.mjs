import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */


const cspHeader = `

    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://f.vimeocdn.com https://player.vimeo.com/api/player.js https://f.vimeocdn.com/js_opt/modules/utils/vuid.min.js/js_opt/modules/utils/vuid.min.js 'unsafe-eval' https://f.vimeocdn.com/p/4.39.21/js/player.module.js;
    style-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com/api/player.js https://f.vimeocdn.com/p/4.39.21/js/player.module.js;
    connect-src 'self' https://player-telemetry.vimeo.com/ https://vimeo.com/;
    script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com/api/player.js  https://f.vimeocdn.com/js_opt/modules/utils/vuid.min.js https://f.vimeocdn.com/p/4.39.21/js/player.module.js  https://f.vimeocdn.com/; 
    font-src 'self';

   
   
`

const origins = ["*", "https://player.vimeo.com", " https://f.vimeocdn.com"]



const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'vimeo.com' },
      { hostname: 'modii.org' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
  /* headers: async()=>{
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com'); autoplay=('https://player.vimeo.com'); picture-in-picture=('https://player.vimeo.com')",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
      },
    ]
  } */
}



export default withNextVideo(config);