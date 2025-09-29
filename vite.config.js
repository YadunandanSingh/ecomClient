// import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
  
//   plugins: [ tailwindcss(),react()],
// })

    // vite.config.js
    import { defineConfig, loadEnv } from 'vite';
    import react from '@vitejs/plugin-react';
     import tailwindcss from '@tailwindcss/vite'

    export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), ''); // Load all env variables

      return {
        plugins: [ tailwindcss(),react()],
        define: {
          'process.env': env, // Expose all loaded env variables under process.env
        },
      };
    });