// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const session = await getSession({ req });
    if (session) {
      console.log(JSON.stringify(session));
      const { username, bio, image } = req.body;

      const Expo = await prisma.profile.create({
        data: {
          Account: {
            connect: {
              id: session.token.id,
            },
          },

          username: username,
          image: image,
          bio: bio,
        },
      });
      res.json({ names: Expo });
    } else {
      res.status(401);
    }

    // res.end;
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
  prisma.$disconnect();
};
