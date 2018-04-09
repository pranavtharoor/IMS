<template>
  <div>
    <h2 class="heading">{{ msg }}</h2>

    <div v-if="orderDetails.length > 0">
      <div class="right"><button class="btn" v-on:click="orderDetails=[]">Close</button></div>
      <div class="view-data">Customer Name: {{ order.customer_name }}</div>
      <div class="view-data">Order Date: {{ order.order_date.substring(0, 10) }}</div>
      <div class="view-data">Sub Total: {{ order.sub_total }}</div>
      <div class="view-data">GST: {{ order.gst }}</div>
      <div class="view-data">Discount: {{ order.discount }}</div>
      <div class="view-data">Paid: {{ order.paid }}</div>
      <br />
      <div class="data-item head">
        <div class="order-data-head">Product Name</div>
        <div class="order-data-head">Price</div>
        <div class="order-data-head">Quantity</div>
        <div class="order-data-head">Total</div>
      </div>
      <div class="data-item" v-for="od in orderDetails">
        <div class="order-data"><span class="mobile-title">Product Name: </span>{{ od.product_name }}</div>
        <div class="order-data"><span class="mobile-title">Price: </span>{{ od.price }}</div>
        <div class="order-data"><span class="mobile-title">Quantity: </span>{{ od.quantity }}</div>
        <div class="order-data"><span class="mobile-title">Total: </span>{{ od.price * od.quantity }}</div>
      </div>
    </div>

    <div v-else>
      <div class="data-item head">
        <div class="data"><div>Customer Name</div></div>
        <div class="data"><div>Order Date</div></div>
        <div class="data"><div>Net Total</div></div>
        <div class="data-option-btn"></div>
      </div>
      <div class="data-item" v-for="order, i in orders">
        <div class="data">{{ order.customer_name }}</div>
        <div class="data">{{ order.order_date.substring(0, 10) }}</div>
        <div class="data">{{ order.net_total }}</div>
        <div class="data-option-btn">
          <button v-on:click="deleteOrder(order.order_id, i)">Delete</button>
          <button class="view-btn" v-on:click="getDetails(order)">View</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Orders',
  methods: {
    deleteOrder(order_id, index) {
      fetch('/orders', {
        credentials: 'include',
        body: JSON.stringify({ order_id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(data.success)
            this.orders.splice(index, 1)
          else console.log(data)
        })
    },
    getDetails(order) {
      fetch(`/orders/${order.order_id}`, { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          if(data.success) {
            this.orderDetails = data.data
            this.order = { ...order }
          }
        })
    }
  },
  mounted() {
    fetch('/orders', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.orders = data.data
      })
  },
  data() {
    return {
      msg: 'Orders',
      orders: [],
      order: null,
      orderDetails: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data {
  width: 25%;
}

.data-item.head {
  border: none;
  font-size: 24px;
  margin: 10px 0;
  font-weight: bold;
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

.mobile-title {
  display: none;
}

.view-btn {
  margin: 0 20px 0 0;
  padding: 5px 15px;
  border-style: none;
  background-color: transparent;
  color: #ddd;
  border-radius: 2px;
  font-size: 1rem;
  cursor: pointer;
}

@media only screen and (max-width: 1135px) {

  .data {
    width: 100%;
  }

  .data-option-btn{
    padding: 10px 0;
  }

  .order-data {
    width: 100%;
    padding: 10px;
  }

  .mobile-title {
    display: inline-block;
  }

  .data-item.head {
    display: none;
  }

  .view-data {
    margin-left: 25px;
  }

}
</style>
