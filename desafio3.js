const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.readProductsFromFile();
        this.nextId = this.calculateNextId();
    }

    readProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error reading file:', error.message);
            return [];
        }
    }

    saveProductsToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing file:', error.message);
        }
    }

    calculateNextId() {
        return this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    }

    getProducts() {
        return this.products;
    }

    addProduct(productData) {
        if (!productData.title || !productData.description || !productData.price || !productData.thumbnail || !productData.code || !productData.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (!this.products.some(product => product.code === productData.code)) {
            let newProduct = { id: this.nextId++, ...productData };
            this.products.push(newProduct);
            this.saveProductsToFile();
            console.log(`El producto ${productData.title} fue agregado correctamente`);
        } else {
            console.log("Ya existe un producto con el código " + productData.code);
        }
    }

    getProductById(productId) {
        let product = this.products.find(product => product.id === productId);

        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    updateProduct(productId, updatedProductData) {
        let index = this.products.findIndex(product => product.id === productId);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProductData, id: productId };
            this.saveProductsToFile();
            console.log(`El producto con ID ${productId} fue actualizado correctamente`);
        } else {
            console.log(`No se encontró un producto con ID ${productId}`);
        }
    }

    deleteProduct(productId) {
        let index = this.products.findIndex(product => product.id === productId);

        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProductsToFile();
            console.log(`El producto con ID ${productId} fue eliminado correctamente`);
        } else {
            console.log(`No se encontró un producto con ID ${productId}`);
        }
    }
}

const productManager = new ProductManager('juegos.json');

productManager.addProduct({
    title: "God of War Ragnarök",
    description: "Accion",
    price: 50,
    thumbnail: "/images/juego1.jpg",
    code: "01",
    stock: "50"
});

productManager.addProduct({
    title: "Resident Evil 4",
    description: "Zombie",
    price: 80,
    thumbnail: "/images/juego2.jpg",
    code: "02",
    stock: "80"
});

productManager.addProduct({
    title: "Resident Evil 4",
    description: "Zombie",
    price: 80,
    thumbnail: "/images/juego2.jpg",
    code: "02",
    stock: "80"
});


console.log(productManager.getProducts());

let productById = productManager.getProductById(1);
console.log(productById);

productManager.updateProduct(1, { price: 120, stock: 25 });

productManager.deleteProduct(2);

console.log(productManager.getProducts());

module.exports = ProductManager;