<script>
  /**
   * Topbar component
   */
  export default {

    data() {
      return {
        languages: [{
          flag: require("~/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
          {
            flag: require("~/assets/images/flags/french.jpg"),
            language: "fr",
            title: "French",
          },
          {
            flag: require("~/assets/images/flags/spain.jpg"),
            language: "es",
            title: "Spanish",
          },
          {
            flag: require("~/assets/images/flags/china.png"),
            language: "zh",
            title: "Chinese",
          },
          {
            flag: require("~/assets/images/flags/arabic.png"),
            language: "ar",
            title: "Arabic",
          },
        ],
        current_language: this.$i18n.locale,
        text: null,
        flag: null,
        value: null,
      };
    },

    mounted() {
      this.value = this.languages.find((x) => x.language === this.$i18n.locale);
      this.text = this.value.title;
      this.flag = this.value.flag;

    },
    methods: {
      /**
       * Toggle menu
       */
      toggleMenu() {
        this.$parent.toggleMenu();
      },
      /**
       * Full screen
       */
      initFullScreen() {
        document.body.classList.toggle("fullscreen-enable");
        if (
          !document.fullscreenElement &&
          /* alternative standard method */
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      },
      /**
       * Toggle rightbar
       */
      toggleRightSidebar() {
        this.$parent.toggleRightSidebar();
      },
      /**
       * Set languages
       */
      setLanguage(locale, country, flag) {
        this.$i18n.locale = locale;
        this.current_language = locale;
        this.text = country;
        this.flag = flag;
      },
      /**
       * Horizontal-toggle menu
       */
      horizonalmenu() {
        let element = document.getElementById("topnav-menu-content");
        element.classList.toggle("show");
      },
      /**
       * Logout user
       */
      async logoutUser() {
        await this.$auth.logout()

        // if (process.env.auth === "firebase") {
        //       this.$store.dispatch("auth/logOut");
        //   } else if (process.env.auth === "fakebackend") {
        //       this.$store.dispatch("authfack/logout");
        //   }
        //   this.$router.push({
        //       path: "/account/login",
        //   });
      },
    },
  };
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">


        <b-nav-item-dropdown variant="white" class="d-none d-lg-inline-block" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16"/>
            {{text}}
          </template>
          <b-dropdown-item class="notify-item" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                           @click="setLanguage(entry.language, entry.title, entry.flag)"
                           :link-class="{'active': entry.language === current_language}">
            <img :src="`${entry.flag}`" alt="user-image" class="mr-1" height="12"/>
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>


        <b-nav-item-dropdown right class="notification-list topbar-dropdown" menu-class="profile-dropdown"
                             toggle-class="p-0">
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <!--<img src="~/assets/images/users/avatar-1.jpg" alt="user-image" class="rounded-circle"/>-->
              <span class="pro-user-name ml-1">
                            {{$auth.user? $auth.user.gen_info.login:"" }}
                            <i class="mdi mdi-chevron-down"></i>
                        </span>
            </div>
          </template>


          <nuxt-link tag="a" class="dropdown-item"  to="/account/profile">
            <i class="fe-user mr-1"></i>
            <span>{{ $t('Profile') }}</span>
          </nuxt-link>

          <b-dropdown-divider></b-dropdown-divider>
          <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
            <i class="fe-log-out mr-1"></i>
            <span>{{ $t('navbar.dropdown.name.list.logout') }}</span>
          </a>
        </b-nav-item-dropdown>

        <!--<li class="dropdown notification-list">-->
          <!--<a href="javascript:void(0);" @click="logoutUser" rel="Logout" class="nav-link right-bar-toggle toggle-right">-->
            <!--<i class="fe-log-out noti-icon toggle-right"></i>-->
          <!--</a>-->
        <!--</li>-->
      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm-dark.png" alt height="24"/>
                  <!-- <span class="logo-lg-text-light">Minton</span> -->
                </span>
          <span class="logo-lg">
                    <img src="~/assets/images/logo-dark.png" alt height="50"/>
            <!-- <span class="logo-lg-text-light">M</span> -->
                </span>
        </nuxt-link>

        <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-light.png" alt height="24"/>
                </span>
          <span class="logo-lg">
                    <img src="~/assets/images/logo-light.png" alt height="50"/>
                </span>
        </nuxt-link>
      </div>


      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>
