import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug;

    if (typeof slug !== "string") {
      throw new Error("Query param 'slug' has to be of type string");
    }

    if (req.method === "POST") {
      const newOrUpdatedViews = await prisma.view.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString(),
      });
    }

    if (req.method === "GET") {
      const views = await prisma.view.findUnique({
        where: {
          slug,
        },
      });

      if (views) return res.status(200).json({ total: views.count.toString() });
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: `Things just got out of hands (${err.message})`,
      };
    }
  }
}
