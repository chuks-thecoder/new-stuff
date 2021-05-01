import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const postId = req.query.id;

  // GET /api/post/:id
  if (req.method === "GET") {
    const post = await prisma.product.findUnique({
      where: { id: Number(postId) },
      include: {
        reviews: {
          include: {
            profile: true,
          },
        },
        profile: true,
        likes: {
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
    const post = await prisma.product.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(post);
    prisma.$disconnect();
  }
};
