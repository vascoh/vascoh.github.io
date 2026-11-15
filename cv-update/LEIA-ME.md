# Atualização do CV para o portfólio (`vascoh/portfolio`)

Ficheiros prontos a copiar para o repositório `vascoh/portfolio`, nos mesmos caminhos:

| Ficheiro | Ação |
|---|---|
| `public/images/vasco-henriques.webp` (+ `.jpg`) | Fotografia profissional |
| `src/content/experience.ts` | Substituir: percurso completo, formação e idiomas do CV |
| `src/content/certifications.ts` | Substituir: certificações do CV com anos |
| `src/content/about-intro.ts` | Copiar os textos para `aboutIntro` e os 2 primeiros parágrafos de `aboutStory` em `about.ts` |

E ainda:
1. Em `src/content/site.ts`: `photo: "/images/vasco-henriques.webp"`.
2. Na página Experiência: mostrar `sector`, `highlights` e `languages` (campos novos) e retirar o aviso "funções anteriores a fornecer".
3. Nos cartões de projeto: tornar o domínio (ex.: anfitrioes.pt) um link direto para o site.
4. `npm run build`, depois commit e push.

Dados pessoais do CV (telefone, data de nascimento, morada) **não** são publicados de propósito.

## Links corretos dos projetos (`src/content/projects.ts`)

| Projeto | `url` |
|---|---|
| Anfitrião | `https://anfitrioes.pt` |
| Roberta C Cakes | `https://www.robertaccakes.pt` |
| Patrão Mor Amora | `https://patrao-mor-amora.vercel.app` |
| Sábados (`previewUrl`) | `https://sabados-alpha.vercel.app` |

Nos cartões de projeto, o domínio deve ser um link direto para o site (nova aba).
