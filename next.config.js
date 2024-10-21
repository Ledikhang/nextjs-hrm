/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "antd",
    "rc-util",
    "rc-pagination",
    "rc-picker",
  ],
};

module.exports = nextConfig;
