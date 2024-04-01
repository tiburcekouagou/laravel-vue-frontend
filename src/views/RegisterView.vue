<script setup lang="ts"></script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form>
      <label>
        <div>Name</div>
        <input type="text" />
      </label>

      <label>
        <div>Email</div>
        <input type="email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" />
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="confirm_password" />
      </label>

      <button class="btn">Register</button>
    </form>

    <p>
      Already have an account?
      <router-link class="underline text-lime-600" to="/login">Login</router-link>
    </p>
  </div>
</template>
