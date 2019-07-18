<template>
 <div class="container-fluid">
   <div class="row mt-3">
      <div class="col-md-2">
          <label class="typo__label">Class Type</label>
          <multiselect v-model="classTypeSelected" :options="classTypes" placeholder="Select one" label="name" track-by="name" :multiple="true" @input="filterEvents(1)"></multiselect>
      </div>
      <div class="col-md-2">
        <label class="typo__label">Dance Room</label>
        <multiselect v-model="danceRoomSelected" :options="danceRoom" placeholder="Select one" label="name" track-by="name" :multiple="true" @input="filterEvents(2)"></multiselect>
      </div>
      <div class="col-md-3">
        <label class="typo__label">Instructor</label>
        <multiselect v-model="instructorSelected" :options="instructors" placeholder="Select one" label="name" track-by="name" :multiple="true" @input="filterEvents(3)"></multiselect>
      </div>
      <div class="col-md-3">
        <label class="typo__label">Day of the Week</label>
        <multiselect v-model="daySelected" :options="dayOfTheWeek" placeholder="Select one" label="name" track-by="name" :multiple="true" @input="filterEvents(4)"></multiselect>
      </div>
      <div class="col-md-2">
        <label class="typo__label">Time of the Week</label>
        <multiselect v-model="timeSelected" :options="timeOfDay" placeholder="Select one" label="name" track-by="name" :multiple="true" @input="filterEvents(5)"></multiselect>
      </div>
   </div>
   <div class="row mt-5">
     <div class="wcs-timetable wcs-timetable--week">
      <div class="wcs-timetable__week wcs-timetable__parent">
        <div class="wcs-day wcs-day--1" v-for="day in (orderedDaySelected.length <= 0) ? dayOfTheWeek : orderedDaySelected" :key="day.code">
          <h3 class="wcs-day__title">{{day.name}}</h3>
          <div class="wcs-timetable__classes" v-for="d in filteredData" :key="d.name">
            <div v-if="d.day === day.code">
              <div class="box" @click="showModalForms(d)">
                <div class="name">
                  {{d.name}}
                </div>
                <hr />
                <div class="time">
                  {{d.time | time()}}
                </div>
                <div class="room">
                  {{d.room | toUpperCase()}}
                </div>
                <div class="classType">
                  {{d.classType | toUpperCase()}}
                </div>
                <div class="instructor">
                  {{d.instructor | toUpperCase()}}
                </div>
              </div>
            </div>
              </div>
              <div class="wcs-timetable__spacer"></div>
            </div>
          </div>
      </div>
      <div v-if="filteredData.length <= 0">No Results Found.</div>
   </div>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-head">
              <h3>{{selectedModal.name}}</h3>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p><strong>Instructor: </strong>{{selectedModal.instructor | toUpperCase()}}</p>
              <p><strong>Dance Room: </strong>{{selectedModal.room | toUpperCase()}}</p>
              <p><strong>Class Type: </strong>{{selectedModal.classType | toUpperCase()}}</p>
              <p><strong>Time of the Week: </strong>{{selectedModal.time | time()}}</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <v-btn class="btn btn-primary" @click="showModal = false">
                OK
              </v-btn>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
 </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import _ from 'lodash'
export default {
  name: 'home',
  components: {
    Multiselect
  },
  data () {
    return {
      filteredData: [],
      showModal: false,
      selectedModal: {},
      data: [
        {
          name: 'Intermediate Mordern Tap',
          classType: 'ballet',
          room: 'alegrias',
          instructor: 'alex',
          day: 1,
          time: 1
        },
        {
          name: 'Advance Ballet',
          classType: 'latino',
          room: 'alegrias',
          instructor: 'diana',
          day: 1,
          time: 2
        },
        {
          name: 'Advance Ballet1',
          classType: 'ballet',
          room: 'alegrias',
          instructor: 'diana',
          day: 4,
          time: 2
        },
        {
          name: 'Advance Ballet2',
          classType: 'ballet',
          room: 'aurora',
          instructor: 'jose',
          day: 5,
          time: 3
        },
        {
          name: 'Advance Latino',
          classType: 'latino',
          room: 'carioca',
          instructor: 'maria',
          day: 5,
          time: 1
        },
        {
          name: 'Ballet',
          classType: 'latino',
          room: 'alegrias',
          instructor: 'jose',
          day: 2,
          time: 2
        },
        {
          name: 'Beginner Hip Hop',
          classType: 'latino',
          room: 'aurora',
          instructor: 'jose',
          day: 3,
          time: 3
        }
      ],
      classTypes: [
        {
          name: 'Ballet',
          code: 'ballet'
        },
        {
          name: 'Latino',
          code: 'latino'
        },
        {
          name: 'Modern',
          code: 'modern'
        },
        {
          name: 'Salsa',
          code: 'Salsa'
        },
        {
          name: 'Street',
          code: 'street'
        },
        {
          name: 'Tango',
          code: 'tango'
        },
        {
          name: 'Tap',
          code: 'tap'
        }
      ],
      danceRoom: [
        {
          name: 'ALEGRIAS',
          code: 'alegrias'
        },
        {
          name: 'Aurora',
          code: 'aurora'
        },
        {
          name: 'CARIOCA',
          code: 'carioca'
        },
        {
          name: 'CORRIDO',
          code: 'corrido'
        },
        {
          name: 'PIROUETTE',
          code: 'pirouette'
        }
      ],
      instructors: [
        {
          name: 'ALEX KING',
          code: 'alex'
        },
        {
          name: 'DIANA EVANS',
          code: 'diana'
        },
        {
          name: 'IRINA PAVLOVA',
          code: 'irina'
        },
        {
          name: 'JOSE OVIEDO',
          code: 'jose'
        },
        {
          name: 'Maria Garcia',
          code: 'maria'
        },
        {
          name: 'Sean Field',
          code: 'sean'
        },
        {
          name: 'Viviana Lopez',
          code: 'viviana'
        }
      ],
      dayOfTheWeek: [
        {
          name: 'Monday',
          code: 1
        },
        {
          name: 'Tuesday',
          code: 2
        },
        {
          name: 'Wednesday',
          code: 3
        },
        {
          name: 'Thursday',
          code: 4
        },
        {
          name: 'Friday',
          code: 5
        },
        {
          name: 'Saturday',
          code: 6
        },
        {
          name: 'Sunday',
          code: 7
        }
      ],
      timeOfDay: [
        {
          name: 'Morning',
          code: 1
        },
        {
          name: 'Afternoon',
          code: 2
        },
        {
          name: 'Evening',
          code: 3
        }
      ],
      daySelected: [],
      classTypeSelected: [],
      danceRoomSelected: [],
      instructorSelected: [],
      timeSelected: [],
      filterCounts: []
    }
  },
  mounted () {
    // this.daySelected = this.dayOfTheWeek
    this.filteredData = this.data
  },
  methods: {
    showModalForms (d) {
      this.selectedModal = d
      this.showModal = true
    },
    filterEvents (filterType) {
      // const data = _.filter(this.data, { 'classType': 'ballet' })
      switch (filterType) {
        case 1:
          if (!this.filterCounts.includes(1)) {
            this.filterCounts.push(1)
          }
          if (this.classTypeSelected.length <= 0) {
            _.remove(this.filterCounts, (n) => n === 1)
          }
          break
        case 2:
          if (!this.filterCounts.includes(2)) {
            this.filterCounts.push(2)
          }
          if (this.danceRoomSelected.length <= 0) {
            _.remove(this.filterCounts, (n) => n === 2)
          }
          break
        case 3:
          if (!this.filterCounts.includes(3)) {
            this.filterCounts.push(3)
          }
          if (this.instructorSelected.length <= 0) {
            _.remove(this.filterCounts, (n) => n === 3)
          }
          break
        case 5:
          if (!this.filterCounts.includes(5)) {
            this.filterCounts.push(5)
          }
          if (this.timeSelected.length <= 0) {
            _.remove(this.filterCounts, (n) => n === 5)
          }
          break
        default:
          // code block
      }

      // build object for filter
      var finalObect = {}
      var newArr = []
      _.forEach(this.filterCounts, (el) => {
        let classType = (this.classTypeSelected.length > 0) ? { 'classType': '' } : ''
        let insType = (this.instructorSelected.length > 0) ? { 'instructor': '' } : ''
        let danceType = (this.danceRoomSelected.length > 0) ? { 'room': '' } : ''
        let timeType = (this.timeSelected.length > 0) ? { 'time': '' } : ''
        finalObect = { ...classType, ...insType, ...danceType, ...timeType }
      })
      var clonedData = this.data
      if (finalObect.hasOwnProperty('classType')) {
        console.log('we have class filter activated')
        _.forEach(this.classTypeSelected, (el) => {
          const data = _.filter(clonedData, { 'classType': el.code })
          _.forEach(data, (e) => newArr.push(e))
        })
        clonedData = newArr
      }
      if (finalObect.hasOwnProperty('instructor')) {
        newArr = []
        _.forEach(this.instructorSelected, (el) => {
          const data = _.filter(clonedData, { 'instructor': el.code })
          _.forEach(data, (e) => newArr.push(e))
        })
        clonedData = newArr
      }
      if (finalObect.hasOwnProperty('room')) {
        newArr = []
        _.forEach(this.danceRoomSelected, (el) => {
          const data = _.filter(clonedData, { 'room': el.code })
          _.forEach(data, (e) => newArr.push(e))
        })
        clonedData = newArr
      }

      if (finalObect.hasOwnProperty('time')) {
        newArr = []
        _.forEach(this.timeSelected, (el) => {
          const data = _.filter(clonedData, { 'time': el.code })
          _.forEach(data, (e) => newArr.push(e))
        })
        clonedData = newArr
      }
      this.filteredData = newArr
      if (this.filterCounts.length <= 0) {
        this.filteredData = this.data
      }
    }
  },
  computed: {
    orderedDaySelected () {
      return _.orderBy(this.daySelected, ['code'], ['asc'])
    }
  },
  filters: {
    time (time) {
      var res
      if (time === 1) {
        res = 'Morning'
      } else if (time === 2) {
        res = 'Afternoon'
      } else {
        res = 'Evening'
      }
      return res
    },
    toUpperCase (data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    }
  }
}
</script>

<style>
  .box .name {
    font-weight: bold;
    display: block;
    position: relative;
    padding-right: 20px;
  }
  .box {
    border: 1px solid #eee;
    padding: 10px;
    margin: 2px;
    cursor: pointer;
  }
  .box:hover {
    background: #c8ad8c;
    color: #fff;
    transition: 0.5s;
  }
  .multiselect__option--highlight {
      background: #c8ad8c !important;
      outline: none;
      color: #fff;
  }
  .multiselect__option--highlight:after {
    content: attr(data-select);
    background: #c8ad8c !important;
}
  .multiselect__tag {
    background: #c8ad8c !important;
  }
  .typo__label {
    text-align: left;
    display: block;
    color: #c8ad8c;
    font-weight: bold;
    font-size: 20px;
  }
  .btn-primary {
    background: #c8ad8c !important;
    border-color: #42b983 !important;
  }
  .wcs-day__title {
    background: #eee;
    color: #c8ad8c;
    padding: 8px;
    text-align: center;
  }
  .filter {
    width: 19.7%;
    margin: 5px 2px;
  }
  .wcs-timetable--3 .wcs-timetable {
    border-color: inherit;
  }
  .wcs-timetable.wcs-timetable--week {
    margin-top: 0 !important;
    text-align: left;
}
.wcs-timetable {
    text-align: center;
    position: relative;
    width: 100%;
}
.wcs-timetable__container * {
    box-sizing: border-box;
}
.wcs-timetable__week {
    border-right: 1px solid;
    margin-top: 2rem;
}
@media (max-width: 768px) {
  .filter {
    width: 100%;
  }
}
@media (min-width: 992px) {
  .wcs-timetable__week {
      margin: 0 -.2vh;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      width: 100%;
      -webkit-align-content: stretch;
      align-content: stretch;
      -webkit-box-align: stretch;
      -webkit-align-items: stretch;
      align-items: stretch;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      justify-content: space-between;
  }
  .wcs-timetable__week .wcs-day {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-align-content: stretch;
    align-content: stretch;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 100%;
    margin: 0 .2vh;
}
}
.modal-mask {
  position: fixed;
  /* z-index: 9998; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-body {
  text-align: left;
  font-size: 20px;
}
.name:after {
    content: '\25B8';
    font-size: 0.65em;
    display: inline-block;
    border-radius: 100rem;
    width: 1.4em;
    height: 1.4em;
    background: #c8ad8c;
    line-height: 1.4;
    text-align: center;
    margin-left: .85em;
    position: relative;
    -webkit-transition: all 200ms ease;
    transition: all 200ms ease;
    right: 0;
    top: .25rem;
    position: absolute;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-head {
  background: #c8ad8c;
  color: #fff;
  font-weight: bolder;
  padding: 10px;
  text-align: left;
}
.modal-container {
  width: 600px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
