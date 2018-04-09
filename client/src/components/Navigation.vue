<template>
  <div>
    <div v-on:click="toggleNav()" v-bind:class="{'open': navOpen}" id="burger-container">
      <div id="burger">
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </div>
    <nav v-bind:class="{'navClosed': !navOpen}" class="nav">
      <router-link v-on:click="closeNav()" class="nav-links" to="products" exact>Products</router-link>
      <router-link v-on:click="closeNav()" class="nav-links" to="brands" exact>Brands</router-link>
      <router-link v-on:click="closeNav()" class="nav-links" to="categories" exact>Categories</router-link>
      <router-link v-on:click="closeNav()" class="nav-links" to="orders" exact>Orders</router-link>
      <div v-on:click="closeNav()" class="logout-container">
        <div><router-link to="/" class="home-link" exact><i class="fa home-icon">&#xf015;</i></router-link></div>
        <div><a href="/logout" class="logout-button">Logout</a></div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    closeNav() {
      this.navOpen = false;
    },
    openNav() {
      this.navOpen = true;
    }
  },
  data () {
    return {
      navOpen: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#burger-container {
  display: none;
  position: absolute;
  left: 20px;
  top: 30px;
}

#burger {
  cursor: pointer;
  display: block;
}

#burger span {
  background: #fff;
  display: block;
  width: 27px;
  height: 3px;
  margin-bottom: 6px;
  position: relative;
  top: 0;
  transition: all ease-in-out 0.4s;
  border-radius: 1px;
}

#burger-container.open span:nth-child(2) {
  width: 0;
  opacity: 0;
}

#burger-container.open span:nth-child(3) {
  transform: rotate(45deg);
  top: -9px;
}

#burger-container.open span:nth-child(1) {
  transform: rotate(-45deg);
  top: 9px;
}

@media only screen and (max-width: 1050px) {

  #burger-container {
    display: block;
  }

}

.nav {
  display: flex;
  justify-content: flex-start;
  padding: 45px 45px 0 10%;
  margin: 0 auto 50px;
}

.nav-links {
  padding: 10px 30px;
  cursor: pointer;
  color: #aaa;
  border-bottom: solid #333;
  font-size: 1.15rem;
  margin-right: 5px;
  font-weight: bold;
}

.router-link-active:not(.home-link) {
  border-bottom: solid #aaa;
}

.logout-container {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.logout-button {
  padding: 10px 30px;
  border-style: none;
  background-color: #aaa;
  color: #333;
  font-size: 1.1rem;
  border-radius: 2px;
  cursor: pointer;
}

.home-icon {
  color: #bbb;
  font-size: 2rem;
  cursor: pointer;
  margin: 10px 20px 0 0;
}

.disabled {
  display: none;
}

.burger-no-network {
  top: 70px !important;
}

@media only screen and (max-width: 1050px) {

  .nav {
    flex-direction: column;
    justify-content: flex-end;
    border-bottom: solid thin #333;
    background-color: #333;
    padding: 0 10%;
    margin: 0;
    overflow: hidden;
    height: 330px;
    transition: height 0.8s;
  }

  .navClosed {
    height: 0;
    overflow: hidden;
    transition: height 0.8s;
  }

  .logout-button {
    font-size: 1.15rem;
    font-weight: bolder;
    width: 125px;
  }

  .logout-container {
    min-height: 90px;
    box-sizing: border-box;
    padding: 20px 0 30px;
    width: 100%;
  }

  .home-icon {
    margin: 0 20px 0 0;
  }

}

</style>
