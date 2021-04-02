<script>
  import {alphaNum, minLength, required} from "vuelidate/lib/validators";
  import Stripe from 'stripe';

  /**
   * Companies component
   */
  const stripe = Stripe('pk_test_hG84qIUb4VFN5KlhKOSAqYET');

  export default {
    layout: 'horizontal',
    head() {
      return {
        title: `${this.title} | Payin Shop`,
      };
    },
    async asyncData({$axios, $auth, $toast}) {
      // console.log($auth)
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
    data() {
      return {
        search: '',
        sites: [],
        title: "Sites",
        loading: false,
        publishableKey: 'pk_test_hG84qIUb4VFN5KlhKOSAqYET',
        sessionId:'',
        items: [{
          text: "Payin Shop",
          href: "/"
        },
          {
            text: "Apps",
            href: "/"
          },
          {
            text: "Sites",
            active: true
          }
        ],
        newSitePrice: 0,
        showCreateModal: false,
        showDomainModal: false,
        createSubmitted: false,
        domainSubmitted: false,
        siteForDomainSetting: {},
        newSite: {
          subDomain: "",
        },
        domain: {
          alias: ""
        },
        loginUrl: "",
        loginPassword: "",
        isLoading: false,
        domainResolveErr: false,

      };
    },
    validations: {
      newSite: {
        subDomain: {
          alphaNum,
          required,
          minLength: minLength(8)
        },
      },
      domain: {
        alias: {
          required
        }
      }
    },
    computed: {
      sortedSites: function () {
        var self = this;
        let subDomainMatch = (site) => site.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        let aliasMatch = (site) => site.alias ? site.alias.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 : false
        return this.sites.filter(function (site) {
          return subDomainMatch(site) || aliasMatch(site);
        }).sort((a, b) => b.id - a.id);

        // return this.sites.sort((a, b) => b.id - a.id)
      },
    },
    mounted() {
      this.$toast.clear()
    },
    methods: {
      async updateSites() {
        let sitesResult = await this.$axios.$get('/api/sites')
        if (sitesResult) {
          this.sites = sitesResult.data
        }
      },
      /**
       * Modal form submit
       */
      async handleCreateSubmit(e) {

        this.createSubmitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.newSite.$invalid) {
          console.log('new site input invalid')
          return;
        } else {
          if (this.newSitePrice == 0) {
            this.$toast.show('Preparing your store, wait 1 minute ...')
            this.showCreateModal = false;
            this.isLoading = true
            let result = await this.$axios.post('/api/sites', {
              subDomain: this.newSite.subDomain + '.payin.com'
            })
            this.$toast.clear()
            console.log(result)
            if (result.data.errtext) {
              this.$toast.show(result.data.errtext, {duration: 10000})
            }

            await this.updateSites()
          }
          if (this.newSitePrice > 0) {
            this.$toast.show('Preparing your payment ...')
            this.showCreateModal = false;
            this.isLoading = true
            let result = await this.$axios.post('/api/billing/invoice', {
              subDomain: this.newSite.subDomain + '.payin.com'
            })
            console.log(result.data.id)

            this.sessionId= result.data.id
            this.$refs.sessionRef.redirectToCheckout()
            this.$toast.clear()
            if (result.data.errtext) {
              this.$toast.show(result.data.errtext, {duration: 10000})
            }

            await this.updateSites()
          }

        }
        this.createSubmitted = false;
        this.isLoading = false
        this.newSite = {};
      },

      async handleDomainSubmit(e) {
        this.$toast.show('Binding your nice domain ...')

        this.domainSubmitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.domain.$invalid) {
          console.log('new site input invalid')
          return;
        } else {
          this.isLoading = true
          let data = {
            alias: this.domain.alias
          }


          let result = await this.$axios.post('/api/domains/dns/check', data)
          if (result.data.valid) {
            this.showDomainModal = false;
            result = await this.$axios.post(`/api/sites/${this.siteForDomainSetting.id}/alias`, {
              domain: this.siteForDomainSetting.name,
              alias: this.domain.alias
            })
            await this.updateSites()
            this.domain = {};
          } else {
            this.domainResolveErr = true
          }
          this.domainSubmitted = false;
          this.isLoading = false
          this.$toast.clear()

        }
      },

      async handleDomainRemoveSubmit(e) {
        this.$toast.show('Removing domain from store ...')

        // stop here if form is invalid
        this.isLoading = true
        this.showDomainModal = false;
        console.log(this.siteForDomainSetting)
        let config = {
          method: 'delete',
          url: `/api/sites/${this.siteForDomainSetting.id}/alias`,
          data: {
            domain: this.siteForDomainSetting.name,
            alias: this.siteForDomainSetting.alias
          }
        }
        let result = await this.$axios(config)
        await this.updateSites()
        this.domain = {};
        this.domainSubmitted = false;
        this.isLoading = false
        this.$toast.clear()

      },


      async openCreateModal(e) {
        this.isLoading = true

        let priceResult = await this.$axios.$get('/api/billing/subscription/price')
        this.newSitePrice = priceResult.price
        this.isLoading = false

        this.showCreateModal = true


      },
      /**
       * Modal hide on close
       */
      hideCreateModal(e) {
        this.createSubmitted = false;
        this.showCreateModal = false;
        this.newSite = {};
        this.isLoading = false
      },

      hideDomainModal(e) {
        this.domainSubmitted = false;
        this.showDomainModal = false;
        this.newSite = {};
        this.siteForDomainSetting = {}
        this.isLoading = false
      },

      async openDomainModal(site) {

        this.siteForDomainSetting = site
        this.showDomainModal = true
      },

      async removeSite(site) {
        this.$toast.show('Removing this useless store ...')

        this.isLoading = true
        let result = await this.$axios.delete('/api/sites/' + site.id)
        await this.updateSites()
        this.isLoading = false
        this.$toast.clear()
      },

      loginSite(site) {
        this.loginUrl = `https://${site.alias ? site.alias : site.name}/wp-login.php`
        this.loginPassword = site.password
        setTimeout(() => {
          document.getElementById('wpInstanceRedirect').submit();
        }, 200)
      }

    },
    middleware: ['auth']
  };
</script>

<template>
  <div>
    <!--<PageHeader :title="title" :items="items"/>-->
    <div class="row mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-8">
                <form class="form-inline">
                  <div class="form-group">
                    <label class="sr-only">Search</label>
                    <input type="search" class="form-control" placeholder="Search..." v-model="search"/>
                  </div>
                  <div class="form-group mx-sm-3">
                    <label for="status-select" class="mr-2">Sort By</label>
                    <select id="status-select" class="custom-select">
                      <option>Select</option>
                      <option selected>Create Date</option>
                      <option>Expiration</option>
                      <!--<option>Traffic</option>-->
                    </select>
                  </div>
                </form>
              </div>
              <div class="col-lg-4">
                <div class="text-lg-right mt-3 mt-lg-0">
                  <!--<button type="button" class="btn btn-success mr-1">-->
                  <!--<i class="mdi mdi-cog"></i>-->
                  <!--</button>-->
                  <a class="btn text-white btn-danger" href="javascript: void(0);" @click="openCreateModal">
                    <i class="mdi mdi-plus-circle mr-1"></i> New Store
                  </a>
                </div>
              </div>
              <!-- end col-->
            </div>
            <!-- end row -->
          </div>
          <!-- end card-box -->
        </div>
      </div>
      <!-- end col-->
    </div>
    <div class="row">
      <div v-for="site in sortedSites" :key="site.name" class="col-xl-4 col-sm-6">
        <div class="card">
          <div class="card-body">
            <div class="media">
              <!--<div class="avatar-md mr-3">-->
              <!--<div class="avatar-title bg-light rounded-circle">-->
              <!--&lt;!&ndash;<img :src="`${site.logo}`" alt="logo" class="avatar-sm rounded-circle"/>&ndash;&gt;-->
              <!--</div>-->
              <!--</div>-->
              <div class="media-body">
                <h4 class="my-1">
                  <a target="_blank" :href="`https://${site.alias?site.alias:site.name}`" class="text-dark">{{
                    site.alias?site.alias:site.name
                    }}</a>

                </h4>
                <p class="text-muted text-truncate mb-1">
                  <a target="_blank" :href="'https://'+site.name" class="text-muted">{{
                    site.name
                    }}</a>
                </p>
                <p class="text-muted text-truncate mb-0">
                  SSL
                  <i class="bx bx-check-shield text-success  mr-1"></i>
                  CDN
                  <i class="bx bx-check-shield text-success  mr-1"></i>
                  SEO
                  <i class="bx bx-check-shield text-success  mr-1"></i>
                </p>
                <br>

              </div>

              <b-dropdown right toggle-class="text-body p-0" variant="black">
                <template v-slot:button-content>
                  <i class="mdi mdi-dots-vertical font-20"></i>
                </template>
                <b-dropdown-item @click="()=>loginSite(site)">Login</b-dropdown-item>
                <b-dropdown-item @click="()=>openDomainModal(site)">Domain</b-dropdown-item>
                <b-dropdown-item @click="()=>removeSite(site)">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
            <hr v-if="site.revenue">
            <div class="text-muted">
              <div class="row">
                <div class="col-6">
                  <div>
                    <p class="text-truncate mb-0">Create Date</p>
                    <h5 class="mb-sm-0">{{ site.cr_date }}</h5>
                  </div>
                </div>
                <div class="col-6">
                  <div>
                    <p class="text-truncate mb-0">Expiration</p>
                    <h5 class="mb-sm-0">{{ $moment(site.expiration*1000).format('YYYY-MM-DD') }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-1" v-model="showCreateModal" title="Create New Shop" header-close-variant="light"
             title-class="font-18"
             hide-footer>
      <form @submit.prevent="handleCreateSubmit">
        <div class="form-group">
          <label for="name" style="display: block">Shop ID</label>
          <input id="name" v-model="newSite.subDomain" type="text" class="form-control" placeholder="name"
                 :class="{ 'is-invalid': createSubmitted && $v.newSite.subDomain.$error }"
                 style="display: inline;width: 50%"/>.payin.com
          <div v-if="createSubmitted && !$v.newSite.subDomain.required" class="invalid-feedback">
            Shop ID is required.
          </div>
          <div v-if="createSubmitted && !$v.newSite.subDomain.alphaNum" class="invalid-feedback">Shop ID should be
            alphanumeric.
          </div>
          <div v-if="createSubmitted && !$v.newSite.subDomain.minLength" class="invalid-feedback">Shop ID minimum length
            is 8.
          </div>

          <div class="text-muted font-10 mt-1">
            Shop ID can't be changed after created.
          </div>
        </div>
        <hr>

        <h4 class="text-muted ml-2">Invoice</h4>
        <div class="table-responsive">
          <table class="table mb-0 ">

            <tbody>
            <tr>
              <td>Service:</td>
              <td class="text-right">Woocommerce store</td>
            </tr>
            <tr>
              <td>Plan:</td>
              <td class="text-right">{{newSitePrice>0?'Standard':'Free'}}</td>
            </tr>
            <tr>
              <td>Billing interval:</td>
              <td class="text-right">Month</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td class="text-right">${{newSitePrice}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right">
          <b-button class="ml-1" variant="danger" @click="hideCreateModal">Cancel</b-button>
          <button type="submit" class="btn btn-success">{{newSitePrice>0?'Pay':'Create'}}</button>
        </div>
      </form>

    </b-modal>

    <!-- Modal  -->

    <b-modal id="modal-2" v-model="showDomainModal" title="Doming Binding" header-close-variant="light"
             title-class="font-18"
             hide-footer>
      <form @submit.prevent="handleDomainSubmit">
        <div v-if="!this.siteForDomainSetting.alias">
          <div class="form-group">
            <label for="domainAlias">Domain</label>
            <input id="domainAlias" v-model="domain.alias" type="text" class="form-control" placeholder="Domain"
                   :class="{ 'is-invalid': domainSubmitted && $v.domain.alias.$error }"/>
            <div v-if="domainSubmitted && !$v.domain.alias.required" class="invalid-feedback">
              Domain is required.
            </div>
            <div v-if="domainResolveErr" class="text-danger">
              Domain is not resolved to Payin server. Set A record to 54.219.13.128 and try again later.
            </div>
          </div>

          <div class="text-right">
            <b-button class="ml-1" variant="danger" @click="hideDomainModal">Cancel</b-button>
            <button type="submit" class="btn btn-success">Create</button>

          </div>
        </div>
        <div v-if="this.siteForDomainSetting.alias">
          <div class="form-group">
            <label>Remove Binding</label>
            <div class="text-danger">
              {{siteForDomainSetting.alias}}
            </div>
          </div>

          <div class="text-right">
            <button class="btn btn-success" @click="hideDomainModal">Cancel</button>
            <b-button class="ml-1" variant="danger" @click="handleDomainRemoveSubmit">Remove</b-button>
          </div>
        </div>


      </form>

    </b-modal>


    <div v-if="isLoading" class="card-disabled" style="z-index: 1000;">
      <div class="card-portlets-loader">
        <div class="spinner-border text-primary m-2" role="status"></div>
      </div>
    </div>

    <form id="wpInstanceRedirect" :action="loginUrl" method="POST" target="_blank" style="display: none;">
      <input type="hidden" name="log" value="payin">
      <input type="hidden" name="pwd" :value="loginPassword">
      <input type="submit" value="Continue"/>
    </form>

    <stripe-checkout
      ref="sessionRef"
      :pk="publishableKey"
      :session-id="sessionId"
      mode="subscription"

    />
  </div>

</template>
