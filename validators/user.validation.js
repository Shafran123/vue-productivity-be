const Joi = require('@hapi/joi')

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };


const userLoginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().required().email(),
            password: Joi.string().required()

        }
    )

    return schema.validate(data , options)

}


const createTeamValidation = (data) => {
  const schema = Joi.object(
      {
          team_code: Joi.string().required(),
          team_name: Joi.string().required(),
          start_date: Joi.date().required(),
          end_date : Joi.date(),
          status : Joi.any()
      }
  )

  return schema.validate(data , options)

}


const createEmpValidation = (data) => {
  const schema = Joi.object(
      {
          emp_code: Joi.string().required(),
          emp_name: Joi.string().required(),
          team_code: Joi.string().required(),
          join_date: Joi.date().required()
   
      }
  )

  return schema.validate(data , options)

}


module.exports.userLoginValidation = userLoginValidation
module.exports.createTeamValidation = createTeamValidation
module.exports.createEmpValidation = createEmpValidation

