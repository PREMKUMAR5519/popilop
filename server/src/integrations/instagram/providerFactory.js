import MetaInstagramProvider from './metaInstagramProvider.js';

export const getInstagramProvider = provider => {
  switch (provider) {
    case 'meta-instagram':
    default:
      return new MetaInstagramProvider();
  }
};
