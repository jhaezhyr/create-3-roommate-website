<template>
	<div id="app">
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<a class="navbar-brand mx-auto" href="index.html">
				<img src="/images/Ru-Me-small.png" width=40px height=40px/>Ru-Me
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse w-100 order-1 dual-collapse2">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<router-link class="nav-link" to="/dashboard">Dashboard</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/browse">Browse</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/profile">Profile</router-link>
					</li>
				</ul>
			</div>
		</nav>
		<router-view/>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
