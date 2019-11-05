基本用法

```vue
<template>
  <vue-cutdown :endTime="endTime"/>
</template>

<script>
export default {
  data() {
    return {
      endTime: new Date().getTime() + 9000
    }
  }
}
</script>
```

自定义文字 + 自定义分隔符

```vue
<template>
  <vue-cutdown 
    :endTime="endTime"
    :startText="startText"
    :runingText="runingText"
    :endText="endText"
    :tipSepartor="tipSepartor"
    :hourTxt="hourTxt"
    :minutesTxt="minutesTxt"
    :secondsTxt="secondsTxt"
  />
</template>

<script>
export default {
  data() {
    return {
      startText: '距离开始',
      runingText: '距离结束',
      endText: '结束了',
      tipSepartor: '👉',
      hourTxt: '_',
      minutesTxt: '_',
      secondsTxt: '_',
      endTime: new Date().getTime() + 9000
    }
  }
}
</script>
```

活动未开始时和结束时不显示时间

```vue
<template>
  <vue-cutdown 
    :startText="startText"
    :runingText="runingText"
    :endText="endText"
    :startTime="startTime"
    :endTime="endTime" 
    :tipSepartor="tipSepartor"
    :showTimeBefore="showTimeBefore"
    :showTimeAfter="showTimeAfter"
  />
</template>

<script>
export default {
  data() {
    return {
      startText: '即将开始~',
      runingText: '距离结束',
      endText: '结束了~',
      tipSepartor: ' ',
      startTime: new Date().getTime() + 4000,
      endTime: new Date().getTime() + 9000,
      showTimeBefore: false,
      showTimeAfter: false
    }
  }
}
</script>
```

[查看更多配置项 >>](https://github.com/seiwhale/vue-cutdown)
