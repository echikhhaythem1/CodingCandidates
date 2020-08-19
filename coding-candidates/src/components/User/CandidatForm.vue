<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-flex sm1 offset-sm6>
          <v-btn round color="primary" dark class="mb-1" v-on="on">Ajouter un candidat</v-btn>
        </v-flex>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Ajouter un candidat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="register">Enregistrer</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-flex xs12 sm12 offset-sm0>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-form lazy-validation>
                    <v-text-field
                                  v-model="editedItem.firstName"
                                  v-validate="'required|max:15'"
                                  :counter="15"
                                  :error-messages="errors.collect('FirstName')"
                                  label="Nom"
                                  data-vv-name="FirstName"
                                  required></v-text-field>
                    <v-text-field
                                  v-model="editedItem.lastName"
                                  v-validate="'required|max:15'"
                                  :counter="15"
                                  :error-messages="errors.collect('LastName')"
                                  label="Prénom"
                                  data-vv-name="LastName"
                                  required></v-text-field>
                    <v-text-field
                                  v-model="editedItem.userName"
                                  v-validate="'required|max:30'"
                                  :counter="30"
                                  :error-messages="errors.collect('UserName')"
                                  label="Login"
                                  data-vv-name="UserName"
                                  :disabled="registerAction=== 'update'"
                                  required></v-text-field>
                    <v-text-field
                                  v-model="editedItem.email"
                                  v-validate="'required|email'"
                                  :error-messages="errors.collect('Email')"
                                  label="E-mail"
                                  data-vv-name="Email"
                                  required></v-text-field>
                    <v-layout v-if="registerAction=== 'create'" row>
                      <v-flex xs12>
                        <v-text-field
                                      name="password"
                                      label="Mot de passe"
                                      id="password"
                                      v-model="editedItem.password"
                                      type="password"
                                      required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout v-if="registerAction=== 'create'" row>
                      <v-flex xs12>
                        <v-text-field
                                      name="confirmPassword"
                                      label="Confirme Mot de passe"
                                      id="confirmPassword"
                                      v-model="editedItem.confirmPassword"
                                      type="password"
                                      :rules="[comparePasswords]"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md4>
                        <v-dialog
                                  ref="dialog"
                                  v-model="modal"
                                  :return-value.sync="date"
                                  persistent
                                  lazy
                                  full-width
                                  width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                                          v-model="editedItem.birthdate"
                                          label="Date de naissance"
                                          prepend-icon="event"
                                          readonly
                                          v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                    <v-checkbox
                                v-model="editedItem.isAdministrator"
                                label="Administrateur ?"
                                type="checkbox"></v-checkbox>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import moment from 'moment'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    checkbox: null,
    dictionary: {
      attributes: {
        Email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        FirstName: {
          required: () => 'Le nom ne peut pas être vide',
          max: 'Le champ du nom ne peut pas dépasser 10 caractères'
          // custom messages
        },
      }
    },
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: null,
      confirmPassword: null,
      birthdate: '',
      isAdministrator: false
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: null,
      confirmPassword: null,
      birthdate: '',
      isAdministrator: false
    },
    registerAction: 'create'
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    date (value) {
      this.editedItem.birthdate = this.formateDate(value)
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Les mots de passe ne correspondent pas' : ' '
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter' : 'Modifier'
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  created () {
    this.$root.$on('haythem', (item) => {
      console.log("editer user:", item)
      if (item && item.birthdate) {
        item.birthdate = this.formateDate(item.birthdate)
      }
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.registerAction = 'update'
    })
  },
  methods: {
    formateDate (value) {
      return value ? moment(value, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD') : ''
    },
    closeDialog () {
      this.dialog = false
      this.registerAction = 'create'
    },
    close () {
      this.registerAction = 'create'
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.editedItem = this.defaultItem
      this.checkbox = null
      this.$validator.reset()
    },
    register () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('register', { Email: this.editedItem.email, UserName: this.editedItem.userName, FirstName: this.editedItem.firstName, LastName: this.editedItem.lastName, Birthdate: this.editedItem.birthdate, Password: this.editedItem.password, ConfirmPassword: this.editedItem.confirmPassword, IsAdministrator: this.editedItem.isAdministrator, action: this.registerAction })
          this.registerAction = 'create'
        }
      })
    },
  }
}
</script>
