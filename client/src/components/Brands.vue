<template>
  <div>
    <h2 class="heading">{{ msg }}</h2>

    <input placeholder="Brand name" class="small-input" type="text" v-model="newBrand.name">
    <div class="checkbox">
      <input id="status-checkbox" type="checkbox" v-model="newBrand.status">
      <label for="status-checkbox"></label>
    </div> {{ newBrand.status ? 'active' : 'inactive' }}
    <button class="btn" v-on:click="addBrand()">Add</button>

    <div class="data-item" v-for="brand, i in brands">
      <div v-if="editBrand.brand_id === brand.brand_id" class="data"><input placeholder="Brand name" class="small-input" v-model="editBrand.name" /></div>
      <div v-if="editBrand.brand_id === brand.brand_id" class="data">

        <div class="checkbox">
          <input id="edit-status-checkbox" type="checkbox" v-model="editBrand.status" />
          <label for="edit-status-checkbox"></label>
        </div> {{ editBrand.status ? 'active' : 'inactive' }}

      </div>
      <div v-if="editBrand.brand_id === brand.brand_id" class="data-option-btn"><button v-on:click="updateBrand(i)">Save</button></div>
      <div v-if="editBrand.brand_id !== brand.brand_id" class="data">{{ brand.name }}</div>
      <div v-if="editBrand.brand_id !== brand.brand_id" class="data">{{ brand.status ? 'active' : 'inactive' }}</div>
      <div v-if="editBrand.brand_id !== brand.brand_id" class="data-option-btn">
        <button v-on:click="deleteBrand(brand.brand_id, i)">Delete</button>
        <button v-on:click="openEdit(brand)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Brands',
  methods: {
    addBrand() {
      if(this.newBrand.name !== '')
        fetch('/brands', {
          credentials: 'include',
          body: JSON.stringify({ ...this.newBrand, status: this.newBrand.status ? 1 : 0 }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success)
              this.brands.push({ ...this.newBrand, brand_id: data.data.brand_id })
            else console.log(data)
          })
    },
    deleteBrand(brand_id, index) {
      fetch('/brands', {
        credentials: 'include',
        body: JSON.stringify({ brand_id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(data.success)
            this.brands.splice(index, 1)
          else console.log(data)
        })
    },
    updateBrand(index) {
      if(this.editBrand.name !== '')
        fetch('/brands', {
          credentials: 'include',
          body: JSON.stringify({ ...this.editBrand, status: this.editBrand.status ? 1 : 0 }),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success) {
              this.brands[index] = { ...this.editBrand }
              this.editBrand.brand_id = null
            }
            else console.log(data)
          })
    },
    openEdit(brand) {
      this.editBrand = { ...brand }
    }
  },
  mounted() {
    fetch('/brands', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.brands = data.data.map(d => {
            d.status = d.status === 1 ? true : false
            return d
          })
      })
  },
  data () {
    return {
      msg: 'Brands',
      brands: [],
      newBrand: {
        name: '',
        status: true
      },
      editBrand: {
        brand_id: null,
        name: null,
        status: true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
