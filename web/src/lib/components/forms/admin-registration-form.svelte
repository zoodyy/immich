<script lang="ts">
	import { goto } from '$app/navigation';

	import { sendRegistrationForm } from '$lib/auth-api';
	let error: string;
	let success: string;

	let password: string = '';
	let confirmPassowrd: string = '';

	let canRegister = false;

	$: {
		if (password !== confirmPassowrd && confirmPassowrd.length > 0) {
			error = 'Password does not match';
			canRegister = false;
		} else {
			error = '';
			canRegister = true;
		}
	}
	async function registerAdmin(event: SubmitEvent) {
		if (canRegister) {
			error = '';

			const formElement = event.target as HTMLFormElement;

			const response = await sendRegistrationForm(formElement);

			if (response.error) {
				error = JSON.stringify(response.error);
			}

			if (response.success) {
				success = response.success;
				goto('/auth/login');
			}
		}
	}
</script>

<div class="border bg-white p-4 shadow-sm w-[500px] rounded-md py-8">
	<div class="flex flex-col place-items-center place-content-center gap-4 px-4">
		<img class="text-center" src="/immich-logo.svg" height="100" width="100" alt="immich-logo" />
		<h1 class="text-2xl text-immich-primary font-medium">Admin Registration</h1>
		<p class="text-sm border rounded-md p-4 font-mono text-gray-600">
			Since you are the first user on the system, you will be assigned as the Admin and are responsible for
			administrative tasks, and additional users will be created by you.
		</p>
	</div>

	<form on:submit|preventDefault={registerAdmin} method="post" action="" autocomplete="off">
		<div class="m-4 flex flex-col gap-2">
			<label class="immich-form-label" for="email">Admin Email</label>
			<input class="immich-form-input" id="email" name="email" type="email" required />
		</div>

		<div class="m-4 flex flex-col gap-2">
			<label class="immich-form-label" for="password">Admin Password</label>
			<input class="immich-form-input" id="password" name="password" type="password" required bind:value={password} />
		</div>

		<div class="m-4 flex flex-col gap-2">
			<label class="immich-form-label" for="confirmPassword">Confirm Admin Password</label>
			<input
				class="immich-form-input"
				id="confirmPassword"
				name="password"
				type="password"
				required
				bind:value={confirmPassowrd}
			/>
		</div>

		<div class="m-4 flex flex-col gap-2">
			<label class="immich-form-label" for="firstName">First Name</label>
			<input class="immich-form-input" id="firstName" name="firstName" type="text" required />
		</div>

		<div class="m-4 flex flex-col gap-2">
			<label class="immich-form-label" for="lastName">Last Name</label>
			<input class="immich-form-input" id="lastName" name="lastName" type="text" required />
		</div>

		{#if error}
			<p class="text-red-400 ml-4">{error}</p>
		{/if}

		{#if success}
			<div>
				<p>Admin account has been registered</p>
				<p>
					<a href="/auth/login">Login</a>
				</p>
			</div>
		{/if}

		<div class="flex w-full">
			<button
				type="submit"
				class="m-4 p-2 bg-immich-primary hover:bg-immich-primary/75 px-6 py-4 text-white rounded-md shadow-md w-full"
				>Sign Up</button
			>
		</div>
	</form>
</div>
