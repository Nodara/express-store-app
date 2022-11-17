const Region = require('../db/models/region.model');
const Log = require('../mongodb/models/log.model');

const getAllRegions = async () => Region.findAll();

const createRegion = async (name) => Region.create({ name }, { returning: true });

const updateRegion = async ({ regionId, name }) => {

  const region = await Region.findByPk(regionId);

  if (!region) return { message: 'unable to find that region' };

  await Region.update({ name }, {
    where: {
      id: regionId,
    }
  });

  const regionUpdateLog = new Log({
    actionType: 'UPDATED',
    dataType: 'REGION',
    fieldType: 'name',
    previousValue: region.name,
    currentValue: name,
  });


  await regionUpdateLog.save();

  return { message: 'UPDATED' };
};

const deleteRegion = async (regionId) => {
  const region = await Region.findByPk(regionId);

  if (!region) return { message: 'unable to find that region' };

  await Region.destroy({
    where: {
      id: regionId
    }
  });

  return { message: 'region deleted' };
};


module.exports = {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion,
};