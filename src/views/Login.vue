<template>
    <div>
      <main>
        <section class="absolute w-full h-full">
          <div
            class="absolute top-0 w-full h-full bg-gray-900"
            style="background-size: 100%; background-repeat: no-repeat;"
            :style="{ 'background-image': 'url(../assets/images/bg.png)' }"
          ></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
              <div class="w-full lg:w-5/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                >
                  <div class="rounded-t mb-0 px-6 py-6">
                    <div class="text-center mb-3">
                      <h6 class="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div class="btn-wrapper text-center">
                      <button
                        class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                      >
                        <img
                          alt="..."
                          class="w-5 mr-1"
                          src="../assets/images/google.svg">
                      </button>
                    </div>
                    <hr class="mt-4 border-b-1 border-gray-400" />
                  </div>
                  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div class="text-gray-500 text-center mb-3 font-bold">
                      <small>OR <br/> <small>
                      </small>Sign in with credentials</small>
                    </div>
                    <form @submit.prevent="loginAction()">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-sm font-bold mb-2"
                          for="grid-password"
                          >Email</label
                        ><input
                          v-model="email"
                          type="email"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style="transition: all 0.15s ease 0s;"
                          :class="{ 'border-red-300 border-2': validationErrors.email }"
                        />
                        <div v-if="validationErrors.email" class="text-red-500 text-xs mt-1">{{ validationErrors.email[0] }}</div>
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password" 
                          >Password</label
                        ><input
                        v-model="password"
                          type="password"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style="transition: all 0.15s ease 0s;"
                          :class="{ 'border-red-300 border-2': validationErrors.password }"
                        />
                        <div v-if="validationErrors.password" class="text-red-500 text-xs mt-1">{{ validationErrors.password[0] }}</div>
                      </div>
                      <div>
                        <label class="inline-flex items-center cursor-pointer"
                          ><input
                            id="customCheckLogin"
                            type="checkbox"
                            class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style="transition: all 0.15s ease 0s;"
                          /><span class="ml-2 text-sm font-semibold text-gray-700"
                            >Remember me</span
                          ></label
                        >
                      </div>
                      <div class="text-center mt-6">
                        <button :disabled="isSubmitting" @click="loginAction()"
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="flex flex-wrap mt-6">
                  <div class="w-1/2">
                    <a href="#pablo" class="text-gray-300"
                      ><small>Forgot password?</small></a
                    >
                  </div>
                  <div class="w-1/2 text-right">
                    <a href="#pablo" class="text-gray-300"
                      ><small>Create new account</small></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>

<script>

export default {
  name:'LoginPage',
  data() {
    return {
      email:'',
      password:'',
      validationErrors:{},
      isSubmitting:false,
    };
  },
  created(){
    if(localStorage.getItem('token') != " " && localStorage.getItem('token') != null){
      this.$router.push('/dashboard')
    }
  },
  methods:{
    validateEmail(email) {
      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    loginAction(){
      this.isSubmitting=true;
      this.validationErrors={};
      // Basic validation checks
      if (!this.email) {
        this.validationErrors.email = ['The email field is required.'];
      }else if (!this.validateEmail(this.email)) {
        this.validationErrors.email = ['Invalid email format.'];
      }
      if (!this.password) {
        this.validationErrors.password = ['The password field is required.'];
      }
          // Remove errors when the user starts typing in the fields
          this.$watch('email', () => {
        if (this.validationErrors.email) {
          delete this.validationErrors.email;
        }
      });

      this.$watch('password', () => {
        if (this.validationErrors.password) {
          delete this.validationErrors.password;
        }
      });

      if (Object.keys(this.validationErrors).length === 0) {
        let payload={
          email:  this.email,
          password:this.password
        }
        console.log(payload)
        this.$axios.post('login',payload)
        .then(response=>{
          localStorage.setItem('token',response.data.token)
          this.$router.push('/dashboard')
          return response
        })
        .catch(error=>{
          this.isSubmitting=false
          if (error.response.data.errors != undefined) {
                  this.validationErrors = error.response.data.errors
              }
              if (error.response.data.error != undefined) {
                  this.validationErrors = error.response.data.error
              }
              return error
        });
      }else{
        this.isSubmitting=false;
      }
    }
  }
};
</script>