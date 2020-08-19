<template>
  <v-app>

    <v-toolbar app dark class="indigo darken-3">
      <!-- <v-icon>home</v-icon>
    <v-toolbar-title>Candidates Coding</v-toolbar-title> -->
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor: pointer">
          <v-icon>home</v-icon> Archimed Sud
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
               flat
               v-for="item in menuItems"
               :key="item.title"
               router
               :to="{name:item.link}">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
               flat
               v-if="isAuthenticated"
               @click="signout">
          <v-icon left dark>account_circle</v-icon>
          Déconnexion
        </v-btn>
        <!-- <v-btn flat>Home</v-btn>
      <v-btn flat>sign up</v-btn>
      <v-btn flat>sign in</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer class="indigo lighten-5">
      <v-spacer></v-spacer>
      <div>Copyright Archimed Sud 2019</div>
    </v-footer>

  </v-app>
</template>


<script>

import { mapGetters } from "vuex"
export default {
  name: 'App',
  computed: {
    ...mapGetters(["isAuthenticated"]),
    menuItems () {
      let menuItems = [
        { icon: 'lock_open', title: 'se connecter', link: 'signin' }
      ]
      if (this.isAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'liste des candidats', link: 'UsersManager' }
        ]
      }
      return menuItems
    }
  },
  methods: {
    signout () {
      this.$store.dispatch("signout")
    }
  },
  created () {
    this.$store.dispatch('initState')

  }
}
</script>
