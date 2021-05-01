import jwt from "next-auth/jwt";
import { getCsrfToken } from "next-auth/client";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    console.log(session.token.id);
    const userAccount = await prisma.profile.findMany({
      where: {
        accountId: session.token.id,
      },
      // email: token.user.email,
    });

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

    const names = await prisma.profile.findUnique({
      where: { id: done },
      include: {
        posts: true,
        products: true,
        following: {
          include: {
            posts: {
              include: {
                profile: true,
                likes: true,
              },
            },
            products: {
              include: {
                profile: true,
                likes: true,
              },
            },
          },
        },
        followedBy: true,
      },
    });
    res.json({ name: names });
  }

  // console.log(Expo);

  res.end();
};
