<template>
  <div>
    <h2 class="heading">{{ msg }}</h2>

    <input placeholder="Category name" class="small-input" type="text" v-model="newCategory.name">

      <div class="checkbox">
        <input id="status-checkbox" type="checkbox" v-model="newCategory.status">
        <label for="status-checkbox"></label>
      </div> {{ newCategory.status ? 'active' : 'inactive' }}

    <button v-on:click="addCategory()" class="btn">Add</button>

    <div class="data-item" v-for="category, i in categories">
      <div v-if="editCategory.category_id === category.category_id" class="data"><input placeholder="Category name" class="small-input" v-model="editCategory.name" /></div>
      <div v-if="editCategory.category_id === category.category_id" class="data">


        <div class="checkbox">
          <input id="edit-status-checkbox" type="checkbox" v-model="editCategory.status" />
          <label for="edit-status-checkbox"></label>
        </div> {{ editCategory.status ? 'active' : 'inactive' }}

      </div>
      <div v-if="editCategory.category_id === category.category_id" class="data-option-btn"><button v-on:click="updateCategory(i)">Save</button></div>
      <div v-if="editCategory.category_id !== category.category_id" class="data">{{ category.name }}</div>
      <div v-if="editCategory.category_id !== category.category_id" class="data">{{ category.status ? 'active' : 'inactive' }}</div>
      <div v-if="editCategory.category_id !== category.category_id" class="data-option-btn">
        <button v-on:click="deleteCategory(category.category_id, i)">Delete</button>
        <button v-on:click="openEdit(category)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  methods: {
    addCategory() {
      if(this.newCategory.name !== '')
        fetch('/categories', {
          credentials: 'include',
          body: JSON.stringify({ ...this.newCategory, status: this.newCategory.status ? 1 : 0 }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success)
              this.categories.push({ ...this.newCategory, category_id: data.data.category_id})
            else console.log(data)
          })
    },
    deleteCategory(category_id, index) {
      fetch('/categories', {
        credentials: 'include',
        body: JSON.stringify({ category_id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(data.success)
            this.categories.splice(index, 1)
          else console.log(data)
        })
    },
    updateCategory(index) {
      if(this.editCategory.name !== '')
        fetch('/categories', {
          credentials: 'include',
          body: JSON.stringify({ ...this.editCategory, status: this.editCategory.status ? 1 : 0 }),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if(data.success) {
              this.categories[index] = { ...this.editCategory }
              this.editCategory.category_id = null
            }
            else console.log(data)
          })
    },
    openEdit(category) {
      this.editCategory = { ...category }
    }
  },
  mounted() {
    fetch('/categories', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if(data.success)
          this.categories = data.data.map(d => {
            d.status = d.status === 1 ? true : false
            return d
          })
      })
  },
  data () {
    return {
      msg: 'Categories',
      categories: [],
      newCategory: {
        name: '',
        status: true
      },
      editCategory: {
        category_id: null,
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
