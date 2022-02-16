<template>
  <div id="usersContainer">
    <div id="query">
      <span><i class="fas fa-search"></i></span>
      <input
        type="text"
        placeholder="exemple: Prénom Nom"
        v-model="search"
        aria-label="Saisir Prénom et nom"
      />
    </div>
    <div :key="user.id" v-for="user in filterUsers" class="user">
      <a
        id="header"
        v-if="user.id == this.logId"
        :href="`http://localhost:8080/profile`"
      >
        <div class="profileContainer">
          <img :src="user.avatar" alt="photo utilisateur" class="profile" />
        </div>
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
      </a>
      <a id="header" v-else :href="`http://localhost:8080/profile/${user.id}`">
        <div class="profileContainer">
          <router-link :to="`/profile/${user.id}`">
            <img
              :src="user.avatar"
              alt="avatar de utilisateur"
              class="profile"
            />
          </router-link>
        </div>
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",

  data() {
    return {
      users: [],
      userId: "",
      search: "",
    };
  },
  computed: {
    filterUsers: function () {
      return this.users.filter((user) => {
        return user.username.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
    },
    /* Récupération de tous les utilisateurs */
    async fetchUsers() {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      data.forEach((user) => {
        user.username = user.firstName + " " + user.lastName;
      });
      return data;
    },
  },
  async created() {
    this.users = await this.fetchUsers();
  },
  mounted() {
    this.UserMe();
  },
};
</script>

<style scoped>
#usersContainer {
  max-width: 600px;
  margin: 35px auto;
  padding-bottom: 8px;
  border-radius: 4px;
  background-color: white;
}
.user {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  margin: 1rem;
  padding: 1rem;
  border-radius: 4px;
}
#header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.profileContainer {
  width: 96px;
  height: 96px;
  min-width: 64px;
  min-height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}
.profile {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
p {
  margin: 0.5rem;
}
#query {
  text-align: center;
}
input {
  padding: 6px;
  border: 1px solid #1c68e6;
  border-radius: 4px;
}
input:focus {
  outline: none;
}
span {
  padding: 6px;
  border: 1px solid #1c68e6;
  border-right-style: none;
  border-radius: 4px 0 0 4px;
}

@media screen and (max-width: 992px) {
  #usersContainer {
    max-width: 90%;
  }
}
</style>