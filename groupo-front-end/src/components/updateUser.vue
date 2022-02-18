<template>
  <div id="updateUser">
    <div class="showProfile">
      <button @click.prevent="$emit('toggle-Profile')">
        <i class="fas fa-arrow-left"></i>retour au profil
      </button>
    </div>

    <form
      @submit.prevent="modifyProfile"
      method="PUT"
      enctype="multipart/form-data"
    >
      <label for="file" class="profileLabel">
        <div>Changer d'image de profil :</div>
        <div class="profileContainer">
          <img
            id="preview"
            :src="user.avatar"
            alt="Photo de profil"
            class="avatar"
          />
        </div>
      </label>
      <input
        type="file"
        ref="file"
        name="image"
        id="file"
        @change="selectFile"
      />

      <label for="firstName">Modifier le prénom :</label>
      <input
        type="text"
        name="firstName"
        aria-label="prénom"
        v-model="updateUser.firstName"
      />

      <label for="lastName">Modifier le nom :</label>
      <input
        type="text"
        name="lastName"
        aria-label="nom"
        v-model="updateUser.lastName"
      />

      <label for="password">Changer de mot de passe :</label>
      <input
        type="password"
        name="password"
        placeholder="entrez un nouveau mot de passe"
        v-model="updateUser.password"
      />

      <button
        @click.prevent="deleteProfile"
        class="delete"
        aria-label="suppression du compte"
      >
        <i class="far fa-trash-alt delete"></i>Supprimer compte
      </button>

      <input
        type="submit"
        value="modifier"
        class="btn"
        @click.prevent="modifyProfile"
      />
    </form>
    <h4 aria-label="si erreur">{{ errMsg }}</h4>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "updateUser",
  props: {
    user: Object,
  },
  data() {
    return {
      updateUser: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        password: null,
      },
      image: "",
      errMsg: null,
    };
  },
  methods: {
    // ----- SUPPRESSION DU COMPTE UTILISATEUR ----- //
    deleteProfile() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (confirm("êtes vous sûr de vouloir supprimer ce compte ?")) {
        fetch(`http://localhost:3000/api/user/${user.userId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then(router.push({ path: "/" }))
          .catch((error) => {
            error;
          });
      }
    },

    /** récupération du fichier image avant la modification du compte */
    selectFile(event) {
      this.file = this.$refs.file.files[0];
      let input = event.target;

      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    // ----- MODIFICATION DU COMPTE UTILISATEUR ----- //
    modifyProfile() {
      let user = JSON.parse(localStorage.getItem("user"));
      let formData = new FormData();
      formData.append("firstName", this.updateUser.firstName);
      formData.append("lastName", this.updateUser.lastName);
      /** modification du mot de passe */
      if (this.updateUser.password) {
        formData.append("password", this.updateUser.password);
      }

      if (this.file) {
        formData.append("image", this.file);
      }

      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (
        this.updateUser.password &&
        !regexPassword.test(this.updateUser.password)
      ) {
        this.errMsg =
          "Erreur format password: 8 caractères minimum dont 1 majuscule + 2 chiffres";
        return;
      }
      /** envoi de la requête AXIOS */
      if (confirm("êtes vous sûr de vouloir modifier votre profil ?")) {
        axios
          .put(`http://localhost:3000/api/user/${user.userId}`, formData, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => response.json())
          .then(location.reload())
          .catch((error) => {
            error;
          });
      } else {
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
/*#updateUser {
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
  #updateUser {
    max-width: 100%;
  }
}
</style>