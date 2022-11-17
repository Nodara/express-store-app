const signale = require('signale');
const RegionService = require('../services/regionService');

const getAllRegions = async (req, res) => {
  const data = await RegionService.getAllRegions();

  return res.json(data);
};



const createRegion = async (req, res) => {
  const { name } = req.body;

  const created = await RegionService.createRegion(name);

  if (created) {
    return res.json({ message: 'Region Created' });
  }

  return res.json({ message: 'NOT_CREATED' });

};

const updateRegion = async (req, res) => {
  try {
    const { regionId } = req.params;
    const { name } = req.body;

    const message = await RegionService.updateRegion({ regionId, name });


    return res.json(message);
  } catch (e) {

    signale.error('ERROR', e);

    return res.status(500).json({
      message: 'SERVER ERROR'
    });
  }


};

const deleteRegion = async (req, res) => {
  const { regionId } = req.params;
  const message = await RegionService.deleteRegion(regionId);

  return res.json(message);
};


module.exports = {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion
};