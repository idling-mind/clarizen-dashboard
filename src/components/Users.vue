<template>
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <page-header title='Clarizen Users at GAI'></page-header>
          <div class="row row-cards">
            <card-small-progress title="Number of Users" :hilight="noOfUsers" :progress=100 color="bg-blue"></card-small-progress>
            <card-small-progress title="Never logged in" :hilight="noOfNonLoggers.count" :progress="noOfNonLoggers.percent" color="bg-red"></card-small-progress>
            <card-small-progress title="Not Logged in a Month" :hilight="noOfMonthLoggers.count" :progress="noOfMonthLoggers.percent" color="bg-orange"></card-small-progress>
            <card-small-progress title="Logged in Today" :hilight="noOfTodayLoggers.count" :progress="noOfTodayLoggers.percent" color="bg-green"></card-small-progress>
            <single-h-bar title="License Type" :datajson="groupLicenseType"></single-h-bar>
          </div>
          <div v-if="dataloaded" class="row row-cards">
            <line-chart-card :datajson="groupLastLogin" title="Users logged in today" smallnumber="User Login Time" :bignumber="Math.round(noOfTodayLoggers.percent) + '%'"></line-chart-card>
          </div>
          <div v-if="workitemsloaded" class="row row-cards">
            <user-projects :datajson="userwork" title="User Tasks count" smallnumber="Active Work Items Per User" :bignumber="totalActiveTasks + ' Active Tasks'"></user-projects>
          </div>
          <div v-if="workitemsloaded" class="row row-cards">
            <due-dates :datajson="usertasks" title="Tasks past due date"></due-dates>
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
import LineChartCard from './charts/LineChartCard.vue'
import DueDates from './charts/DueDates.vue'
import UserProjects from './charts/UserProjects.vue'

export default {
  name: 'Users',
  data () {
    return {
      users: [],
      userwork: [],
      usertasks: {},
      dataloaded: false,
      workitemsloaded: false
    }
  },
  components: {
    PageHeader,
    CardBigProgress,
    CardSmallProgress,
    SingleHBar,
    LineChartCard,
    DueDates,
    UserProjects
  },
  methods: {
    getUsers () {
      console.log('Data going to get loaded')
      clapi.post('data/relationQuery', '{"entityId":"/DiscussionGroup/1jipe5uebj67scpwpqnk7vgn5502","relationName":"GroupMembers","fields":["FirstName", "Lastname", "Username", "Lastlogin", "LicenseType.Name", "State.Name"],"where":"State IN (\'Active\',\'Draft\')","relations":[{"name":"AssignedWorkItems","fields":["Name","EntityType","State.Name","DueDate"],"where":{"leftExpression": {"fieldName": "State"},"operator": "Equal","rightExpression": {"value": "Active"}}}],"paging":{"from":0,"limit": 500}}'
      ).then(response => {
        this.users = response.data.entities
        this.dataloaded = true
        this.getUserWork()
        this.getUserTasks()
      }).catch(error => {
        console.log(error)
      })
    },
    getUserWork () {
      var vm = this
      vm.userwork = []
      vm.users.forEach(function (user) {
        var workitem = {}
        workitem['Name'] = user.FirstName + ' ' + user.Lastname
        if (user.AssignedWorkItems) {
          workitem['WorkItemCount'] = _.countBy(user.AssignedWorkItems.entities, function (item) {
            return item.EntityType
          })
        }
        vm.userwork.push(workitem)
      })
      vm.workitemsloaded = true
    },
    getUserTasks () {
      var vm = this
      var tasks = []
      vm.users.forEach(function (user) {
        if (user.AssignedWorkItems) {
          user.AssignedWorkItems.entities.forEach(function (item) {
            if (item.EntityType === 'Task') {
              tasks.push(item.DueDate)
            }
          })
        }
      })
      var o = _.countBy(tasks)
      vm.usertasks['pastdates'] = []
      vm.usertasks['pastvalues'] = []
      vm.usertasks['dates'] = []
      vm.usertasks['values'] = []
      _.forOwn(o, function (value, date) {
        var odate = new Date(date)
        var today = new Date()
        if (odate < today) {
          vm.usertasks['pastdates'].push(odate)
          vm.usertasks['pastvalues'].push(value)
        } else {
          vm.usertasks['dates'].push(odate)
          vm.usertasks['values'].push(value)
        }
      })
      console.dir(vm.usertasks)
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
      var now = new Date()
      var x = _.countBy(this.users, function (item) {
        var lastlogin = new Date(item.Lastlogin + 'Z')
        if (now.setHours(0, 0, 0, 0) === lastlogin.setHours(0, 0, 0, 0)) {
          lastlogin = new Date(item.Lastlogin + 'Z')
          return lastlogin.getHours()
        } else {
          return NaN
        }
      })
      delete x.NaN
      return {
        day: _.keys(x),
        count: _.values(x)
      }
    },
    totalActiveTasks: function () {
      var vm = this
      return _.sumBy(vm.userwork, function (item) {
        if (item.WorkItemCount) {
          return item.WorkItemCount.Task
        }
      })
    }
  }
}
</script>
