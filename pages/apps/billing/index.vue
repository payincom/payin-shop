<script>

  /**
   * Companies component
   */
  export default {
    layout: 'horizontal',
    head() {
      return {
        title: `${this.title} | Payin Shop`,
      };
    },
    data() {
      return {
        sites: [],
        title: "Billing",

      }
    },
    async asyncData({$axios, $auth}) {
      console.log($auth)
      try {
        const sitesResult = await $axios.$get('/api/sites')
        if (sitesResult)
          return {sites: sitesResult.data}

      } catch (e) {
        console.log(e)
        // $auth.logout()
      }
      return
    },

    middleware: 'auth'
  };
</script>

<template>
  <div class="row mt-3">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body"><h4 class="header-title">Stores</h4>
          <p class="sub-header">
            <!--For basic styling—light padding and only horizontal dividers—add the base class <code>.table</code> to any-->
            <!--<code>&lt;table&gt;</code>.-->
          </p>
          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>Store</th>
                <th>Expiration</th>
                <th class="text-right">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="site in sites" :key="site.name">
                <td>{{site.name}}</td>
                <td>{{ $moment(site.expiration*1000).format('YYYY-MM-DD') }}</td>
                <td class="text-right">
                  <button type="button" class="btn btn-outline-dark mr-1">Unsubscribe</button>
                  <button type="button" class="btn btn-outline-primary">Renew</button>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body"><h4 class="header-title">Invoices</h4>
          <p class="sub-header">
            <!--For basic styling—light padding and only horizontal dividers—add the base class <code>.table</code> to any-->
            <!--<code>&lt;table&gt;</code>.-->
          </p>
          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>Invoice Id</th>
                <th>Store</th>
                <th>Date</th>
                <th>Price</th>
                <th class="text-right">Action/Status</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>21235593872</td>
                <td>abc.payin.com</td>
                <td>2020-12-12</td>
                <td>$19.99</td>
                <td class="text-right">Paid</td>
              </tr>
              <tr>
                <td>21235593872</td>
                <td>bc.payin.com</td>
                <td>2020-12-12</td>
                <td>$19.99</td>
                <td class="text-right">
                  <button type="button" class="btn btn-outline-primary">Pay</button>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
