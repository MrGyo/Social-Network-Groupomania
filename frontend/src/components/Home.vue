<template>
    <div class="vue-template">
        <header-user></header-user>
        <h1 id="home" class="text-center font-weight-bold">{{ txt }}</h1>
    </div>
</template>

<script>
import HeaderUser from './HeaderUser';
export default {
    data() {
        return {
            txt: '@work...'
        }
    },
    components: {
    'header-user': HeaderUser
  }
}
</script>