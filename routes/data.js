const router = require('express').Router()
const containerAPI = require('./../models/containerAPI.js')

const Container = containerAPI.Container

// Getting all the calculation stats from the database
Container.getAllContainers()
router.get('/stats', (req, res) => {
	res.json({
		containers: {
			production: Container,
			storage: 1,
			addons: 1
		}
	})
})

module.exports = router

