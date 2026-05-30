module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4000/'],
      startServerCommand: 'node dist/trejodev/server/server.mjs',
      startServerReadyPattern: 'listening on',
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
