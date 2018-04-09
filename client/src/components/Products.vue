<template>
  <div>
    <h2 class="heading">{{ msg }}</h2>

    <div class="data-item head">
      <div class="data">
        <input placeholder="Product name" class="small-input" type="text" v-model="newProduct.name">
      </div>
      <div class="data">
        <select v-model="newProduct.brand_id">
          <option :value=null disabled hidden>Select Brand</option>
          <option v-for="brand in brands" v-if="brand.status" v-bind:value="brand.brand_id">{{ brand.name }}</option>
        </select>
        <select v-model="newProduct.category_id">
          <option :value=null disabled hidden>Select Category</option>
          <option v-for="category in categories" v-if="category.status" v-bind:value="category.category_id">{{ category.name }}</option>
        </select>
      </div>
      <div class="data">
        Price: <input class="small-input number-input" type="number" v-model.number="newProduct.price">
      </div>
      <div class="data">
        Stock: <input class="small-input number-input" type="number" v-model.number="newProduct.stock">
      </div>
      <div class="data">
        Status:
        <div class="checkbox">
          <input id="status-checkbox" type="checkbox" v-model="newProduct.status" />
          <label for="status-checkbox"></label>
        </div> {{ newProduct.status ? 'active' : 'inactive' }}
      </div>
      <div class="data">
        <button class="btn" v-on:click="addProduct()">Add</button>
      </div>
    </div>

    <div v-for="product, i in products">

      <div class="data-item" v-if="editProduct.product_id === product.product_id">
        <div class="data"><span class="data">Product Name: </span>
          <input class="small-input" v-model="editProduct.name" />
        </div>
        <div class="data"><span class="data">Brand Name: </span>
          <select v-model="editProduct.brand_id">
            <option v-for="brand in brands" v-bind:value="brand.brand_id">{{ brand.name }}</option>
          </select>
        </div>
        <div class="data"><span class="data">Category Name: </span>
            <select v-model="editProduct.category_id">
            <option v-for="category in categories" v-bind:value="category.category_id">{{ category.name }}</option>
          </select>
        </div>
        <div class="data"><span class="data">Stock: </span>
          <input class="small-input number-input" type="number" v-model.number="editProduct.price">
        </div>
        <div class="data"><span class="data">Price: </span>
          <input class="small-input number-input" type="number" v-model.number="editProduct.stock">
        </div>
        <div class="data"><span class="data">Status: </span>
          <div class="checkbox">
            <input id="edit-status-checkbox" type="checkbox" v-model="editProduct.status" />
            <label for="edit-status-checkbox"></label>
          </div> {{ editProduct.status ? 'active' : 'inactive' }}
        </div>
        <div class="data-option-btn">
          <button v-on:click="updateProduct(i)">Save</button>
        </div>
      </div>

      <div class="data-item" v-else>
        <div class="data"><span class="data">Product Name: </span>{{ product.name }}</div>
        <div class="data"><span class="data">Brand Name: </span>{{ product.brand_name }}</div>
        <div class="data"><span class="data">Category Name: </span>{{ product.category_name }}</div>
        <div class="data"><span class="data">Stock: </span>{{ product.stock }}</div>
        <div class="data"><span class="data">Price: </span>{{ product.price }}</div>
        <div class="data"><span class="data">Status: </span>{{ product.status ? 'active' : 'inactive' }}</div>
        <div class="data-option-btn">
          <button v-on:click="deleteProduct(product.product_id, i)">
            Delete
          </button>
          <button v-on:click="openEdit(product)">
            Edit
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  methods: {
    addProduct() {
      if(
        this.newProduct.name !== '' &&
        this.newProduct.brand_id !== null &&
        this.newProduct.category_id !== null &&
        this.newProduct.stock !== null &&
        this.newProduct.stock >= 0 &&
        this.newProduct.price !== null &&
        this.newProduct.price >= 0
      )
        fetch('/products', {
          credentials: 'include',
          body: JSON.stringify({ ...this.newProduct, status: this.newProduct.status ? 1 : 0 }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success) {
              this.products.push({
                name: this.newProduct.name,
                product_id: data.data.product_id,
                category_name: this.categories.filter(category => category.category_id === this.newProduct.category_id)[0].name,
                brand_name: this.brands.filter(brand => brand.brand_id === this.newProduct.brand_id)[0].name,
                status: this.newProduct.status ? 1 : 0,
                price: this.newProduct.price,
                stock: this.newProduct.stock
              })
              this.newProduct.name = ''
              this.newProduct.name = ''
              this.newProduct.category_id = null
              this.newProduct.brand_id = null
              this.newProduct.price = 0
              this.newProduct.stock = 0
              this.newProduct.status = true
            }
            else console.log(data)
          })
    },
    deleteProduct(product_id, index) {
      fetch('/products', {
        credentials: 'include',
        body: JSON.stringify({ product_id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(data.success)
            this.products.splice(index, 1)
          else console.log(data)
        })
    },
    updateProduct(index) {
      let body = {
          product_id: this.editProduct.product_id,
          name: this.editProduct.name,
          category_id: this.editProduct.category_id,
          brand_id: this.editProduct.brand_id,
          price: this.editProduct.price,
          stock: this.editProduct.stock,
          status: this.editProduct.status ? 1 : 0,
        }
        console.log(body);
      if(
        body.name !== '' &&
        body.stock !== null &&
        body.stock >= 0 &&
        body.price !== null &&
        body.price >= 0
        )
        fetch('/products', {
          credentials: 'include',
          body: JSON.stringify(body),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success) {
              this.products[index] = {
                ...this.editProduct,
                brand_name: this.brands.filter(brand => brand.brand_id === this.editProduct.brand_id)[0].name,
                category_name: this.categories.filter(category => category.category_id === this.editProduct.category_id)[0].name
              }
              this.editProduct.product_id = null
            }
            else console.log(data)
          })
    },
    openEdit(product) {
      this.editProduct = { ...product }
    }
  },
  mounted() {
    fetch('/products', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.products = data.data.map(d => {
            d.status = d.status === 1 ? true : false
            return d
          })
      });
    fetch('/brands', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.brands = data.data
      });
    fetch('/categories', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.categories = data.data
      });
  },
  data () {
    return {
      msg: 'Products',
      products: [],
      brands: [],
      categories: [],
      newProduct: {
        name: '',
        category_id: null,
        brand_id: null,
        price: 0,
        stock: 0,
        status: true
      },
      editProduct: {
        product_id: null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data {
  width: 100%;
}

.data-item.head {
  /*border: none;*/
  font-size: 24px;
  margin: 10px 0;
  font-weight: bold;
  padding-bottom: 20px;
}

.right {
  display: flex;
  justify-content: flex-end;
  margin: 30px;
}

.view-data {
  font-size: 20px;
  margin-left: 20px;
}

.data-option-btn{
  padding: 10px 0;
  margin: 5px 0;
}

@media only screen and (max-width: 1135px) {

  .data {
    width: 100%;
  }

  .order-data {
    width: 100%;
    padding: 10px;
  }

  .view-data {
    margin-left: 25px;
  }

}
</style>
