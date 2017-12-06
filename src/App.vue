<template>
  <v-app light>
    <v-toolbar dark class="red darken-4">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Strawberry Jam</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems" :key="item.title">
        <v-btn flat :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>{{item.title}}</v-btn>
      </v-toolbar-items>
      <v-btn flat @click="onLogout" v-if="userIsAuthenticated">
      <v-icon left dark>exit_to_app</v-icon>Logout</v-btn>
    </v-toolbar>
    <v-navigation-drawer temporary enable-resize-watcher absolute v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile  @click="onLogout" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems() {
        let menuItems = [{
            icon: 'lock_open',
            title: 'Sign In',
            link: '/signin'
          },
          {
            icon: 'face',
            title: 'Sign Up',
            link: '/signup'
          }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [{
            icon: 'person',
            title: 'Profile',
            link: '/user/profile'
          },
                    {
            icon: 'person',
            title: 'Edit Profile',
            link: '/user/editprofile'
          }]
        }
        return menuItems
      },
      userIsAuthenticated() {
        return (
          this.$store.getters.thisUser !== null &&
          this.$store.getters.thisUser !== undefined
        )
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        }
      }
  }
</script>

<style lang="stylus">
</style>