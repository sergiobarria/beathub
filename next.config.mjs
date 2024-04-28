/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-55bf895719454a408d1524700597112c.r2.dev',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**'
			}
		]
	}
};

export default nextConfig;
