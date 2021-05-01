"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwt = _interopRequireDefault(require("next-auth/jwt"));

var _client = require("next-auth/client");

var _client2 = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client2.PrismaClient();
var secret = process.env.JWT_SECRET;

var _callee = function _callee(req, res) {
  var session, userAccount;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _client.getSession)({
            req: req
          }));

        case 2:
          session = _context.sent;

          if (!session) {
            _context.next = 13;
            break;
          }

          console.log(session.token.id);
          _context.next = 7;
          return regeneratorRuntime.awrap(prisma.profile.update({
            where: {
              id: session.token.id
            },
            data: {
              followedBy: {
                connect: {
                  id: 1
                }
              },
              following: {
                connect: {
                  id: 2
                }
              }
            } // email: token.user.email,

          }));

        case 7:
          userAccount = _context.sent;
          res.json(userAccount);
          console.log("yo"); // function replacer(key, value) {
          //   if (value === "id") {
          //     return key;
          //   }
          //   return value;
          // }

          prisma.$disconnect();
          _context.next = 14;
          break;

        case 13:
          res.status(401);

        case 14:
          // console.log(Expo);
          res.end();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;