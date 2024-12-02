const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role');

router.post('/', RoleController.createRole);
router.get('/', RoleController.getAllRoles);

module.exports = router;
