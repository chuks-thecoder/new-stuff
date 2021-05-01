import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "next-auth/jwt";
const secret = process.env.JWT_SECRET;

export default async (req, res) => {
  const postId = req.query.id;
  const token = await jwt.getToken({ req, secret });

  const userAccount = await prisma.profile.findMany({
    where: {
      userId: token.account.id,
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

  // GET /api/post/:id
  if (req.method === "GET") {
    const post = await prisma.comments.findUnique({
      where: { id: Number(postId) },
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
    const { name, discription, discount_price, price, image } = req.body;
    const post = await prisma.product.update({
      where: { id: Number(postId) },
      data: {
        name: name,
        image: image,
        discription: discription,
        discount_price: Number(discount_price),
        price: Number(price),
      },
    });
    res.json(post);
    prisma.$disconnect();
  }

  if (req.method === "POST") {
    const { body } = req.body;
    const post = await prisma.comments.create({
      data: {
        body: body,
        post: { connect: { id: Number(postId) } },
        profile: { connect: { id: done } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }
};
