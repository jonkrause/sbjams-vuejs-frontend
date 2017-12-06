<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-flex xs12 sm8 offset-sm2 class="test">
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
        </v-flex>
        <template>
          <v-card>
            <v-card-title v-if="!loading"> 
            <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
          </v-card>

        <v-data-table
              :headers="headers"
              :items="countArray"
              :search="search"
              class="elevation-2" 
              item-key="name"
            >
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <!-- <td class="text-xs-right">{{ props.item.month_count }}</td> -->
              <td class="text-xs-right">{{ props.item.date | moment('MM/DD/YYYY') }}</td>
            </tr>
            </template>
            
           <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-flex xs8 sm8 offset-sm1 offset-xs1 class="infoList">
                <v-card-text><strong>Previous Call:</strong> {{props.item.lastCalled | moment('calendar')}}</v-card-text>
                <v-card-text><strong>Times called this month: </strong>{{props.item.monthCount}}</v-card-text>
                <v-card-text><strong>Times called this year: </strong>{{props.item.yearCount}}</v-card-text>
              </v-flex>
            </v-card>
          </template>

          </v-data-table>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
export default {
  data() {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
      headers: [
          { text: 'Colors', align: 'left', sortable: true, value: 'name' },
          { text: 'Date', value: 'iso' }
          ],
        items: this.$store.getters.countArray,
        thisUser: this.$store.getters.thisUser,
        today: moment().format()
    }
  },
  methods: {
    loadColors() {
      this.$store.dispatch('getDailyColors')
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  },

  computed: {
    users() {
      return this.$store.getters.thisUser
    },
    dailyColors() {
      return this.$store.getters.dailyColors
    },
    dailyArray() {
      return this.$store.getters.dailyArray
    },
    lastDate() {
      return this.$store.getters.lastDate
    },
    homeObj() {
      return this.$store.getters.homeObj
    },
    countObj() {
      return this.$store.getters.countObj
    },
    countArray() {
      return this.$store.getters.countArray
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
.infoList
  line-height: 2px;

.test
  text-align: center

.dropdown
  text-align: left

.progress-circular 
  margin: 1rem

.table
  text-align: left

  
</style>