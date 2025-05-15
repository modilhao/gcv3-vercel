// Valores padrão para meta tags de SEO
export const DEFAULT_SEO = {
  title: "Geração de Conteúdo V3",
  description: "Ecossistemas digitais com bots, IA e webapps para empresas B2B.",
  image: "/assets/og-image.jpg", // Caminho relativo, não precisa do domínio
  url: "https://geracaodeconteudo.com.br",
  siteName: "Geração de Conteúdo V3",
  locale: "pt_BR",
  type: "website",
  twitterSite: "@gdeconteudo",
  twitterCreator: "@marcelambiente"
};

// Função para criar um objeto de SEO com valores padrão e override
export function createSeoMeta(options?: Partial<typeof DEFAULT_SEO>) {
  return {
    ...DEFAULT_SEO,
    ...options
  };
}