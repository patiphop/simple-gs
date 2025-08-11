export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Ensure proper CSS processing
      config: './tailwind.config.js',
    },
    autoprefixer: {},
    // Additional optimizations for Tailwind v4
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: false,
        }]
      }
    })
  },
}
