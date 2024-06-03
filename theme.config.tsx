import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { link } from "fs";

const config: DocsThemeConfig = {
  logo: <span>Documentation</span>,
  project: {
    link: "https://github.com/joseandrescolmenares",
  },
  chat: {
    link: "https://www.linkedin.com/in/jose-colmenares-480074233/",
  },

  footer: {
    text: "Documentations",
  },
};

export default config;
