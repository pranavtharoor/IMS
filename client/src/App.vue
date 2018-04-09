<template>
  <div id="app">
    <Navigation />
    <div class="data-container"><router-view /></div>
  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

* {
  box-sizing: border-box;
  outline: none;
}

a {
  text-decoration: none;
  color: #eee;
}

body {
  font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #222;
  color: #eee;
}

button, table {
  font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
}

button {
  cursor: pointer;
}

h2 {
  margin: 0;
}

select {
  padding: 3px 10px;
  border: solid thin #666;
  background-color: #444;
  color: #eee;
  font-size: 1rem;
  border-radius: 2px;
  margin-bottom: 15px;
  margin-left: 5px;
}

.checkbox {
  width: 40px;
  height: 10px;
  background: #555;
  margin: 0px 10px;
  position: relative;
  border-radius: 3px;
  display: inline-block;
}

.checkbox label {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  -ms-transition: all .5s ease;
  transition: all .5s ease;
  cursor: pointer;
  position: absolute;
  top: -3px;
  left: -3px;
  background: #ccc;
}

.checkbox input[type=checkbox] {
  display: none;
}

.checkbox input[type=checkbox]:checked + label {
  left: 27px;
}

.small-input {
  padding: 3px 10px;
  border: solid thin #666;
  background-color: #444;
  color: #eee;
  font-size: 1.1rem;
  border-radius: 2px;
  margin-bottom: 15px;
  margin-left: 5px;
}

.wrong-input {
  border-color: red;
}

.right-input {
  border-color: green;
}

.btn {
  margin-left: 10px;
  padding: 4px 15px;
  border-style: none;
  background-color: #ccc;
  color: #333;
  font-size: 1rem;
  border-radius: 2px;
}

.data-container {
  width: 80%;
  margin: 0 auto 80px;
}
.data-item {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #ddd;
  border-style: none none solid none;
  border-width: thin;
  border-color: #444;
  overflow: hidden;
  min-height: 61px;
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

.data {
  width: 33%;
  margin: 15px 15px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.items-right {
  margin-left: auto;
  display: flex;
  margin: 15px 0;
}

.data-option-btn {
  justify-content: center;
  font-size: 1rem;
  align-items: center;
  min-width: 166.59px;
}

.data-option-btn button {
  padding: 5px 15px;
  border-style: none;
  background-color: #444;
  color: #ddd;
  border-radius: 2px;
  text-align: center;
  margin-right: 20px;
}

.no-content {
  color: #eee;
  height: calc(80vh - 100px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.heading {
  width: 80%;
  margin: 20px auto;
  color: #eee;
  font-size: 1.4rem;
  display: none;
}

.number-input {
  width: 100px;
}

@media only screen and (max-width: 1050px) {

  .heading {
    width: auto;
    margin: 30px auto 20px;
    font-weight: bolder;
    display: block;
  }

}

@media only screen and (max-width: 750px) {

  .heading {
    margin: 30px 60px 20px;
  }

  .data {
    width: 100%;
  }

  .items-right {
    flex-direction: row-reverse;
  }

  .view-btn  {
    padding: 5px 15px;
    border-style: none;
    background-color: #444;
    color: #ddd;
    border-radius: 2px;
    text-align: center;
    font-size: 0.85rem;
  }

  .data-container {
    width: 95%;
  }

  .data-option-btn{
    padding: 10px 0;
  }

}
</style>
