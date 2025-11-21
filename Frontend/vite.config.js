import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
        fontFamily: {
        poppins: ["Poppins", "sans-serif"], // add this line
      },
      server:{
        port:5173
      }


});
