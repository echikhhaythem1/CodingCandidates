<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar
                     color="primary"
                     dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                                  name="userName"
                                  label="Nom d'utilisateur"
                                  id="userName"
                                  v-model="userName"
                                  type="text"
                                  required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                                  name="password"
                                  label="Mot de passe"
                                  id="password"
                                  v-model="password"
                                  type="password"
                                  required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" round color="primary">se connecter </v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-alert :value="displayAlert" color="error" icon="warning" transition="scale-transition" outline>
                This is a error alert.
              </v-alert>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      userName: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['authenticationFaildMessage', 'isAuthenticated']),
    displayAlert () {
      return !this.isAuthenticated && this.authenticationFaildMessage;
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signin', { userName: this.userName, password: this.password })
    }
  }
};
</script>
<style lang="scss" scoped>
.v-alert {
  padding: 8px 16px !important;
  border: none !important;
}
</style>
