<template>
  <div class="container">
    <input type="checkbox" id="flip" />
    <div class="cover">
      <div class="front">
        <!--<img src="/src/img/login-img.png" alt="">-->
        <div class="text">
          <span class="text-1"
            >Every new friend is a <br />
            new adventure</span
          >
          <span class="text-2">Let's get connected</span>
        </div>
      </div>
      <div class="back">
        <!--<img class="backImg" src="images/backImg.jpg" alt="">-->
        <div class="text">
          <span class="text-1"
            >Complete miles of journey <br />
            with one step</span
          >
          <span class="text-2">Let's get started</span>
        </div>
      </div>
    </div>
    <div class="forms">
      <div class="form-content">
        <div class="login-form">
          <div class="title">Login</div>
          <form action="#">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input
                  type="text"
                  v-model="correo"
                  placeholder="Enter your email"
                />
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  v-model="clave"
                  placeholder="Enter your password"
                />
              </div>
              <div class="text"><a href="#">Forgot password?</a></div>
              <div class="button input-box">
                <input type="submit" @click="inicioSesion" value="submit" />
              </div>
              <div class="text sign-up-text">
                Don't have an account? <label for="flip">Sigup now</label>
              </div>
            </div>
          </form>
        </div>
        <div class="signup-form">
          <div class="title">Signup</div>
          <form action="#">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  v-model="firstname"
                  placeholder="firstname"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input
                  type="text"
                  v-model="lastname"
                  placeholder="lastname"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input
                  type="text"
                  v-model="country"
                  placeholder="country"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input
                  type="text"
                  v-model="dateOfBirth"
                  placeholder="dateOfBirth"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input
                  type="text"
                  v-model="address"
                  placeholder="address"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input
                  type="text"
                  v-model="correo"
                  placeholder="email"
                  required
                />
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  v-model="clave"
                  placeholder="password"
                  required
                />
              </div>
              <div class="button input-box">
                <input type="submit" @click="registerUser" value="Register" />
              </div>
              <div class="text sign-up-text">
                Already have an account? <label for="flip">Login now</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style setup>
/* Google Font Link */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7d2ae8;
  padding: 30px;
}
.container {
  position: relative;
  max-width: 850px;
  width: 100%;
  background: #fff;
  padding: 40px 30px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  perspective: 2700px;
}
.container .cover {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;
  z-index: 98;
  transition: all 1s ease;
  transform-origin: left;
  transform-style: preserve-3d;
}
.container #flip:checked ~ .cover {
  transform: rotateY(-180deg);
}
.container .cover .front,
.container .cover .back {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.cover .back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
.container .cover::before,
.container .cover::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: #7d2ae8;
  opacity: 0.5;
  z-index: 12;
}
.container .cover::after {
  opacity: 0.3;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
.container .cover img {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 10;
}
.container .cover .text {
  position: absolute;
  z-index: 130;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cover .text .text-1,
.cover .text .text-2 {
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  text-align: center;
}
.cover .text .text-2 {
  font-size: 15px;
  font-weight: 500;
}
.container .forms {
  height: 100%;
  width: 100%;
  background: #fff;
}
.container .form-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-content .login-form,
.form-content .signup-form {
  width: calc(100% / 2 - 25px);
}
.forms .form-content .title {
  position: relative;
  font-size: 24px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .title:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 25px;
  background: #7d2ae8;
}
.forms .signup-form .title:before {
  width: 20px;
}
.forms .form-content .input-boxes {
  margin-top: 30px;
}
.forms .form-content .input-box {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  position: relative;
}
.form-content .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.form-content .input-box input:focus,
.form-content .input-box input:valid {
  border-color: #7d2ae8;
}
.form-content .input-box i {
  position: absolute;
  color: #7d2ae8;
  font-size: 17px;
}
.forms .form-content .text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .text a {
  text-decoration: none;
}
.forms .form-content .text a:hover {
  text-decoration: underline;
}
.forms .form-content .button {
  color: #fff;
  margin-top: 40px;
}
.forms .form-content .button input {
  color: #fff;
  background: #7d2ae8;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s ease;
}
.forms .form-content .button input:hover {
  background: #5b13b9;
}
.forms .form-content label {
  color: #5b13b9;
  cursor: pointer;
}
.forms .form-content label:hover {
  text-decoration: underline;
}
.forms .form-content .login-text,
.forms .form-content .sign-up-text {
  text-align: center;
  margin-top: 25px;
}
.container #flip {
  display: none;
}
@media (max-width: 730px) {
  .container .cover {
    display: none;
  }
  .form-content .login-form,
  .form-content .signup-form {
    width: 100%;
  }
  .form-content .signup-form {
    display: none;
  }
  .container #flip:checked ~ .forms .signup-form {
    display: block;
  }
  .container #flip:checked ~ .forms .login-form {
    display: none;
  }
}
</style>
<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      firstname: "",
      lastname: "",
      country: "",
      dateOfBirth: "",
      address: "",
      email: "",
      password: "",
    };
  },
  methods: {
    inicioSesion: function () {
      //console.log()
      var url = "http://localhost:5082/api/User/SignIn";
      var data = {
        email: this.correo,
        password: this.clave,
      };
      axios
        .post(url, data)
        .then((response) => {
          //console.log("Inicio exitoso")
          //console.log(JSON.stringify(response))
          localStorage.setItem("userData", JSON.stringify(response.data));
          this.$q.notify({
            message: "Inicio exitoso",
            color: "green",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          });
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          //console.log("Ocurrio un error...")
          this.$q.notify({
            message: "Inicio fallido",
            color: "green",
            avatar:
              "https://w7.pngwing.com/pngs/595/505/png-transparent-computer-icons-error-closeup-miscellaneous-text-logo-thumbnail.png",
          });
        });
    },
    registerUser: function () {
      console.log();
      var url = "http://localhost:5082/api/User/SignUp";
      var data = {
        firstname: this.firstname,
        lastname: this.lastname,
        country: this.country,
        dateOfBirth: this.dateOfBirth,
        address: this.address,
        email: this.email,
        password: this.clave,
      };
      axios
        .post(url, data)
        .then((response) => {
          localStorage.setItem("userData", JSON.stringify(response.data));
          this.$q.notify({
            message: "Registro exitoso",
            color: "green",
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          });
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          //console.log("Ocurrio un error...")
          this.$q.notify({
            message: "Registro fallido",
            color: "green",
            avatar:
              "https://w7.pngwing.com/pngs/595/505/png-transparent-computer-icons-error-closeup-miscellaneous-text-logo-thumbnail.png",
          });
        });
    },
  },
};
</script>
