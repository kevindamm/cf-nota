<template>
<nav>
  <ul>
    <li><h1>Mic Memo</h1></li>
  </ul>
  <ul>
    <li><a href="/about">About</a></li>
    <li v-if="$auth.loggedIn">
      <LoginLink to="/auth/login" external>
        Sign in
      </LoginLink>
      <RegisterLink to="/api/register" external>
        Sign up
      </RegisterLink>
    </li>
    <li v-else>
      <NuxtLink to="/api/logout" external>
        Sign out
      </NuxtLink>
    </li>
    <li></li>
  </ul>
</nav>
</template>

<style>
nav h1 {
  scale: 0.8;
}
</style>