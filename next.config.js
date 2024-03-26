/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {}

/**
 * @type {import('@next/bundle-analyzer')}
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)

/**
 * @type {import('million/compiler').next}
 */
const withMillion = require('million/compiler').next(withBundleAnalyzer, {
  auto: true,
})

module.exports = withMillion
