<template>
<v-container>
<v-layout row>

<v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="http://cdn.history.com/sites/2/2017/03/GettyImages-157278376.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{users.email}}</h3>
            <div>{{users.color}}</div>
          </div>
        </v-card-title>
        <v-card-actions>


  <v-layout row justify>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn flat color="blue" slot="activator">Edit Info</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{users.email}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex> -->
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>






</v-layout>
</v-container>











</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      msg: 'Profile',
      dialog: false,
      
    }
  },
  computed: {
    users() {
      return this.$store.getters.thisUser
    }
  }
}
</script>