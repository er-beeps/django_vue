

<template>
    <div class="content">
      <h1>Users App</h1>
      <div class="list">
        <ul class="list_content">
          <li v-for="user in users" :key="user.id">
            <h4>{{ user.first_name }}</h4>
            <h4>{{ user.last_name }}</h4>
            <h4>{{ user.username }}</h4>
            <h4>{{ user.email }}</h4>
          </li>
        </ul>
      </div>
    </div>
  </template>


<script>
export default {
  data() {
    return {
      users: [],
      first_name: "",
      last_user: "",
      username: "",
      email: "",
      id: "",
      is_staff: false,
      is_superuser: false,
    };
  },
    methods: {
        async getUsers() {
            try {
                await this.$http
                .get(`http://127.0.0.1:8000/api/employees/`)
                .then((response) => {
                    this.employees = response.data;
                });
            } catch (error) {
                console.log(error);
            }
        },
    async submitEmployee() {
    try {
      if (!this.isEditing) {
        await this.$http
          .post(`http://127.0.0.1:8000/api/employees/`, {
            fullname: this.fullname,
            dep: this.dep,
            birthdate: this.birthdate,
            salary: this.salary,
          })
          .then((response) => {
            this.employees.push(response.data);
            this.fullname = "";
            this.dep = "";
            this.birthdate = "";
            this.salary = "";
          });
      } else {
        await this.$http
          .put(`http://127.0.0.1:8000/api/employees/${this.id}/`, {
            fullname: this.fullname,
            dep: this.dep,
            birthdate: this.birthdate,
            salary: this.salary,
          })
          .then((response) => {
            let objIndex = this.employees.findIndex((s) => s.id === this.id);
            let tmp = this.employees;
            tmp[objIndex] = response.data;
            this.employees = tmp;
            this.fullname = "";
            this.dep = "";
            this.birthdate = "";
            this.salary = "";
            this.id = "";
            this.isEditing = false;
            this.getEmployee();
          });
      }
    } catch (error) {
      console.log(error);
    }
},
    },
    created(){
        this.getUsers();
    },
}
</script>


<style scoped>
</style>