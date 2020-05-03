<template>
  <div id="ControlIndex">
    <controlHeader/>
    <controlContent/>
    <controlNav/>
  </div>
</template>

<script>
import controlContent from '@/views/Control/controlComponents/controlContent'
import controlNav from '@/views/Control/controlComponents/controlNav'
import controlHeader from '@/views/Control/controlComponents/controlHeader'
export default {
  components:{
    controlContent,
    controlNav,
    controlHeader
  }
}
</script>

<style>

</style>