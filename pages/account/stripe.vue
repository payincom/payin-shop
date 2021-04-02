<template>
  <stripe-checkout
    ref="checkoutRef"
    :pk="publishableKey"
    :items="items"
    :successUrl="successUrl"
    :cancelUrl="cancelUrl"
  >
    <template slot="checkout-button">
      <button @click="checkout">Shut up and take my money!</button>
    </template>
  </stripe-checkout>
</template>

<script>
  import { StripeCheckout } from 'vue-stripe-checkout';
  export default {
    components: {
      StripeCheckout
    },
    data: () => ({
      loading: false,
      publishableKey: 'pk_test_hG84qIUb4VFN5KlhKOSAqYET',
      items: [
        {
          "plan": "plan_IbTcHIBOwyyoqw",
          "quantity": 1
        }
      ],
      successUrl: 'https://payin.com',
      cancelUrl: 'https://payin.com',
    }),
    methods: {
      checkout () {
        this.$refs.checkoutRef.redirectToCheckout();
      }
    }
  }
</script>
