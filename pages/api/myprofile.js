// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getSession } from "next-auth/client";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    // const token = await auth0.getSession(req);
    if (session) {
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
      console.log(done)

      const names = await prisma.profile.findUnique({
        where: { id: done },
        include: {
          posts: true,
          products: true,
          following: true,
          followedBy: true,
        },
      });
      console.log(okk);
      console.log(names);
      console.log(okk);
      res.json({ names: names });
      console.log(res.json({ names: names }));
      prisma.$disconnect();
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
