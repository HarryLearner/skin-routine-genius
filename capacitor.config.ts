import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.db71a4fb989a4c36af7e9ec1d89d7c61',
  appName: 'Glow Guide',
  webDir: 'dist',
  server: {
    url: 'https://db71a4fb-989a-4c36-af7e-9ec1d89d7c61.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
