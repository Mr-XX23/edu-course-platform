
export const config = {
  dev: {
    apiUrl: process.env.NEXT_PUBLIC_DEV_API_URL
  },
  test: {
    apiUrl: process.env.NEXT_PUBLIC_TEST_API_URL
  },
  prod: {
    apiUrl: process.env.NEXT_PUBLIC_PROD_API_URL
  }
};

export const getApiUrl = (): string => {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return config.dev.apiUrl ?? '';
    case 'test':
      return config.test.apiUrl ?? '';
    case 'production':
      return config.prod.apiUrl ?? '';
    default:
      return config.dev.apiUrl ?? '';
  }
};