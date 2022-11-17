const router = require('express').Router();

const RegionController = require('../controllers/regionController');


router.get('/', RegionController.getAllRegions);
router.post('/', RegionController.createRegion);

router.put('/:regionId', RegionController.updateRegion);
router.delete('/:regionId', RegionController.deleteRegion);

module.exports = router;
