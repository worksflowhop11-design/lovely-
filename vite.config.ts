import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'copy-static-site-files',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(distDir)) {
            return;
          }

          for (const file of ['style.css', 'script.js']) {
            const srcFile = path.resolve(__dirname, file);
            const destFile = path.resolve(distDir, file);
            if (fs.existsSync(srcFile)) {
              fs.copyFileSync(srcFile, destFile);
            }
          }

          const srcAssets = path.resolve(__dirname, 'assets');
          const distAssets = path.resolve(distDir, 'assets');
          if (fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
