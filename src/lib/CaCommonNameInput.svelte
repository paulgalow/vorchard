<script lang="ts">
  export let caCommonName: string;
</script>

<div>
  <label for="cacommonname" class="block text-sm font-medium text-gray-700"
    >Server certificate authority common name</label
  >
  <input
    type="text"
    name="cacommonname"
    id="cacommonname"
    minlength="1"
    maxlength="200"
    pattern="^[\w|\.-]+$"
    inputmode="text"
    bind:value={caCommonName}
    placeholder="ca.example.com"
    data-lpignore="true"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
