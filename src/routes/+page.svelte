<script lang="ts">
  import { page } from "$app/stores";
  import { downloadFile } from "$lib/utils/files";
  import { createAuthName, createPassword } from "$lib/utils/strings";
  import Logo from "$lib/Logo.svelte";
  import Footer from "$lib/Footer.svelte";
  import CopyUrlButton from "$lib/CopyUrlButton.svelte";
  import DownloadButton from "$lib/DownloadButton.svelte";
  import ResetButton from "$lib/ResetButton.svelte";
  import renderTemplate from "$lib/templates/profile-eap-mschapv2";

  const SITE_NAME = "Vorchard";
  const SITE_DESCRIPTION =
    "Create VPN configuration profiles for iOS, iPadOS and macOS devices";

  let formEl: HTMLFormElement;
  let authName: string;
  let password: string;

  const appParams = $page.url.searchParams;
  const vpnProtocol = appParams.get("proto") ?? "";
  const authMethod = appParams.get("auth") ?? "";
  const connectionName = appParams.get("name") ?? "";
  const server = appParams.get("server") ?? "";
  const author = appParams.get("author") ?? "";
  const idPrefix = appParams.get("prefix") ?? "";

  function resetForm() {
    formEl.reset();
    authName = "";
    password = "";
  }

  function onSubmit(e: SubmitEvent) {
    const formData = new FormData(<HTMLFormElement>e.target);

    const username = formData.get("username");
    if (username instanceof File || username == null) return;

    const server = formData.get("server");
    if (server instanceof File || server == null) return;

    const connectionName = formData.get("connection-name");
    if (connectionName instanceof File || connectionName == null) return;

    const author = formData.get("author");
    if (author instanceof File || author == null) return;

    const idPrefix = formData.get("prefix");
    if (idPrefix instanceof File || idPrefix == null) return;

    authName = createAuthName(username);
    password = createPassword({});

    const configProfile = renderTemplate(
      username,
      authName,
      password,
      server,
      connectionName,
      author,
      idPrefix
    );

    downloadFile(configProfile, username);
  }
  // async function onSubmit(e: SubmitEvent) {
  //   const formData = new FormData(<HTMLFormElement>e.target);

  //   const username = formData.get("username");
  //   const file = formData.get("file-upload");

  //   if (!username || !file) return;

  //   if (file instanceof File && !(username instanceof File)) {
  //     const certificate = await readFile(file);
  //     const certificateB64 = window.btoa(certificate);
  //     const configProfile = renderTemplate(
  //       username.trim(),
  //       password,
  //       certificateB64
  //     );
  //     downloadFile(configProfile, username);
  //   }

  // }
</script>

<svelte:head>
  <title>{SITE_NAME} | {SITE_DESCRIPTION}</title>
</svelte:head>

<main>
  <div
    class="min-h-screen grid place-items-center bg-gradient-to-r from-orange-400 to-orange-300"
  >
    <div class="w-11/12 max-w-xl py-8">
      <form
        on:submit|preventDefault={onSubmit}
        bind:this={formEl}
        method="post"
      >
        <div class="shadow-md rounded-md overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
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

            <!-- Username -->
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700">Username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                minlength="3"
                maxlength="50"
                pattern="^[a-z|\.]+$"
                inputmode="text"
                data-lpignore="true"
                required
                class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="flex items-center justify-between space-x-7">
              <!-- VPN protocol -->
              <div class="w-1/2">
                <label
                  for="vpn-protocol"
                  class="block text-sm font-medium text-gray-700"
                  >VPN protocol</label
                >
                <select
                  name="vpn-protocol"
                  class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="ikev2">IPSec IKEv2</option>
                  <option value="wireguard" disabled>WireGuard</option>
                </select>
              </div>
              <!-- Authentication method -->
              <div class="w-1/2">
                <label
                  for="auth-method"
                  class="block text-sm font-medium text-gray-700"
                  >Authentication method</label
                >
                <select
                  name="auth-method"
                  id="auth-method"
                  class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="eap-mschapv2">EAP-MSCHAPv2</option>
                  <option value="mutual-rsa" disabled>Mutual RSA</option>
                </select>
              </div>
            </div>

            <!-- Connection Name -->
            <div>
              <label
                for="connection-name"
                class="block text-sm font-medium text-gray-700"
                >Connection name</label
              >
              <input
                type="text"
                name="connection-name"
                id="connection-name"
                minlength="1"
                maxlength="50"
                pattern="^[\p&#123;L&#125;| ]+$"
                inputmode="text"
                value={connectionName}
                data-lpignore="true"
                placeholder="Example Company VPN"
                required
                class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <!-- Server -->
            <div>
              <label
                for="server"
                class="block text-sm font-medium text-gray-700"
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
                value={server}
                data-lpignore="true"
                placeholder="vpn.example.com"
                required
                class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <!-- Profile author -->
            <div>
              <label
                for="author"
                class="block text-sm font-medium text-gray-700"
                >Profile author</label
              >
              <input
                type="text"
                name="author"
                id="author"
                minlength="1"
                maxlength="100"
                pattern="^[\p&#123;L&#125;\d\-.?_!| ]+$"
                inputmode="text"
                value={author}
                placeholder="Example Company"
                data-lpignore="true"
                required
                class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <!-- Profile ID prefix -->
            <div>
              <label
                for="prefix"
                class="block text-sm font-medium text-gray-700"
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
                value={idPrefix}
                placeholder="example.com.config.vpn.ipsec"
                data-lpignore="true"
                required
                class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <!-- Upload PKCS #12 user certificate (.p12) -->
            <!-- <div>
              <label
                for="certificate"
                class="block text-sm font-medium text-gray-700"
              >
                User certificate
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="application/x-pkcs12"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PKCS #12 certificate bundle (.p12)
                  </p>
                </div>
              </div>
            </div> -->

            {#if authName && password}
              <hr />
              <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                <p class="text-base font-normal text-gray-700">
                  Add the following auto-generated credentials to your VPN
                  service:
                </p>
              </div>
              <div class="space-y-2">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-700 mr-auto">
                    Identifier
                  </p>
                  <button
                    on:click={() => navigator.clipboard.writeText(authName)}
                    type="button"
                    class="focus:ring-orange-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-sm"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-orange-700 hover:text-orange-700 hover:scale-105 active:text-orange-300 active:scale-125 transition"
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
                <p class="text-sm font-mono text-orange-700">
                  {authName}
                </p>
              </div>

              <div class="space-y-2">
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-700 mr-auto">
                    Pre-Shared Key
                  </p>
                  <button
                    on:click={() => navigator.clipboard.writeText(password)}
                    type="button"
                    class="focus:ring-orange-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-sm"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-orange-700 hover:text-orange-700 hover:scale-105 active:text-orange-300 active:scale-125 transition"
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

                <p class="text-sm font-mono text-orange-700">
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
            {/if}
          </div>
          <div
            class="flex items-center justify-center space-x-4 px-4 py-4 bg-orange-50 text-right sm:px-6"
          >
            <div class="mr-auto">
              <ResetButton on:resetform={resetForm} />
            </div>
            <CopyUrlButton />
            <DownloadButton />
          </div>
        </div>
      </form>
      <Footer />
    </div>
  </div>
</main>
