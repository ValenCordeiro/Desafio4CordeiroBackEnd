const fs = require('fs')

class CartManager {
    constructor(filePath) {
        this.path = filePath
        this.carts = []
        this.loadCarts()
        this.cartIdCounter = this.calculateNextCartId()
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            if (!Array.isArray(this.carts)) {
                this.carts = []
            }
        } catch (error) {
            console.log(error)
            this.carts = []
        }
    }

    saveCarts() {
        try {
            const data = JSON.stringify(this.carts, null, 2)
            fs.writeFileSync(this.path, data)
        } catch (error) {
            console.error('Error al guardar carritos:', error)
        }
    }

    calculateNextCartId() {
        const ids = this.carts.map(cart => cart.id)
        const maxId = Math.max(...ids, 0)
        return maxId + 1
    }

    createCart(products) {
        const newCart = {
            id: this.cartIdCounter++,
            products
        }

        this.carts.push(newCart)
        this.saveCarts()

        return newCart
    }

    getCartById(cartId) {
        const cart = this.carts.find((c) => c.id === cartId)
        if (!cart) {
            return "¡¡ERROR!! Carrito no encontrado"
        }
        return cart
    }

    getProductsInCart(cartId) {
        const cart = this.getCartById(cartId)
        return cart ? cart.products : []
    }

    addProductToCart(cartId, productId, quantity = 1) {
        const cart = this.getCartById(cartId)

        if (!cart) {
            console.error("¡¡ERROR!! Carrito no encontrado")
            return
        }

        const existingProduct = cart.products.find(item => item.id === productId)

        if (existingProduct) {
            existingProduct.quantity += quantity
        } else {
            const newProduct = {
                id: productId,
                quantity: quantity
            }
            cart.products.push(newProduct)
        }

        this.saveCarts()

        return cart
    }
}

module.exports = CartManager