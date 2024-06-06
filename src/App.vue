<script setup>
</script>

<template>
  <div id="app">
    <div class="sidebar">
      <nav>
        <router-link to="/">Hello</router-link>
        <div>
          TT2
          <ul>
            <li><router-link to="/tt2/titan">Titan Target Calculator</router-link></li>
            <li><router-link to="/tt2/upload">Upload Raid Reports</router-link></li>
            <li><router-link to="/tt2/attendance">Raid Attendance</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #2c3e50;
}

.sidebar {
  width: 200px;
  background-color: #34495e;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: #ecf0f1;
  position: fixed;
  height: 100%;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.sidebar nav a {
  color: #ecf0f1;
  text-decoration: none;
}

.sidebar nav a:hover {
  color: #3498db;
}

.sidebar nav div {
  margin-top: 1rem;
  color: #bdc3c7;
}

.sidebar nav ul {
  list-style-type: none;
  padding-left: 1rem;
}

.sidebar nav ul li {
  margin-top: 0.5rem;
}

.content {
  margin-left: 200px;
  padding: 1rem;
  color: #ecf0f1;
  overflow-y: auto;
  width: calc(100% - 200px);
  box-sizing: border-box;
}
</style>
