"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const type_controllers_1 = require("../controllers/type.controllers");
const router = (0, express_1.Router)();
router.get('/', type_controllers_1.getTypes);
router.get('/:idTypes', type_controllers_1.getTypesById);
exports.default = router;
//# sourceMappingURL=type.routes.js.map