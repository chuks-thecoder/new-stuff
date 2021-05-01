import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const postId = req.query.id;

  // GET /api/post/:id

  const post = await prisma.comments.findMany();
  res.json(post);
  prisma.$disconnect();
};
