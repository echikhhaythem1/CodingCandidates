<template>
  <v-card>
    <v-list three-line subheader>
      <v-subheader>User Controls</v-subheader>
      <v-flex xs12 md4>
        <v-text-field
                      v-model="firstName"
                      label="Nom"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field
                      v-model="lastName"
                      label="Prénom"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field
                      v-model="email"
                      label="E-mail"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field
                      v-model="birthdate"
                      label="Date de naissance"></v-text-field>
      </v-flex>
    </v-list>
    <v-divider></v-divider>

    <template>
      <div class="text-xs-center">
        <v-dialog
                  v-model="dialog"
                  width="500">
          <template v-slot:activator="{ on }">
            <v-btn
                   color="primary" round
                   dark
                   v-on="on">
              Ajouter Test
            </v-btn>
          </template>

          <v-card>
            <v-card-title
                          class="headline grey lighten-2"
                          primary-title>
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                     color="primary"
                     flat
                     @click="dialog = false">
                Confirmer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

  </v-card>
</template>
<script>
export default {
  data () {
    return {
      users: '',
      dialog: false
    }
  }
}
</script>
