import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const postId = req.query.id;
  console.log("ok");
  // GET /api/post/:id
  try {
    const post = await prisma.profile.update({
      where: { id: Number(postId) },
      data: {
        followers: {
          disconnect: {
            id: 1,
          },
        },
      },
    });
    res.json(post);
    prisma.$disconnect();
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
};
