import jwt from "next-auth/jwt";
import { getCsrfToken } from "next-auth/client";
import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    // Signed in
    // console.log("JSON Web Token", JSON.stringify(token, null, 2));
    // console.log(token.account.id);

    // const userAccount = await prisma.account.findMany({
    //   where: {
    //     Account_id: token.account.id,
    //   },

    //   // email: token.user.email,
    // });

    // const add = res.json({ userAccount });
    // console.log("yo");
    // // function replacer(key, value) {
    // //   if (value === "id") {
    // //     return key;
    // //   }
    // //   return value;
    // // }
    // const fin = JSON.stringify(userAccount, ["id"], 2);
    // const finn = JSON.parse(fin);
    // const newfin = finn.filter((item) => {
    //   return item.id;
    // });
    // const okk = newfin.map((names) => names.id);
    // console.log(okk[0]);

    const Expo = await prisma.profile.findMany();

    res.json({ names: Expo });
    prisma.$disconnect();
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
