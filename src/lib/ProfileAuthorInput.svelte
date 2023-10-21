<script lang="ts">
  export let author: string;
</script>

<div>
  <label for="author" class="block text-sm font-medium text-gray-700"
    >Profile author</label
  >
  <input
    type="text"
    name="author"
    id="author"
    minlength="1"
    maxlength="100"
    pattern={`^[\\p{L}\\d\\-.?_!\\s]*$`}
    inputmode="text"
    bind:value={author}
    placeholder="Example Company"
    data-lpignore="true"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
