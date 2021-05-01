import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const postId = req.query.id;
  const session = await getSession({ req });
  const userAccount = await prisma.profile.findMany({
    where: {
      accountId: session.token.id,
    },

    // email: token.user.email,
  });

  const add = userAccount;

  // function replacer(key, value) {
  //   if (value === "id") {
  //     return key;
  //   }
  //   return value;
  // }
  const fin = JSON.stringify(userAccount, ["id"], 2);
  const finn = JSON.parse(fin);
  const newfin = finn.filter((item) => {
    return item.id;
  });
  const okk = newfin.map((names) => names.id);
  const done = okk[0];

  // GET /api/post/:id
  if (req.method === "GET") {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: {
        comments: {
          include: {
            profile: true,
          },
        },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }

  // DELETE /api/post/:id
  if (req.method === "DELETE") {
    const post = await prisma.product.delete({
      where: { id: Number(postId) },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "PUT") {
    const post = await prisma.profile.update({
      where: { id: Number(postId) },
      data: {
        followedBy: {
          disconnect: {
            id: Number(done),
          },
        },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "POST") {
    const post = await prisma.comments.create({
      data: {
        body,
        post: { connect: { id: Number(postId) } },
        profile: { connect: { id: 1 } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }
};
