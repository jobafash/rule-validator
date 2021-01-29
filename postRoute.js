import express from 'express'
const router = express.Router()

const allRules = (req, res) => {
  const { rule, data } = req.body  
  if (!rule){
      const result = {
        "message": `rule is required.`,
        "status": `error`,
        "data": null
        }
        res.status(400).json(result)
  }
  if (!data){
      const result = {
        "message": `data is required.`,
        "status": `error`,
        "data": null
        }
      res.status(400).json(result)
  }
  const field = rule.field
  const condition = rule.condition
  const condition_value = rule.condition_value
  const datatype = typeof data
  const ruletype = typeof rule
  const field_value = data[field]
  if (ruletype !== 'object' || rule.constructor === Array){
    const result = {
        "message": `rule should be an object.`,
        "status": `error`,
        "data": null
        }
    res.status(400).json(result)
  }
  else if (datatype != 'object' &&  data.constructor !== Array && datatype != 'string'){
    const result = {
        "message": `data should be an object, array or string.`,
        "status": `error`,
        "data": null
        }
    res.status(400).json(result)
  }
  else if (!field || !condition || !condition_value){
    const result = {
      "message": `Invalid JSON payload passed.`,
      "status": `error`,
      "data": null
    }
    res.status(400).json(result)
  }
else if (condition === "gte" && field_value >= condition_value){
        const result = {
            "message": `field ${field} successfully validated.`,
            "status": `success`,
            "data": {
              "validation": {
                "error": false,
                "field": field,
                "field_value": field_value,
                "condition": condition,
                "condition_value": condition_value
              }
            }
          }
          res.status(200).json(result)
    }
else if (condition === "gte" && field_value < condition_value){
        const result = {
            "message": `field ${field} failed validation.`,
            "status": `error`,
            "data": {
              "validation": {
                "error": true,
                "field": field,
                "field_value": field_value,
                "condition": condition,
                "condition_value": condition_value
              }
            }
          }
          res.status(400).json(result)
    }
else if (condition === "eq" && field_value === condition_value){
      const result = {
          "message": `field ${field} successfully validated.`,
          "status": "success",
          "data": {
            "validation": {
              "error": false,
              "field": field,
              "field_value": field_value,
              "condition": condition,
              "condition_value": condition_value
            }
          }
        }
        res.status(200).json(result)
  }
else if (condition === "eq" && field_value !== condition_value){
      const result = {
          "message": `field ${field} failed validation.`,
          "status": `error`,
          "data": {
            "validation": {
              "error": true,
              "field": field,
              "field_value": field_value,
              "condition": condition,
              "condition_value": condition_value
            }
          }
        }
        res.status(400).json(result)
  }
else if (condition === "neq" && field_value !== condition_value){
    const result = {
        "message": `field ${field} successfully validated.`,
        "status": "success",
        "data": {
          "validation": {
            "error": false,
            "field": field,
            "field_value": field_value,
            "condition": condition,
            "condition_value": condition_value
          }
        }
      }
      res.status(200).json(result)
}
else if (condition === "neq" && field_value === condition_value){
    const result = {
        "message": `field ${field} failed validation.`,
        "status": `error`,
        "data": {
          "validation": {
            "error": true,
            "field": field,
            "field_value": field_value,
            "condition": condition,
            "condition_value": condition_value
          }
        }
      }
      res.status(400).json(result)
}
else if (condition === "gt" && field_value > condition_value){
  const result = {
      "message": `field ${field} successfully validated.`,
      "status": "success",
      "data": {
        "validation": {
          "error": false,
          "field": field,
          "field_value": field_value,
          "condition": condition,
          "condition_value": condition_value
        }
      }
    }
    res.status(200).json(result)
}
else if (condition === "gt" && field_value <= condition_value){
  const result = {
      "message": `field ${field} failed validation.`,
      "status": `error`,
      "data": {
        "validation": {
          "error": true,
          "field": field,
          "field_value": field_value,
          "condition": condition,
          "condition_value": condition_value
        }
      }
    }
    res.status(400).json(result)
}
else if (!(field in data)){
  const result = {
      "message": `field ${field} is missing from data.`,
      "status": `error`,
      "data": null
      }
  res.status(400).json(result)
}
else if (condition === "contains" && typeof condition_value == 'string' && typeof field_value == 'object' && condition_value in field_value){
  const result = {
    "message": `field ${field} successfully validated.`,
    "status": "success",
    "data": {
      "validation": {
        "error": false,
        "field": field,
        "field_value": field_value,
        "condition": condition,
        "condition_value": condition_value
      }
    }
  }
  res.status(200).json(result)
}
else if (condition === "contains" && !(typeof condition_value == 'string' && typeof field_value == 'object' && condition_value in field_value)){
  const result = {
      "message": `field ${field} failed validation.`,
      "status": `error`,
      "data": {
        "validation": {
          "error": true,
          "field": field,
          "field_value": field_value,
          "condition": condition,
          "condition_value": condition_value
        }
      }
    }
    res.status(400).json(result)
}
else {
  const result = {
    "message": `Invalid JSON payload passed.`,
    "status": `error`,
    "data": null
  }
  res.status(400).json(result)
}
  }

router.route('/validate-rule').post(allRules)

export default router
