import type { CapacitorConfig } from '@capacitor/cli';




import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.exaple.task_tracker',
  appName: 'task_traker',
  webDir: 'dist/frontend/browser',
  server: {
    androidScheme: 'http',
    hostname: 'localhost',
    allowNavigation: ['5000'] 
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1023831484477-rpgd8l741k3lnl085omvk7djdl4r2d2g.apps.googleusercontent.com',
      // androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
export default config;
