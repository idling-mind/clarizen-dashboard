<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='Clarizen Users'></page-header>
          <div class="row row-cards">
            <card-small-progress title="Number of Users" :hilight="noOfUsers" :progress=100 color="bg-blue"></card-small-progress>
            <card-small-progress title="Never logged in" :hilight="noOfNonLoggers.count" :progress="noOfNonLoggers.percent" color="bg-red"></card-small-progress>
            <card-small-progress title="Not Logged in a Month" :hilight="noOfMonthLoggers.count" :progress="noOfMonthLoggers.percent" color="bg-orange"></card-small-progress>
            <card-small-progress title="Logged in Today" :hilight="noOfTodayLoggers.count" :progress="noOfTodayLoggers.percent" color="bg-green"></card-small-progress>
            <single-h-bar title="License Type" :datajson="groupLicenseType"></single-h-bar>
          </div>
          <div class="row row-cards">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import clapi from '../clarizen/clapi.js'
import PageHeader from './PageHeader.vue'
import CardBigProgress from './cards/CardBigProgress.vue'
import CardSmallProgress from './cards/CardSmallProgress.vue'
import SingleHBar from './charts/SingleHBar.vue'

export default {
  name: 'Users',
  data () {
    return {
      users: []
    }
  },
  components: {
    PageHeader,
    CardBigProgress,
    CardSmallProgress,
    SingleHBar
  },
  methods: {
    getUsers () {
      clapi.post('data/relationQuery', '{"entityId":"/DiscussionGroup/1jipe5uebj67scpwpqnk7vgn5502","relationName":"GroupMembers","fields":["FirstName", "Lastname", "Username", "Lastlogin", "LicenseType.Name", "State.Name"],"where":"State IN (\'Active\',\'Draft\')","paging":{"from":0, "limit": 500}}'
      ).then(response => {
        this.users = response.data.entities
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    var vm = this
    vm.getUsers()
    setInterval(function () {
      vm.getUsers()
    }, 300000)
  },
  computed: {
    noOfUsers: function () {
      return this.users.length
    },
    noOfNonLoggers: function () {
      var x = _.countBy(this.users, function (item) {
        return item.Lastlogin == null
      })
      return {
        count: x.true,
        percent: x.true / this.noOfUsers * 100
      }
    },
    noOfMonthLoggers: function () {
      var now = Date.now()
      var x = _.countBy(this.users, function (item) {
        var daydiff = (now - Date.parse(item.Lastlogin)) / (1000 * 60 * 60 * 24)
        return daydiff > 30
      })
      return {
        count: x.true,
        percent: x.true / this.noOfUsers * 100
      }
    },
    noOfTodayLoggers: function () {
      var today = new Date()
      var x = _.countBy(this.users, function (item) {
        var logindate = new Date(item.Lastlogin)
        return today.setHours(0, 0, 0, 0) === logindate.setHours(0, 0, 0, 0)
      })
      return {
        count: x.true,
        percent: x.true / this.noOfUsers * 100
      }
    },
    noOfPMs: function () {
      var x = _.countBy(this.users, function (item) {
        return item.LicenseType.Name === 'Full'
      })
      return {
        count: x.true,
        percent: x.true / this.noOfUsers * 100
      }
    },
    noOfTMs: function () {
      var x = _.countBy(this.users, function (item) {
        return item.LicenseType.Name === 'TeamMember'
      })
      return {
        count: x.true,
        percent: x.true / this.noOfUsers * 100
      }
    },
    groupLicenseType: function () {
      var x = _.countBy(this.users, 'LicenseType.Name')
      return x
    },
    groupLastLogin: function () {
      var now = Date.now()
      var x = _.countBy(this.users, function (item) {
        var daydiff = (now - Date.parse(item.Lastlogin)) / (1000 * 60 * 60 * 24)
        return Math.floor(daydiff)
      })
      return x
    }
  }
}
</script>
