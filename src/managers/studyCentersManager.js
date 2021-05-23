const StudyCenter = require("../database/models/studyCenterModel");
const operationResult = require("../helpers/basicOperationResult");

const getAll = async () => {
  try {
    const studyCenters = await StudyCenter.find().exec();
    return operationResult.ok(studyCenters);
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const create = async (studyCenter, userId) => {
  try {
    const errorMessage = validateStudyCenter(studyCenter);

    if (errorMessage) {
      return operationResult.fail(errorMessage);
    }

    await new StudyCenter({
      userId,
      name: studyCenter.name,
      career: studyCenter.career,
    }).save();

    return operationResult.ok();
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const validateStudyCenter = ({ name, career }) => {
  if (!name) {
    return "El nombre del centro de estudio es requerido";
  }

  if (!career) {
    return "El nombre de la carrera es requerido";
  }
};

module.exports = { getAll, create };
