// import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';

// export default defineConfig({
//   plugins: [reactRefresh()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://10.53.160.160:5080',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });