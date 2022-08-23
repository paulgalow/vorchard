<script lang="ts">
  export let AUTH_METHODS: AuthMethod[];
  export let selectedAuthMethod: string;
</script>

<div class="w-1/2">
  <label
    for="auth-method"
    class="block text-sm font-medium text-gray-700 truncate"
    >Authentication method</label
  >
  <select
    name="auth-method"
    id="auth-method"
    bind:value={selectedAuthMethod}
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  >
    {#each AUTH_METHODS as method}
      <option value={method.id} disabled={method.status !== "supported"}
        >{method.name}</option
      >
    {/each}
  </select>
</div>
