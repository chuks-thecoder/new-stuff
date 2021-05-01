import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "next-auth/client";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    // const tokenCache = auth0.tokenCache(req);
    // const { accessToken } = await tokenCache.getAccessToken();
    // console.log(accessToken);

    // const token = await auth0.getSession(req);
    if (session) {
      // const sub = token.account.id;
      const { name } = req.body;

      const names = await prisma.profile.findUnique({
        where: { id: name },
      });
      // const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
      // console.log("json web token", JSON.stringify(token, null, 2));

      res.json({ names: names });
      prisma.$disconnect();
    }
    // res.end;
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
};
