<script>
/**
 * Loading component
 */
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
           setTimeout(()=>{
             this.loading = false;
           },100)
        }
    }
};
</script>

<template>
<!-- Loader -->
<div id="preloader" v-if="loading" style="top:70px;background-color: rgba(255, 255, 255, 0.8);" class="text-center">
    <div class="card-portlets-loader pt-lg-5">
        <div class="spinner-border text-primary m-2" role="status"></div>
    </div>
</div>
</template>
