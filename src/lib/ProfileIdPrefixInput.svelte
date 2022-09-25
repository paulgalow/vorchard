<script lang="ts">
  export let idPrefix: string;
</script>

<div>
  <label for="prefix" class="block text-sm font-medium text-gray-700"
    >Profile ID prefix</label
  >
  <input
    type="text"
    name="prefix"
    id="prefix"
    minlength="3"
    maxlength="50"
    pattern="^([a-z0-9\-._~%]+|\[[a-f0-9:.]+\])$"
    inputmode="text"
    bind:value={idPrefix}
    placeholder="example.com.config.vpn.ipsec"
    data-lpignore="true"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
