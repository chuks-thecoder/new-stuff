"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

var _client2 = require("next-auth/client");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var prisma = new _client.PrismaClient();

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
            _context.next = 25;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(prisma.profile.findMany({
            where: {
              accountId: session.token.id
            } // email: token.user.email,

          }));

        case 7:
          userAccount = _context.sent;
          add = userAccount; // function replacer(key, value) {
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
          _context.next = 16;
          return regeneratorRuntime.awrap(prisma.profile.findUnique({
            where: {
              id: done
            },
            include: {
              posts: true,
              products: true,
              following: true,
              followedBy: true
            }
          }));

        case 16:
          names = _context.sent;
          console.log(okk);
          console.log(names);
          console.log(okk);
          res.json({
            names: names
          });
          console.log(res.json({
            names: names
          }));
          prisma.$disconnect();
          _context.next = 26;
          break;

        case 25:
          console.log("Failed"); // res.status(401);

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          console.log("Real stuff");
          console.log(_context.t0);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
};

exports["default"] = _callee;