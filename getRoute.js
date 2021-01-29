import express from 'express'
const router = express.Router()

const getProfile = (req, res) => {
    const profile = {
        message: `My Rule-Validation API`,
        status: `success`,
        data: {
          name: `Oluwajoba Fashogbon`,
          github: `@jobafash`,
          email: `jobafash3@gmail.com`,
          mobile: `+2349022339854`,
          twitter: `@jobafash`
        }
      }
    res.status(200).json(profile)
  }

router.route('/').get(getProfile)

export default router
