<template>
  <app-modal id="login-modal" class="modal visible">
    <div class="modal__header">
      Welcome
    </div>
    <div class="modal__body">
      <app-form @submit.prevent="login" :schema="schema" id="login-form"/>
      <div class="text_small">
        Forgot password?
        <router-link to="/restore-password">Restore it!</router-link>
      </div>
    </div>
    <div class="modal__footer">
      <button class="btn btn_primary btn_block" type="submit" @click.prevent="login">Login</button>
    </div>
  </app-modal>
</template>

<script>
  import Auth from '../utils/Auth'
  import Modal from '../shared/Modal/Modal.vue';
  import Form from "../shared/Form/Form";

  // noinspection JSUnusedGlobalSymbols
  export default {
    components: {
      'app-modal': Modal,
      'app-form': Form
    },
    data() {
      return {
        email: null,
        password: null,
        error: false,
        schema: [
          {
            model: 'email',
            label: 'E-Mail',
            options: {
              input: {'placeholder': 'username@domain.com'}
            }
          },
          {
            model: 'password',
            type: 'password',
            label: 'Password',
            error: 'This is an error for password field',
            options: {
              input: {'placeholder': 'Your password'}
            }
          }
        ]
      }
    },
    methods: {
      login() {
        Auth.login(this.email, this.password, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  #login-modal {
    .modal__container {
      min-width: 400px;
    }
  }
</style>