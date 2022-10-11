const { Sneaker } = require('../models')
module.exports = {
    // get all sneaker
    async index(req, res) {
        try {
            let sneakers = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                sneakers = await Sneaker.findAll({
                    where: {
                        $or: [
                            'name', 'content', 'brand'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                sneakers = await Sneaker.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(sneakers)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the sneakers'
            })
        }
    },
    // create sneaker
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const sneaker = await Sneaker.create(req.body)
            res.send(sneaker.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create sneaker incorrect'
            })
        }
    },
    // edit sneaker, suspend, active
    async put(req, res) {
        try {
            await Sneaker.update(req.body, {
                where: {
                    id: req.params.sneakerId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update sneaker incorrect'
            })
        }
    },

    // delete sneaker
    async remove(req, res) {
        try {
            const sneaker = await Sneaker.findOne({
                where: {
                    id: req.params.sneakerId
                }
            })
            if (!sneaker) {
                return res.status(403).send({
                    error: 'The sneaker information was incorrect'
                })
            }
            await sneaker.destroy()
            res.send(sneaker)
        } catch (err) {
            res.status(500).send({
                error: 'The sneaker information was incorrect'
            })
        }
    },
    // get sneaker by id
    async show(req, res) {
        try {
            const sneaker = await Sneaker.findByPk(req.params.sneakerId)
            res.send(sneaker)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The sneaker information was incorrect'
            })
        }
    }
}
