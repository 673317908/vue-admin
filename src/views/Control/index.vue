<template>
  <div id="ControlIndex" :class="indexStatus?'close':'open'">
    <controlNav/>
    <controlHeader/>
    <controlContent/>
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
  },
  data(){
    return {

    }
  },
  computed:{
    indexStatus(){
      return this.$store.state.isCollapse
    }
  }
}
</script>

<style>

</style>