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
      const Expo = await prisma.profile.findMany();
      res.json({ names: Expo });
    }
    prisma.$disconnect();
    // res.end;
  } catch (err) {
    console.log("Real stuff");
    console.log(err);
  }
};
