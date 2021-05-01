import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const postId = req.query.id;

  try {
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

    // GET /api/post/:id
    if (req.method === "GET") {
      const post = await prisma.profile.findUnique({
        where: { id: Number(postId) },
        include: {
          products: true,
          posts: true,
          followers: true,
          following: true,
          sales: true,
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
      const baba = await prisma.profile.findUnique({
        where: { id: Number(postId) },
        include: {
          followedBy: {
            where: {
              id: Number(postId),
            },
          },
          following: {
            where: {
              id: done,
            },
          },
        },
      });
      if (baba) {
        // if (chekk) {
        const post = await prisma.profile.update({
          where: { id: Number(postId) },
          data: {
            followedBy: {
              disconnect: {
                id: Number(postId),
              },
            },
            following: {
              disconnect: {
                id: done,
              },
            },
          },
        });
        res.json(post);
        prisma.$disconnect();
      } else {
        const post = await prisma.profile.update({
          where: { id: Number(postId) },
          data: {
            followedBy: {
              connect: {
                id: Number(postId),
              },
            },
            following: {
              connect: {
                id: done,
              },
            },
          },
        });
        res.json(post);
        prisma.$disconnect();
      }

      // } else {
      //   const post = await prisma.profile.update({
      //     where: { id: Number(postId) },
      //     data: {
      //       follows: {
      //         connect: {
      //           id: 3,
      //         },
      //       },
      //     },
      //   });
      //   res.json(post);
      //   prisma.$disconnect();
      // }
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
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
};
