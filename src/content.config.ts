import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' para md/mdx, 'data' para json/yaml
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        author: z.string().default('Tu Nombre'),
    }),
});

export const collections = {
    blog: blogCollection,
};