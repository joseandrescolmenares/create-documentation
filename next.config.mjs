import nextra from "nextra";


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
  };
  
  const withNextra =  nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.tsx",
  });
  
  export default  withNextra(nextConfig);