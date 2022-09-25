<script lang="ts">
  export let authName: string;
  export let password: string;
</script>

<div class="col-span-6 sm:col-span-6 lg:col-span-2">
  <p class="text-base font-normal text-gray-700">
    Add the following auto-generated credentials to your VPN service:
  </p>
</div>
<div class="space-y-2">
  <div class="flex items-center">
    <p class="text-sm font-medium text-gray-700 mr-auto">Identifier</p>
    <button
      on:click={() => navigator.clipboard.writeText(authName)}
      type="button"
      title="Copy identifier to clipboard"
      class="focus:ring-orange-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-sm"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mb-1 text-orange-700 hover:text-orange-700 hover:scale-105 active:text-orange-300 active:scale-125 transition"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  </div>
  <p
    class="max-w-xs sm:max-w-lg text-sm font-mono text-orange-700 leading-normal break-words"
  >
    {authName}
  </p>
</div>

<div class="space-y-2">
  <div class="flex items-center">
    <p class="text-sm font-medium text-gray-700 mr-auto">Pre-Shared Key</p>
    <button
      on:click={() => navigator.clipboard.writeText(password)}
      type="button"
      title="Copy pre-shared key to clipboard"
      class="focus:ring-orange-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-sm"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mb-1 text-orange-700 hover:text-orange-700 hover:scale-105 active:text-orange-300 active:scale-125 transition"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  </div>

  <p
    class="max-w-xs sm:max-w-lg text-sm font-mono text-orange-700 leading-normal break-words"
  >
    {password}
  </p>
</div>

<!-- Type -->
<div class="space-y-2">
  <div class="flex items-center">
    <p class="text-sm font-medium text-gray-700 mr-auto">Type</p>
  </div>
  <p class="text-sm font-mono text-orange-700">EAP</p>
</div>
