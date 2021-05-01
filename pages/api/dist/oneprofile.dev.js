"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

var _client2 = require("next-auth/client");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var prisma = new _client.PrismaClient();
var secret = process.env.JWT_SECRET;

var _callee = function _callee(req, res) {
  var session, userAccount, add, fin, finn, newfin, okk, done, names;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _client2.getSession)({
            req: req
          }));

        case 3:
          session = _context.sent;

          if (!session) {
            _context.next = 23;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(prisma.profile.findMany({
            where: {
              accountId: session.token.id
            },
            include: {
              followedBy: true,
              following: true
            } // email: token.user.email,

          }));

        case 7:
          userAccount = _context.sent;
          add = res.json({
            userAccount: userAccount
          });
          console.log("yo"); // function replacer(key, value) {
          //   if (value === "id") {
          //     return key;
          //   }
          //   return value;
          // }

          fin = JSON.stringify(userAccount, ["id"], 2);
          finn = JSON.parse(fin);
          newfin = finn.filter(function (item) {
            return item.id;
          });
          okk = newfin.map(function (names) {
            return names.id;
          });
          done = okk[0];
          console.log(okk[0]);
          _context.next = 18;
          return regeneratorRuntime.awrap(prisma.profile.findUnique({
            where: {
              id: done
            }
          }));

        case 18:
          names = _context.sent;
          res.json({
            names: names
          });
          prisma.$disconnect();
          _context.next = 24;
          break;

        case 23:
          console.log("Failed"); // res.status(401);

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.log("Real stuff");
          console.log(_context.t0);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

exports["default"] = _callee;