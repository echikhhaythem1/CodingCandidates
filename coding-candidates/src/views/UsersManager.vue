<template>
  <div>
    <v-toolbar color="blue lighten-4">
      <v-toolbar-title>Liste des candidats</v-toolbar-title>
      <v-divider
                 class="mx-2"
                 inset
                 vertical></v-divider>
      <v-spacer></v-spacer>
      <CandidatForm></CandidatForm>
    </v-toolbar>
    <v-layout>
      <v-flex xs2 sm10 offset-sm1>
        <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details></v-text-field>
        <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :search="search"
                      :items="users"
                      hide-actions
                      item-key="Name"
                      :loading="false"
                      class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.fullName }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.typeOfUser}}</td>
            <td>
              <v-icon
                      color="teal darken-2" class="mx-2"
                      @click="editItem(props.item)">
                edit
              </v-icon>
              <v-icon
                      class="mx-2"
                      @click="deleteItem(props.item)">
                delete
              </v-icon>
              <router-link to="/details">
                <v-icon
                        color="teal darken-2" class="mx-2"
                        @click="detailsItem()">
                  list
                </v-icon>
              </router-link>
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" circle @input="browsePage"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import CandidatForm from '../components/User/CandidatForm.vue'
//import Details from '../views/Details.vue'
export default {
  components: {
    CandidatForm: CandidatForm,
    //Details: Details
  },
  data: () => ({
    selected: [],
    search: '',
    headers: [
      { text: 'Full name', value: 'fullName' },
      { text: 'Email', value: 'email' },
      { text: 'Type', value: 'typeOfUser' },
      { text: 'Actions', sortable: false }
    ],
  }),
  computed: {
    pages () {
      return this.$store.state.totalPages
    },
    users () {
      return this.$store.getters.users || []
    },
    pagination: {
      get: function () {
        return this.$store.getters.pagination
      },
      set: function (value) {
        this.$store.commit('setPagination', value)
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    browsePage (page) {
      this.$store.dispatch('browsePage', page - 1)
    },
    initialize () {
      this.$store.dispatch('getUsers')
    },
    deleteItem (item) {
      const index = this.users.indexOf(item)
      if (confirm('Êtes-vous sûr de bien vouloir supprimer cet élément?')) {
        const user = this.users[index]
        if (user) {
          this.$store.dispatch('deleteUser', user.id)
        }
      }
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
    editItem (item) {
      this.$root.$emit('haythem', item);
    },
    detailsItem () {

      this.items.push({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        birthdate: this.birthdate
      });
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.birthdate = "";

    }
  }
}
</script>
