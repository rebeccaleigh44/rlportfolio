import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Every case study is one YAML file in src/content/work.
  The page template (src/pages/work/[slug].astro) renders a section only
  when its field is filled in, so you can drop sections that don't fit a project.
  Section order follows the Rocket Account Merge case study, plus a closing reflection.
*/

// An image slot. Leave `src` empty and a grainy gradient placeholder is drawn instead.
const figure = z.object({
  src: z.string().optional(), // path under /public, e.g. /work/nfcu/cover.png
  alt: z.string(),
  caption: z.string().optional(),
  ratio: z.string().default('16 / 10'), // CSS aspect-ratio
  device: z.enum(['none', 'phone', 'browser']).default('none'),
});

const stat = z.object({ value: z.string(), label: z.string() });
const card = z.object({ title: z.string(), body: z.string() });

const work = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/work' }),
  schema: z.object({
    // Index + hero
    order: z.number(),
    client: z.string(),
    title: z.string(), // the headline, e.g. "Simplifying multi-account access"
    subtitle: z.string(), // e.g. "The Rocket Account Merge experience"
    teaser: z.string(), // one line for the home page list
    year: z.string(),
    sector: z.string(),
    palette: z.array(z.string()).length(4), // four colours for this project's gradient
    cover: figure,
    draft: z.boolean().default(false),

    // 2. Quick read
    tldr: z.array(z.string()).min(1).max(4),

    // 3. Overview + metadata
    overview: z.string(),
    meta: z.object({
      role: z.array(z.string()),
      team: z.array(z.string()),
      duration: z.string(),
      tools: z.array(z.string()).default([]),
    }),

    // 4. Problem statement
    problem: z.object({ question: z.string(), stats: z.array(stat).default([]) }).optional(),

    // 5. Process snapshot (a real sequence, so these get numbers)
    process: z.array(z.object({ phase: z.string(), detail: z.string() })).optional(),

    // 6. Impact
    impact: z.array(stat.extend({ detail: z.string().optional() })).optional(),

    // 7. Deeper context
    context: z.object({ heading: z.string(), body: z.string(), figure: figure.optional() }).optional(),

    // 8. Two-sided challenge
    challenges: z.object({ user: z.string(), business: z.string() }).optional(),

    // 9. The stakes
    stakes: z.array(card).optional(),

    // 10. Reframe as a How Might We
    reframe: z
      .object({
        hmw: z.string(),
        highlight: z.string().optional(), // a phrase inside hmw to wrap in the outlined pill
        userNeeds: z.array(z.string()).default([]),
        businessNeeds: z.array(z.string()).default([]),
      })
      .optional(),

    // 11. Scope
    scope: z.object({ body: z.string(), figure: figure.optional() }).optional(),

    // 12. Ideation + key decisions (interactive option switcher)
    ideation: z.object({ body: z.string(), figures: z.array(figure).default([]) }).optional(),
    decisions: z
      .array(
        z.object({
          title: z.string(),
          question: z.string(),
          options: z.array(
            z.object({
              label: z.string(),
              chosen: z.boolean().default(false),
              body: z.string(),
              figure: figure.optional(),
            }),
          ),
        }),
      )
      .optional(),

    // 13. Constraints + iterations (before / after slider)
    iterations: z
      .array(z.object({ title: z.string(), body: z.string(), before: figure, after: figure }))
      .optional(),

    // 14. High fidelity
    hifi: z.array(z.object({ title: z.string(), body: z.string(), figures: z.array(figure) })).optional(),

    // 15. Final designs walkthrough (interactive stepper)
    walkthrough: z
      .object({
        intro: z.string().optional(),
        device: z.enum(['phone', 'browser']).default('phone'),
        steps: z.array(z.object({ title: z.string(), caption: z.string(), figure: figure.optional() })),
      })
      .optional(),

    // 16. Reflection (not in the Rocket study, but your strongest material)
    reflection: z.array(card).optional(),
  }),
});

export const collections = { work };
