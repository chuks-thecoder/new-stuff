"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

var _client2 = require("next-auth/client");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var _callee = function _callee(req, res) {
  var prisma, session, _req$body, username, bio, image, Expo;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prisma = new _client.PrismaClient();
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _client2.getSession)({
            req: req
          }));

        case 4:
          session = _context.sent;

          if (!session) {
            _context.next = 14;
            break;
          }

          console.log(JSON.stringify(session));
          _req$body = req.body, username = _req$body.username, bio = _req$body.bio, image = _req$body.image;
          _context.next = 10;
          return regeneratorRuntime.awrap(prisma.profile.create({
            data: {
              Account: {
                connect: {
                  id: session.token.id
                }
              },
              username: username,
              image: image,
              bio: bio
            }
          }));

        case 10:
          Expo = _context.sent;
          res.json({
            names: Expo
          });
          _context.next = 15;
          break;

        case 14:
          res.status(401);

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.log("Real stuff");
          console.log(_context.t0);

        case 21:
          prisma.$disconnect();

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports["default"] = _callee;