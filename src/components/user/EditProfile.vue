<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <p class="primary--text">Edit Profile</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title">
              </v-text-field>
                
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        loadUser: this.$store.loadUser
      }
    }
  }
</script>