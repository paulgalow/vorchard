<!-- Upload PKCS #12 user certificate (.p12) -->
<script lang="ts">
  export let title: string;
  export let name: string;
  export let mimeType: string;
  export let description: string;
  export let file: FormDataEntryValue | null;

  $: highlight = false;
  $: required = true;

  let dropZone: HTMLDivElement;

  function handleDragOver(e: DragEvent) {
    highlight = true;
    if (!e.dataTransfer) return;
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e: DragEvent) {
    highlight = false;
    if (!e.dataTransfer) return;
    const files = e.dataTransfer?.files;
    handleFiles(files);
  }

  function handleFiles(files: FileList) {
    if (mimeType !== files[0]?.type) {
      // TODO: Replace alert with toast
      alert("Wrong file type. Please try again");
      return;
    }
    file = files[0];
    required = false;

    const fileReceivedDisplay = document.createElement("div");
    fileReceivedDisplay.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mx-auto h-9 w-9 mb-2 text-green-700"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
      />
    </svg>
    <p class="text-sm text-gray-500">File received</p>`;
    dropZone.replaceChildren(fileReceivedDisplay);
  }
</script>

<div>
  <label for="certificate" class="block text-sm font-medium text-gray-700">
    {title}
  </label>
  <div
    on:dragenter|preventDefault|stopPropagation={() => (highlight = true)}
    on:dragover|preventDefault|stopPropagation={handleDragOver}
    on:dragleave|preventDefault|stopPropagation={() => (highlight = false)}
    on:drop|preventDefault|stopPropagation={handleDrop}
    bind:this={dropZone}
    class="mt-1 flex justify-center {highlight &&
      `border-orange-600 bg-orange-50`} px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
  >
    <div class="space-y-1 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-9 w-9 mb-2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>

      <div class="flex text-sm text-gray-600">
        <label
          for={name}
          class="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
        >
          <span>Upload a file</span>
          <input
            id={name}
            {name}
            type="file"
            accept={mimeType}
            class="sr-only"
            {required}
          />
        </label>
        <p class="pl-1">or drag and drop</p>
      </div>
      <p class="text-xs text-gray-500">{description}</p>
    </div>
  </div>
</div>
