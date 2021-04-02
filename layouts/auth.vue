<script>
/**
 * Auth-layout
 */
export default {
    data() {
        return {

        }
    },
  watch: {
    $route () {
      if(this.$toast){
        this.$toast.clear()
      }
    }
  },
}
</script>

<template>
<div>
    <div class="account-pages mt-5 mb-5">
        <div class="container">
            <Nuxt />
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->
    <footer class="footer footer-alt">
        {{new Date().getFullYear()}} &copy; Powered by Payin
    </footer>
</div>
</template>
