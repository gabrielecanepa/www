import NextBundleAnalyzer from '@next/bundle-analyzer'
import { next } from 'million/compiler'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)

const withMillion = next(withBundleAnalyzer, {
  auto: true,
  rsc: true,
})

export default withMillion
