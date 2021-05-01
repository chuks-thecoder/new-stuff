"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

var prisma = new _client.PrismaClient();

var _callee = function _callee(req, res) {
  var postId, post;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          postId = req.query.id; // GET /api/post/:id

          _context.next = 3;
          return regeneratorRuntime.awrap(prisma.comments.findMany());

        case 3:
          post = _context.sent;
          res.json(post);
          prisma.$disconnect();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;