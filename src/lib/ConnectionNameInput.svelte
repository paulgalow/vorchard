<script lang="ts">
  export let connectionName: string;
</script>

<div>
  <label for="connection-name" class="block text-sm font-medium text-gray-700"
    >Connection name</label
  >
  <input
    type="text"
    name="connection-name"
    id="connection-name"
    minlength="1"
    maxlength="50"
    pattern="^[\p&lbrace;L&rbrace;\s]*$"
    inputmode="text"
    bind:value={connectionName}
    data-lpignore="true"
    placeholder="Example Company VPN"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
