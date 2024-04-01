<template>
  <div class="login">
    <h1>Login</h1>
    <form>
      <label>
        <div>Email</div>
        <input type="text" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" />
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <router-link class="underline text-lime-600" to="/register">Register now!</router-link>
    </p>
  </div>
</template>
