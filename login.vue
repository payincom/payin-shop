<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm buttonText="Login" :submitForm="loginUser"/>
    {{this.$auth.user}}
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm'

  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async loginUser(loginInfo) {
        try {
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          console.log(this.$auth)
        } catch (e) {
          console.log(e)
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
