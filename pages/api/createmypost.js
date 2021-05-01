// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const session = await getSession({ req });

    if (session) {
      if (req.method === "POST") {
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

        if (session) {
          const { name, image, body } = req.body;
          const Expo = await prisma.post.create({
            data: {
              profile: {
                connect: {
                  id: done,
                },
              },

              name: name,
              image: image,
              body: body,
            },
          });
          res.json({ names: Expo });
        } else {
          console.log(nope);
        }
      } else if (req.method === "DELETE") {
        const { id } = req.params;
        const Expo = await prisma.profile.delete({
          where: {
            userId: sub,
            id: id,
          },
        });
        res.json({ names: Expo });
        console.log("delete");
      } else {
        console.log("e no work");
      }
    } else {
      console.log("Failed");
      // res.status(401);
    }
    // res.end;
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
  prisma.$disconnect();
};
