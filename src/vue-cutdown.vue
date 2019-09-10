<template>
  <p class="vue-cutdown">
    <!-- Tip Text -->
    <span v-if="showTip">
      <span>{{ tipText }}{{ tipSepartor }}</span>
    </span>
    <!-- Time -->
    <span :hidden="hiddenTime">
      <span v-if="cutdown.day > 0">
        <span>{{ cutdown.day }}</span>
        <i>{{ dayTxt }}</i>
      </span>
      <span>{{ cutdown.hour }}</span>
      <i>{{ hourTxt }}</i>
      <span>{{ cutdown.minutes }}</span>
      <i>{{ minutesTxt }}</i>
      <span>{{ cutdown.seconds }}</span>
    </span>
  </p>
</template>

<script>
const now = new Date().getTime()

export default {
  name: 'VueCutdown',
  props: {
    /**
     * before cutdown show time
     */
    showTimeBefore: {
      type: Boolean,
      default: true
    },
    /**
     * after cutdown show time
     */
    showTimeAfter: {
      type: Boolean,
      default: true
    },
    /**
     * Current time
     */
    currentTime: {
      type: Number,
      default: now
    },
    /**
     * Start time
     */
    startTime: {
      type: Number,
      default: now
    },
    /**
     * End time
     */
    endTime: {
      type: Number,
      default: now
    },
    /**
     * tip message display
     */
    showTip: {
      type: Boolean,
      default: true
    },
    /**
     * Distance Start Text
     */
    startText: {
      type: String,
      default: 'Distance Start'
    },
    /**
     * Distance End Text
     */
    runningText: {
      type: String,
      default: 'Distance End'
    },
    /**
     * Over Text
     */
    endText: {
      type: String,
      default: "It's over"
    },
    /**
     * Distance Start Text
     */
    tipSepartor: {
      type: String,
      default: ':'
    },
    /**
     * day_text
     */
    dayTxt: {
      type: String,
      default: 'day(s)'
    },
    /**
     * hour_text
     */
    hourTxt: {
      type: String,
      default: ':'
    },
    /**
     * minutes_text
     */
    minutesTxt: {
      type: String,
      default: ':'
    },
    /**
     * seconds_text
     */
    secondsTxt: {
      type: String,
      default: ':'
    }
  },
  data() {
    return {
      cutdown: {
        day: 0,
        hour: '00',
        minutes: '00',
        seconds: '00'
      },
      cutdown_type: 'start',
      timer: null,
      current: null
    }
  },
  computed: {
    tipText() {
      return this.cutdown_type === 'start'
        ? this.startText
        : this.cutdown_type === 'run'
        ? this.runningText
        : this.endText
    },
    hiddenTime() {
      console.log(this.cutdown_type)
      const {cutdown_type} = this
      return (
        (!this.showTimeBefore && cutdown_type === 'start') ||
        (!this.showTimeAfter && cutdown_type === 'end')
      )
    },
    current_time() {
      return this.current || this.calcTimestamp(this.currentTime)
    },
    start_time() {
      return this.calcTimestamp(this.startTime)
    },
    end_time() {
      return this.calcTimestamp(this.endTime)
    }
  },
  mounted() {
    this.startCutdown()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    /**
     * calc timestamp
     * @public
     */
    calcTimestamp(stamp) {
      const _stamp = stamp.toString().length === 10 ? stamp * 1000 : stamp
      return _stamp
    },
    /**
     * start cutdown event
     * @public
     */
    startCutdown() {
      if (this.end_time <= this.current_time) {
        // It's over
        // When end_time < current_time
        this.onEnd()
      } else if (this.current_time < this.start_time) {
        // It's not started
        // When end_time < current_time
        this.runCutdown(this.start_time, this.current_time, false)
      } else if (
        this.end_time > this.current_time &&
        this.start_time <= this.current_time
      ) {
        // It's started
        // When end_time > current_time && start_time <= current_time
        this.onStart()
        this.runCutdown(this.end_time, this.start_time, true)
      }
    },
    /**
     * run cutdown event
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    runCutdown(end_point, start_point, flg) {
      clearInterval(this.timer)
      this.cutdown_type = flg ? 'run' : 'start'
      this.calcCutdown(end_point, start_point)
      this.timer = setInterval(() => {
        this.calcCutdown(end_point, (start_point += 1000), flg)
      }, 1000)
    },
    /**
     * calc day,hour,minutes,seconds
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    calcCutdown(end_point, start_point, flg) {
      const {cutdown} = this
      let time_distance = end_point - start_point

      // get day,hour,minutes,seconds
      if (time_distance >= 0) {
        // this.cutdown.show = true;
        cutdown.day = Math.floor(time_distance / 86400000)
        time_distance -= cutdown.day * 86400000
        cutdown.hour = Math.floor(time_distance / 3600000)
        time_distance -= cutdown.hour * 3600000
        cutdown.minutes = Math.floor(time_distance / 60000)
        time_distance -= cutdown.minutes * 60000
        cutdown.seconds = Math.floor(time_distance / 1000).toFixed(0)
        time_distance -= cutdown.seconds * 1000
        //
        if (cutdown.hour < 10) {
          cutdown.hour = '0' + cutdown.hour
        }
        if (cutdown.minutes < 10) {
          cutdown.minutes = '0' + cutdown.minutes
        }
        if (cutdown.seconds < 10) {
          cutdown.seconds = '0' + cutdown.seconds
        }
      } else if (flg) {
        clearInterval(this.timer)
        this.onEnd()
      } else {
        this.current = this.start_time
        this.startCutdown()
      }
    },
    /**
     * start callback
     * @public
     */
    onStart() {
      console.log('start...')
      this.cutdown_type = 'run'
      this.$emit('onStart')
    },
    /**
     * stop callback
     * @public
     */
    onEnd() {
      console.log('end...')
      this.cutdown_type = 'end'
      this.$emit('onEnd')
    }
  }
}
</script>

<style lang="less">
.cutdown {
  i {
    font-style: normal;
  }
}
</style>
