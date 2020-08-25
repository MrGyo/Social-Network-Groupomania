<template>
  <div class="vue-template">
    <!-- Navigation -->
    <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container my-2">
        <a class="navbar-brand float-left text-dark font-weight-bold">
           <img src="../src/assets/groupomania_4.png" alt="" class="groupomania"/>
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3 text-dark font-weight-bold" to="/login">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-dark font-weight-bold" to="/">Créer votre compte</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
