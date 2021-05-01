"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

var _jwt = _interopRequireDefault(require("next-auth/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();
var secret = process.env.JWT_SECRET;

var _callee = function _callee(req, res) {
  var token, _req$body, name, email, address, state, delivery, phone, names;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_jwt["default"].getToken({
            req: req,
            secret: secret
          }));

        case 3:
          token = _context.sent;

          if (!token) {
            _context.next = 11;
            break;
          }

          // const sub = token.account.id;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, address = _req$body.address, state = _req$body.state, delivery = _req$body.delivery, phone = _req$body.phone;
          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.details.create({
            data: {
              name: name,
              email: email,
              address: address,
              state: state,
              delivery: delivery,
              phone: Number(phone)
            }
          }));

        case 8:
          names = _context.sent;
          // const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
          // console.log("json web token", JSON.stringify(token, null, 2));
          res.json({
            names: names
          });
          prisma.$disconnect();

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log("Real stuff");
          console.log(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports["default"] = _callee;