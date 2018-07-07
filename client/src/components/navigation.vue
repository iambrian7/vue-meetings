<template>
  <div class="navigation">
      <nav>
        <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/meetings">Meetings</router-link></li>
          <li><router-link to="/addmeeting">New Meetings</router-link></li>
          <li><router-link to="/compare-meetings">Compare</router-link></li>
            <li><router-link to="/posts">Posts</router-link></li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      msg: 'Navigation',
      onpage: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
nav a.router-link-exact-active {
   font-weight: 700;
   color: red;
}
.router-exact-link-active {color: red;}
/* .active { color: red;} */
nav { color: black; padding: 30px 0; font-size: 16px;}
nav {
    /* opacity: 0.0;
   filter: alpha(opacity=50); For IE8 and earlier */
    background: rgba(204, 204, 204, 0.0);
}
ul {
  list-style: none;
}
nav {
  display: flex;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}

nav ul {
  display: flex;
  justify-content: flex-end;
}
nav ul:first-child {
  flex: 3;
}

nav ul:last-child {
  flex: 2;
  margin-left: 50px;
}
nav ul li a{
  flex: 1 0 100px;
  color: rgb(19, 18, 18);
  text-align: center;
  text-decoration: none;
  padding: 10px 15px;
  border: 1px solid #888;
  margin-right: 30px;
  border-radius: 5px;
  display: block;
}
nav ul li a:hover{ background: blue; color: white;}
@media screen and (max-width: 767px) {
  nav {
    flex-direction: column;
  }
  
}
</style>

