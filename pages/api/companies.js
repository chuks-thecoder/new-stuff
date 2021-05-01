// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

import { getSession } from "next-auth/client";

export default async (req, res) => {
  const prisma = new PrismaClient();

  try {
    // const tokenCache = auth0.tokenCache(req);
    // const { accessToken } = await tokenCache.getAccessToken();
    // console.log(accessToken);
    const session = await getSession({ req });

    // const token = await auth0.getSession(req);
    if (session) {
      // const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
      // console.log("json web token", JSON.stringify(token, null, 2));
      if (req.method === "POST") {
        const sub = session.token.id;
        const { name, image } = req.body;
        console.log(req.body);
        const Expo = await prisma.name.create({
          data: {
            // ... data to create a Company
            userId: sub,
            name: name,
            image: image,
          },
        });

        res.json({ names: Expo });
      } else if (req.method === "DELETE") {
        const { id } = req.params;
        const Expo = await prisma.name.delete({
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
};
