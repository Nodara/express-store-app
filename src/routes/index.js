const router = require('express').Router();

// Custom Routes
const ProductRoutes = require('./productRoutes');
const RegionRoutes = require('./regionRoutes');
const StoreRoutes = require('./storeRoutes');
const UserRoutes = require('./userRoutes');
const AuthRoutes = require('./authRoutes');
const checkAuth = require('../middleware/authMiddleware');

router.use('/auth', AuthRoutes);

// Auth Middleware
router.use(checkAuth);

router.use('/products', ProductRoutes);
router.use('/users', UserRoutes);
router.use('/stores', StoreRoutes);
router.use('/regions', RegionRoutes);
router.use('/test', (req, res,) => res.sendStatus(200));

module.exports = router;