import { defineCollection, z } from "astro:content";
const team = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      socials: z
        .object({
          twitter: z.string().optional(),
          website: z.string().optional(),
          linkedin: z.string().optional(),
          email: z.string().optional(),
        })
        .optional(),
    }),
});
const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      team: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});
const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});
const services = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(["Advisory", "Compliance", "Operations"]),
      features: z.array(z.string()).default([]),
      outcomes: z.array(z.string()).default([]),
      industries: z.array(z.string()).default([]),
      pricing: z
        .object({
          startingPrice: z.string().optional(),
          monthlyPrice: z.string().optional(),
          pricingModel: z
            .enum(["one-time", "monthly", "hourly", "custom"])
            .optional(),
          note: z.string().optional(),
        })
        .optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      pubDate: z.date().optional(),
      updatedDate: z.date().optional(),
    }),
});
const industries = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      painPoints: z.array(z.string()).default([]),
      relevantServices: z.array(z.string()).default([]),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});
const caseStudies = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      services: z.array(z.string()),
      challenge: z.string(),
      solution: z.string(),
      results: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      ),
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          role: z.string().optional(),
        })
        .optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      pubDate: z.date(),
    }),
});
export const collections = {
  team: team,
  infopages: infopages,
  posts: postsCollection,
  services: services,
  industries: industries,
  caseStudies: caseStudies,
};
