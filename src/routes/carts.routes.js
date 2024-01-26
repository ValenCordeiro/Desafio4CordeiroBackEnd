const { Router } = require("express")
const CartManager = require("../cartManager")
const manager = new CartManager('./src/carts.json')

const router = Router()

router.post(`/`, (req, res) => {
    const {cid} = req.params
    return res.json({
        ok: true,
    })
})

router.get(`/:cid`, (req, res) => {
    const {cid} = req.params
    return res.json({
        ok: true,
    })
})

router.post(`/:cid/product/:pid`, (req, res) => {
    return res.json({
        ok: true,
    })
})

module.exports = router