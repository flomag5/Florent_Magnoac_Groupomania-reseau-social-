<template>
  <div id="editProfile">
    <div class="showProfile">
      <button @click.prevent="$emit('toggle-Profile')">
        <i class="fas fa-arrow-left"></i>retour au profil
      </button>
    </div>
    <form>
      <label for="file" class="profileLabel">
        <div>Changer d'image de profil :</div>
        <div class="profileContainer">
          <img
            id="preview"
            :src="user.avatar"
            alt="Photo de profil"
            class="profile"
          />
        </div>
      </label>
      <input
        type="file"
        ref="file"
        name="avatar"
        accept="image/*"
        id="file"
        aria-label="Photo de profil"
        @change="selectFile"
      />

      <label for="firstName">Modifier le prénom :</label>
      <input type="text" name="firstName" v-model="firstName" />

      <label for="lastName">Modifier le nom :</label>
      <input type="text" name="lastName" v-model="lastName" />

      <button @click.prevent="deleteProfile" class="delete">
        <i class="far fa-trash-alt delete"></i>Supprimer compte
      </button>

      <input
        type="submit"
        value="modifier"
        class="btn"
        @click.prevent="modifyProfile"
      />
    </form>
    <h4>{{ errMsg }}</h4>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "updateUser",

  data() {
    return {
      token: "",
      image: "",
      firstname: "",
      lastname: "",

      userid: "",
      file: null,
      url: null,
    };
  },
  methods: {
    deleteProfile() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (confirm("êtes vous sûr de vouloir supprimer votre compte ?")) {
        fetch(`http://localhost:3000/api/user/${user.userId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then(localStorage.clear())
          .then(router.push({ path: "/" }))
          .catch((error) => {
            error;
          });
      }
    },
    /*   selectFile(event) {
      this.avatar = this.$refs.file.files[0];
      let input = event.target;

      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },*/

    modifyProfile() {
      const fd = new FormData();
      fd.append("image", this.file, this.file.name);
      axios
        .put(`http://localhost:3000/api/user/${this.userid}`, fd, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("update", JSON.stringify(res.data));
          let newUpProfil = {
            avatar: JSON.parse(localStorage.update).avatar,
            firstname: JSON.parse(localStorage.user).firstname,
            lastname: JSON.parse(localStorage.user).lastname,
            token: JSON.parse(localStorage.user).token,
            userId: JSON.parse(localStorage.user).userId,
          };
          localStorage.setItem("user", JSON.stringify(newUpProfil));
          alert(`${JSON.parse(localStorage.update).message}`);
          localStorage.removeItem("update");
          //this.buttonModif();
        })
        .catch((error) => console.log({ error }));
    },
    selectFile(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
  },
};
</script>

<style scoped>
/*#editProfile {
  max-width: 60%;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  margin: auto;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}*/
.showProfile {
  text-align: right;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 1rem;
}
input {
  margin: 0.8rem;
  padding: 10px;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 4px;
  outline: none;
}
.profileLabel {
  display: flex;
  align-items: center;
}
.profileContainer {
  margin-left: 1rem;
  width: 78px;
  height: 78px;
  min-width: 64px;
  min-height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
#file {
  cursor: pointer;
}
i {
  padding-right: 0.5rem;
}
button {
  background: transparent;
  border: none;
  margin: 1rem;
  font-size: 0.94rem;
}
.btn {
  margin-top: 1rem;
  color: white;
  background: #1c69e6e7;
}
.btn:hover {
  box-shadow: 2px 2px 8px 5px #1c69e665;
  background: #1c68e6;
}
.btn:active {
  transform: scale(0.98);
}
.delete:hover {
  color: red;
  font-weight: bold;
}
@media screen and (max-width: 992px) {
  #editProfile {
    max-width: 100%;
  }
}
</style>