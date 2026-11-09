# Rebecca Leigh, portfolio

Astro site, static output, ready for Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to /dist
```

## Deploy to Vercel

Push this folder to a GitHub repo, then import it at vercel.com/new. Vercel detects Astro on its own; no settings to change. Or run `npx vercel` from this folder.

## Where things live

| What | Where |
|---|---|
| Name, email, LinkedIn, resume link | `src/site.config.ts` |
| Case study content | `src/content/work/*.yaml` (one file per project) |
| Case study fields and what each one does | `src/content.config.ts` |
| Case study page template | `src/pages/work/[slug].astro` |
| Home page | `src/pages/index.astro` |
| Colors, type, spacing | `src/styles/global.css` |
| Resume PDF | drop it in `/public` as `rebecca-leigh-resume.pdf` |

## Writing a case study

- Anything in `[square brackets]` is a placeholder. Swap in the real fact or delete the line.
- Any section you remove from the YAML disappears from the page and from the side menu.
- `palette` sets the four colors for that project's gradients. Order matters: the first color is the dominant bloom.
- Images: put them in `/public/work/<project>/` and add `src: /work/<project>/file.png` to any figure. Until then, a grainy gradient placeholder shows the alt text so you know what goes where.
- `device: phone` or `device: browser` on a figure wraps it in a simple frame.
- To hide a project while you're still writing it, add `draft: true`.

## Interactive bits

- Home hero: the gradient leans toward your cursor.
- Work list: a gradient preview follows the cursor, in each project's colors.
- Case studies: Full story / Quick read toggle, a contents rail with reading progress, tabbed design decisions (chosen vs ruled out), a before/after slider for iterations, and a step-through for final screens.
- Everything respects reduced motion and works by keyboard.

## Type

Newsreader (display and long-form) and Hanken Grotesk (interface and body), both self-hosted through Fontsource. No monospace anywhere.
