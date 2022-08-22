<script lang="ts">
  export let SITE_NAME: string;
  export let SITE_DESCRIPTION: string;
  import Logo from "$lib/Logo.svelte";
</script>

<div>
  <div class="inline-flex justify-center items-center pt-1">
    <Logo className="block h-10 w-10 mr-3" />
    <h1 class="font-semibold text-3xl text-green-700">
      {SITE_NAME}
    </h1>
  </div>
  <p class="font-normal text-base text-green-900 mt-1">
    {SITE_DESCRIPTION}
  </p>
</div>
