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

  const add = res.json({ userAccount });
  console.log("yo");
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
  console.log(okk[0]);

  const Like = await prisma.likes.findMany({
    where: {
      profileId: done,
    },
    // email: token.user.email,
  });
  const finns = JSON.stringify(Like, ["id"], 2);
  const finnn = JSON.parse(finns);
  const newfinn = finnn.filter((itemm) => {
    return itemm.id;
  });
  const okkk = newfinn.map((names) => names.id);
  const donee = okkk[0];
  console.log(okk[0]);

  // GET /api/post/:id
  if (req.method === "GET") {
    const post = await prisma.product.findUnique({
      where: { id: Number(postId) },
      include: { reviews: { profile: true } },
    });
    res.json(post);
    prisma.$disconnect();
  }

  // DELETE /api/post/:id
  if (req.method === "DELETE") {
    const post = await prisma.likes.delete({
      where: { id: Number(donee) },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "PUT") {
    const post = await prisma.likes.update({
      where: { id: Number(donee) },

      data: {
        product: { disconnect: { id: Number(postId) } },
        profile: { disconnect: { id: Number(done) } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "POST") {
    const post = await prisma.likes.create({
      data: {
        post: { connect: { id: Number(postId) } },
        profile: { connect: { id: Number(done) } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }
};
