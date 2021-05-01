// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import jwt from "next-auth/jwt";
// const secret = process.env.JWT_SECRET;

// export default async (req, res) => {
//   try {
//     // const tokenCache = auth0.tokenCache(req);
//     // const { accessToken } = await tokenCache.getAccessToken();
//     // console.log(accessToken);
//     const token = await jwt.getToken({ req, secret });

//     // const token = await auth0.getSession(req);
//     if (token) {
//       const sub = token.account.id;
//       const names = await prisma.name.findMany({ where: { userId: sub } });
//       // const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
//       // console.log("json web token", JSON.stringify(token, null, 2));

//       res.json({ names: names });
//     } else {
//       const names = await prisma.name.findMany();
//       console.log("Failed");
//       res.json({ names: names });
//       // res.status(401);
//     }
//     // res.end;
//   } catch (err) {
//     console.log("Real stuff");
//     console.log(err);
//   }
// };
