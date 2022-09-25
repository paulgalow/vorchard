<script lang="ts">
  export let server: string;
</script>

<div>
  <label for="server" class="block text-sm font-medium text-gray-700"
    >Server host</label
  >
  <input
    type="text"
    name="server"
    id="server"
    minlength="3"
    maxlength="50"
    pattern="^([a-z0-9\-._~%]+|\[[a-f0-9:.]+\])$"
    inputmode="text"
    bind:value={server}
    data-lpignore="true"
    placeholder="vpn.example.com"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
