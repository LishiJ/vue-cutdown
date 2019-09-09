<template>
  <p class="vue-cutdown">
    <span v-if="cutdown.day > 0"
      ><span>{{ cutdown.day }}</span
      ><i>{{ dayTxt }}</i></span
    >
    <span>{{ cutdown.hour }}</span>
    <i>{{ hourTxt }}</i>
    <span>{{ cutdown.minutes }}</span>
    <i>{{ minutesTxt }}</i>
    <span>{{ cutdown.seconds }}</span>
  </p>
</template>

<script>
export default {
  name: 'VueCutdown',
  props: {
    /**
     * Cutdown day_text
     */
    dayTxt: {
      type: String,
      default: '天'
    },
    /**
     * Cutdown hour_text
     */
    hourTxt: {
      type: String,
      default: ':'
    },
    /**
     * Cutdown minutes_text
     */
    minutesTxt: {
      type: String,
      default: ':'
    },
    /**
     * Cutdown seconds_text
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
        hour: 1,
        minutes: 10,
        seconds: 20
      }
    }
  }
}
</script>

<style lang="less"></style>
