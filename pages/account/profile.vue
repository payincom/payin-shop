<script>
  import {email, integer, maxLength, minLength, required} from "vuelidate/lib/validators";

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
        tryingUpdateProfile: false,

        title: "Account",
        cname: this.$auth.user.gen_info.cname,
        pname: this.$auth.user.gen_info.pname,
        email: this.$auth.user.gen_info.email,
        phone: this.$auth.user.gen_info.phone,
        address: this.$auth.user.gen_info.address,

      }
    },
    validations: {
      pname: {
        required,
        minLength: minLength(4)
      },
      cname: {
        minLength: minLength(3)
      },
      address: {
        maxLength: maxLength(128)
      },
      phone: {
        integer,
        minLength: minLength(8)
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      },

    },

    methods: {
      async handleProfileSubmit() {
        this.tryingUpdateProfile = true
        let result = await this.$axios.post(`/api/customers/me/profile`, {
          cname: this.cname,
          pname: this.pname,
          address: this.address,
          phone: this.phone
        })
        if (result.data.errcode) {
          this.$toast(result.data.errtext, {duration: 50000})
        } else {
          this.$toast('Profile updated.', {duration: 50000})
        }
        this.tryingUpdateProfile = false
      }
    },

    middleware: 'auth'
  };
</script>

<template>
  <div>
    <div class="row mt-3">
      <div class="col-6">
        <div class="card">
          <div class="card-body"><h4 class="header-title">Account Infomation</h4>
            <p class="sub-header">
              Most common form control, text-based input fields. Includes support for all HTML5 types:
            </p>
            <div class="row">
              <div class="col-12">
                <div class="p-2">
                  <form role="form" class="form-horizontal" @submit.prevent="handleProfileSubmit">
                    <div role="group" class="form-row form-group"><label id="pname"

                                                                         class="col-sm-2 col-lg-2 col-form-label">Your
                      name</label>
                      <div class="bv-no-focus-ring col">
                        <input v-model.trim="$v.pname.$model" type="text"
                               class="form-control" :class="{ 'is-invalid':  $v.pname.$error }" for="text">
                        <div v-if="!$v.pname.required" class="invalid-feedback">
                          Name is required / Minimum length is 4.
                        </div>
                        <!----><!----><!----></div>
                    </div>
                    <div id="example-email" role="group" class="form-row form-group"><label
                      id="example-email__BV_label_" for="email" class="col-sm-2 col-lg-2 col-form-label">Email</label>
                      <div class="bv-no-focus-ring col">
                        <input disabled id="email" type="text" :class="{ 'is-invalid':  $v.email.$error }"
                               v-model.trim="$v.email.$model"
                               class="form-control"><!----><!----><!---->
                        <div v-if="!$v.email.required" class="invalid-feedback">
                          Invalid email.
                        </div>
                      </div>
                    </div>
                    <div role="group" class="form-row form-group"><label

                      class="col-sm-2 col-lg-2 col-form-label">Company</label>
                      <div class="bv-no-focus-ring col"><input type="text" class="form-control" for="text"
                                                               v-model.trim="$v.cname.$model"
                                                               :class="{ 'is-invalid':  $v.cname.$error }">
                        <!----><!----><!---->
                        <div v-if="$v.cname.$error" class="invalid-feedback">
                          Minimum length is 3.
                        </div>

                      </div>
                    </div>
                    <div role="group" class="form-row form-group"><label

                      class="col-sm-2 col-lg-2 col-form-label">Phone</label>
                      <div class="bv-no-focus-ring col"><input type="text" class="form-control" for="text"
                                                               v-model.trim="$v.phone.$model"
                                                               :class="{ 'is-invalid':  $v.phone.$error }"><!---->
                        <!----><!---->
                        <div v-if="$v.phone.$error" class="invalid-feedback">
                          Number only / Minimum length is 8.
                        </div>
                      </div>
                    </div>
                    <div role="group" class="form-row form-group"><label

                      class="col-sm-2 col-lg-2 col-form-label">Address</label>
                      <div class="bv-no-focus-ring col"><input type="text" class="form-control" for="text"
                                                               v-model.trim="$v.address.$model"
                                                               :class="{ 'is-invalid':  $v.address.$error }"><!---->
                        <!---->
                        <!---->
                        <div v-if="$v.address.$error" class="invalid-feedback">
                          Max length is 128.
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <button type="submit" class="btn btn-success">Update</button>
                      <div class="text-right mr-3" v-if="tryingUpdateProfile">
                        <b-spinner label="Text Centered"></b-spinner>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="card-body"><h4 class="header-title">Change Password</h4>
            <p class="sub-header">
              Most common form control, text-based input fields. Includes support for all HTML5 types:
            </p>
            <div class="row">
              <div class="col-12">
                <div class="p-2">
                  <form role="form" class="form-horizontal">

                    <div role="group" class="form-row form-group"><label
                      class="col-sm-2 col-lg-2 col-form-label">Current</label>
                      <div class="bv-no-focus-ring col"><input type="password" placeholder="Current Password"
                                                               class="form-control"><!---->
                        <!----><!----></div>
                    </div>
                    <div role="group" class="form-row form-group"><label
                      class="col-sm-2 col-lg-2 col-form-label">New</label>
                      <div class="bv-no-focus-ring col"><input type="password" placeholder="New Password"
                                                               class="form-control"><!---->
                        <!----><!----></div>
                    </div>
                    <div id="example-password" role="group" class="form-row form-group"><label
                      class="col-sm-2 col-lg-2 col-form-label">Re-type</label>
                      <div class="bv-no-focus-ring col"><input type="password" placeholder="Re-type Password"
                                                               class="form-control"><!---->
                        <!----><!----></div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div class="text-right">
              <button class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
