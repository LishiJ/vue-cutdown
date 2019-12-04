<template>
  <p class="vue-countdown">
    <!-- Tip Text -->
    <span v-if="showTip">
      <span>{{ tipText }}{{ tipSepartor }}</span>
    </span>
    <!-- Time -->
    <span :hidden="hiddenTime">
      <span v-if="countdown.day > 0">
        <span>{{ countdown.day }}</span>
        <i>{{ dayTxt }}</i>
      </span>
      <span>{{ countdown.hour }}</span>
      <i>{{ hourTxt }}</i>
      <span>{{ countdown.minutes }}</span>
      <i>{{ minutesTxt }}</i>
      <span>{{ countdown.seconds }}</span>
    </span>
  </p>
</template>

<script>
export default {
  name: 'VueCountdown',
  props: {
    /**
     * before countdown show time
     */
    showTimeBefore: {
      type: Boolean,
      default: true
    },
    /**
     * after countdown show time
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
      default: new Date().getTime()
    },
    /**
     * Start time
     */
    startTime: {
      type: Number,
      default: new Date().getTime()
    },
    /**
     * End time
     */
    endTime: {
      type: Number,
      default: new Date().getTime()
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
      countdown: {
        day: 0,
        hour: '00',
        minutes: '00',
        seconds: '00'
      },
      countdown_type: 'start',
      timer: null,
      current: null
    }
  },
  computed: {
    tipText() {
      return this.countdown_type === 'start'
        ? this.startText
        : this.countdown_type === 'run'
        ? this.runningText
        : this.endText
    },
    hiddenTime() {
      const {countdown_type} = this
      return (
        (!this.showTimeBefore && countdown_type === 'start') ||
        (!this.showTimeAfter && countdown_type === 'end')
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
    this.startcountdown()
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
     * start countdown event
     * @public
     */
    startcountdown() {
      if (this.end_time <= this.current_time) {
        // It's over
        // When end_time < current_time
        this.onEnd()
      } else if (this.current_time < this.start_time) {
        // It's not started
        // When end_time < current_time
        this.runcountdown(this.start_time, this.current_time, false)
      } else if (
        this.end_time > this.current_time &&
        this.start_time <= this.current_time
      ) {
        // It's started
        // When end_time > current_time && start_time <= current_time
        this.onStart()
        this.runcountdown(this.end_time, this.start_time, true)
      }
    },
    /**
     * run countdown event
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    runcountdown(end_point, start_point, flg) {
      clearInterval(this.timer)
      this.countdown_type = flg ? 'run' : 'start'
      this.calccountdown(end_point, start_point)
      this.timer = setInterval(() => {
        this.calccountdown(end_point, (start_point += 1000), flg)
      }, 1000)
    },
    /**
     * calc day,hour,minutes,seconds
     * @params end_point {Number}  time end point
     * @params start_point {Number} time start point
     * @params flg {Boolean}
     */
    calccountdown(end_point, start_point, flg) {
      const {countdown} = this
      let time_distance = end_point - start_point

      // get day,hour,minutes,seconds
      if (time_distance > 0) {
        // this.countdown.show = true;
        countdown.day = Math.floor(time_distance / 86400000)
        time_distance -= countdown.day * 86400000
        countdown.hour = Math.floor(time_distance / 3600000)
        time_distance -= countdown.hour * 3600000
        countdown.minutes = Math.floor(time_distance / 60000)
        time_distance -= countdown.minutes * 60000
        countdown.seconds = Math.floor(time_distance / 1000).toFixed(0)
        time_distance -= countdown.seconds * 1000
        //
        if (countdown.hour < 10) {
          countdown.hour = '0' + countdown.hour
        }
        if (countdown.minutes < 10) {
          countdown.minutes = '0' + countdown.minutes
        }
        if (countdown.seconds < 10) {
          countdown.seconds = '0' + countdown.seconds
        }
      } else if (flg) {
        clearInterval(this.timer)
        this.onEnd()
      } else {
        this.current = this.start_time
        this.startcountdown()
      }
    },
    /**
     * start callback
     * @public
     */
    onStart() {
      console.log('start...')
      this.countdown_type = 'run'
      this.$emit('onStart')
    },
    /**
     * stop callback
     * @public
     */
    onEnd() {
      console.log('end...')
      this.countdown_type = 'end'
      this.$emit('onEnd')
    }
  }
}
</script>

<style lang="less">
.countdown {
  i {
    font-style: normal;
  }
}
</style>
