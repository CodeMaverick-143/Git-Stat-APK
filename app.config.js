import 'dotenv/config';

export default {
  expo: {
    name: 'github-stats',
    slug: 'github-stats',
    version: '1.0.0',
    android: {
      package: 'com.codemaverick143.githubstats', // ✅ your unique app ID
    },
    extra: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      eas: {
        projectId: '373754df-b0c1-491c-8220-f896d395468a',
      },
    },
  },
};
