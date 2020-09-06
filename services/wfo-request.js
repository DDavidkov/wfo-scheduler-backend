const db = require("../models");
const WFORequest = db.WFORequest;

exports.getWfoRequests = async () => {
  const wfoRequests = await WFORequest.findAll();

  return wfoRequests;
};

exports.getWfoRequest = async (id) => {
  const wfoRequest = await WFORequest.findByPk(id);

  return wfoRequest;
};

exports.createWfoRequest = async (wfoRequest) => {
  const newWfoRequest = await WFORequest.create(wfoRequest);

  return newWfoRequest;
};

exports.updateWfoRequest = async (id, wfoRequest) => {
  const updatedWfoRequest = await WFORequest.update(wfoRequest, {
    where: { id },
    returning: true,
    plain: true
  });

  return updatedWfoRequest[1];
};

exports.deleteWfoRequest = async (id) => {
  const deletedCount = await WFORequest.destroy({ where: { id } });

  return deletedCount > 0;
};

exports.getForEmployee = async (id) => {
  const requests = await WFORequest.findAll({ where: { employee_id: id } });
  return requests;
};
