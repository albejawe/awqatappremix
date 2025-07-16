import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.97cadf0ad43f4142aaf95230fd20a76c',
  appName: 'أوقات للسفر والسياحة',
  webDir: 'dist',
  server: {
    url: "https://97cadf0a-d43f-4142-aaf9-5230fd20a76c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a365d",
      showSpinner: false
    }
  }
};

export default config;