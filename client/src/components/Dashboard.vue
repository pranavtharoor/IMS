<template>
  <div>
    <h2 class="heading">{{ msg }}</h2>
    <input class="small-input" placeholder="Customer name" type="text" v-model="order.customer_name">
    <div>
      GST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input class="small-input number-input" type="number" v-model.number="order.gst">
    </div>
    <div>
      Discount: <input class="small-input number-input" type="number" v-model.number="order.discount">
    </div>
    <div>
      Paid:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input class="small-input number-input" type="number" v-model.number="order.paid">
    </div>
    <div>
      <select class="select-product" v-model="product.product_id">
        <option :value=null disabled hidden>Select Product</option>
        <option v-for="product in products" v-if="product.status" v-bind:value="product.product_id">{{ product.name }}</option>
      </select>
      <span class="select-quantity">Quantity:</span>
      <input class="small-input number-input" type="number" v-model.number="product.quantity">
      <button class="btn" v-on:click="addProduct()">Add</button>
    </div>
    <div v-if="order_details.length > 0" class="data-item head">
      <div class="data">Product Name</div>
      <div class="data">Quantity</div>
      <div class="data">Cost</div>
    </div>
    <div class="data-item" v-for="product, i in order_details">
      <div class="data"><span class="mobile-view">Product Name:&nbsp;</span>{{ product.product_name }} </div>
      <div class="data"><span class="mobile-view">Quantity:&nbsp;</span>{{ product.quantity }} </div>
      <div class="data last"><span class="mobile-view">Cost:&nbsp;</span>{{ product.quantity * product.price }}</div>
    </div>
    <div class="total">
      <div>Sub Total: {{ sub_total }}</div>
      <div>Net Total: {{ net_total }}</div>
    </div>
    <button class="btn" v-on:click="placeOrder()">Order</button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    placeOrder() {
      if(
        this.order.customer_name !== '' &&
        this.order.gst !== '' &&
        this.order.gst >= 0 &&
        this.order.gst <= 100 &&
        this.order.discount !== '' &&
        this.order.discount >= 0 &&
        this.order.discount <= 100 &&
        this.order.paid !== '' &&
        this.order.paid >= 0 &&
        this.order_details.length > 0
        )
        fetch('/orders', {
          credentials: 'include',
          body: JSON.stringify({
            order: {
              ...this.order, sub_total: this.sub_total, net_total: this.net_total
            },
            order_details: this.order_details.map(od => ({ price: od.price, product_id: od.product_id, quantity: od.quantity }))
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success) {
              this.order_details = [],
              this.order.customer_name = ''
              this.order.gst = 0
              this.order.discount = 0
              this.order.paid = 0
            } else console.log(data)
          })
    },
    addProduct() {
      if(this.product.product_id !== null && this.product.quantity !== null && this.product.quantity > 0) {
        this.order_details.push({
          ...this.product,
          product_name: this.products.filter(product => product.product_id === this.product.product_id)[0].name,
          price: this.products.filter(product => product.product_id === this.product.product_id)[0].price
        })
        this.product.product_id = null
        this.product.quantity = 0
        this.order.paid = this.net_total
      }
    }
  },
  mounted() {
    fetch('/products', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.products = data.data
      })
  },
  data () {
    return {
      msg: 'New Orders',
      order: {
        customer_name: '',
        gst: 0,
        discount: 0,
        paid: 0
      },
      order_details: [],
      product: {
        product_id: null,
        quantity: 0,
        price: 0
      },
      products: []
    }
  },
  computed: {
    sub_total: function() {
      return parseFloat(Math.round((
        this.order_details.reduce((total, od) => total + (od.price * od.quantity), 0)
        ) * 100) / 100).toFixed(2);
    },
    net_total: function() {
      let discounted = this.sub_total - this.order.discount * this.sub_total / 100
      return parseFloat(Math.round((
        discounted + this.order.gst * this.sub_total / 100
        ) * 100) / 100).toFixed(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data {
  width: 30%;
}

.total {
  margin: 20px 10px;
  font-size: 30px;
}

.select-quantity {
  margin-left: 20px;
}

.mobile-view {
  display: none;
}

.data-item.head {
  border: none;
  font-size: 24px;
  margin: 10px 0;
  font-weight: bold;
}

@media only screen and (max-width: 750px) {

  .mobile-view {
    display: inline-block;
  }

  .data-item.head {
    display: none;
  }

  .select-product {
    margin-top: 30px;
  }
  .select-quantity {
    margin: 10px 0;
    display: block;
  }

  .data {
    width: 100%;
  }

  .data.last {
    margin-bottom: 10px;
  }

}

</style>
