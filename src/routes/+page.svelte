<script lang="ts">
  import { page } from "$app/stores";
  import { downloadFile, readFile } from "$lib/utils/files";
  import { createAuthName, createPassword } from "$lib/utils/strings";
  import FormHeader from "$lib/FormHeader.svelte";
  import Username from "$lib/UsernameInput.svelte";
  import VpnProtocolOption from "$lib/VpnProtocolOption.svelte";
  import AuthMethodOption from "$lib/AuthMethodOption.svelte";
  import ConnectionName from "$lib/ConnectionNameInput.svelte";
  import ServerHost from "$lib/ServerHostInput.svelte";
  import CaCommonName from "$lib/CaCommonNameInput.svelte";
  import CertBundlePassword from "$lib/CertBundlePasswordInput.svelte";
  import ProfileAuthor from "$lib/ProfileAuthorInput.svelte";
  import ProfileIdPrefix from "$lib/ProfileIdPrefixInput.svelte";
  import UploadFile from "$lib/UploadFileInput.svelte";
  import ResetButton from "$lib/ResetButton.svelte";
  import CopyUrlButton from "$lib/CopyUrlButton.svelte";
  import DownloadButton from "$lib/DownloadButton.svelte";
  import GeneratedCredentials from "$lib/GeneratedCredentials.svelte";
  import Footer from "$lib/Footer.svelte";
  import { renderTemplate as renderTemplateEap } from "$lib/templates/profile-eap-mschapv2";
  import { renderTemplate as renderTemplateMutualRsa } from "$lib/templates/profile-mutual-rsa";

  const SITE_NAME = "Vorchard";
  const SITE_DESCRIPTION =
    "Create VPN configuration profiles for iOS, iPadOS and macOS devices";

  const VPN_PROTOCOLS: VpnProtocol[] = [
    { name: "IPsec IKEv2", id: "ikev2", status: "supported" },
    { name: "WireGuard", id: "wireguard", status: "unsupported" },
  ];

  const AUTH_METHODS: AuthMethod[] = [
    { name: "EAP-MSCHAPv2", id: "eap-mschapv2", status: "supported" },
    { name: "Mutual RSA", id: "mutual-rsa", status: "supported" },
  ];

  let formEl: HTMLFormElement;
  let authName: string;
  let password: string;
  let certBundle: FormDataEntryValue | null;
  let caCert: FormDataEntryValue | null;

  // Initialize form state from query params if present
  const appParams = $page.url.searchParams;
  let selectedVpnProtocol = appParams.get("proto") ?? "ikev2";
  let selectedAuthMethod = appParams.get("auth") ?? "eap-mschapv2";
  let connectionName = appParams.get("name") ?? "";
  let server = appParams.get("server") ?? "";
  let caCommonName = appParams.get("cacommonname") ?? "";
  let author = appParams.get("author") ?? "";
  let idPrefix = appParams.get("prefix") ?? "";

  function resetForm() {
    formEl.reset();
    authName = "";
    password = "";
    selectedVpnProtocol = "ikev2";
    selectedAuthMethod = "eap-mschapv2";
    connectionName = "";
    server = "";
    caCommonName = "";
    author = "";
    idPrefix = "";
    certBundle = null;
    caCert = null;
  }

  function copyUrl() {
    const queryParamEntries = {
      proto: selectedVpnProtocol,
      auth: selectedAuthMethod,
      name: connectionName,
      server,
      cacommonname: caCommonName,
      author,
      prefix: idPrefix,
    };

    // Create new object containing all query params that have a truthy value
    const filteredObject = Object.fromEntries(
      Object.entries(queryParamEntries).filter(([key, value]) => value)
    );
    const params = new URLSearchParams(filteredObject);

    const siteOrigin = $page.url.origin;
    const pathname = $page.url.pathname;
    // URLSearchParams encodes blank spaces with "+", instead of "%20"
    const paramsString = params.toString().replaceAll("+", "%20");
    const urlToShare = `${siteOrigin}${pathname}?${paramsString}`;
    navigator.clipboard.writeText(urlToShare);
  }

  async function onSubmit(e: SubmitEvent) {
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

    switch (selectedVpnProtocol) {
      case "ikev2":
        if (selectedAuthMethod === "eap-mschapv2") {
          authName = createAuthName(username);
          password = createPassword({});

          const configProfile = renderTemplateEap(
            username,
            authName,
            password,
            server,
            connectionName,
            author,
            idPrefix
          );
          downloadFile(configProfile, username);
        } else if (selectedAuthMethod === "mutual-rsa") {
          const caCommonName = formData.get("cacommonname");
          if (caCommonName instanceof File || caCommonName == null) return;

          const certBundlePassword = formData.get("certbundlepassword");
          if (certBundlePassword instanceof File || certBundlePassword == null)
            return;

          certBundle = certBundle ?? formData.get("certbundle");
          caCert = caCert ?? formData.get("cacert");
          if (certBundle instanceof File && caCert instanceof File) {
            const certBundleData = await readFile(certBundle);
            const caCertData = await readFile(caCert);
            const certBundleB64 = window.btoa(certBundleData);
            const caCertB64 = window.btoa(caCertData);

            const configProfile = renderTemplateMutualRsa(
              username,
              certBundlePassword,
              certBundleB64,
              caCertB64,
              server,
              connectionName,
              caCommonName,
              author,
              idPrefix
            );
            downloadFile(configProfile, username);
          }
        }
        break;

      default:
        break;
    }
  }
</script>

<svelte:head>
  <title>{SITE_NAME} | {SITE_DESCRIPTION}</title>
</svelte:head>

<main class="flex justify-center">
  <div class="max-w-xl pt-8">
    <form on:submit|preventDefault={onSubmit} bind:this={formEl} method="post">
      <div class="shadow-md rounded-md overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <FormHeader {SITE_NAME} {SITE_DESCRIPTION} />

          <Username />

          <div class="flex items-center justify-between space-x-2 sm:space-x-7">
            <VpnProtocolOption {VPN_PROTOCOLS} bind:selectedVpnProtocol />
            <AuthMethodOption {AUTH_METHODS} bind:selectedAuthMethod />
          </div>

          <ConnectionName bind:connectionName />
          <ServerHost bind:server />

          {#if selectedAuthMethod === "mutual-rsa"}
            <CaCommonName bind:caCommonName />
            <UploadFile
              title="User certificate"
              name="certbundle"
              mimeType="application/x-pkcs12"
              description="PKCS #12 certificate bundle (.p12)"
              bind:file={certBundle}
            />

            <CertBundlePassword />
            <UploadFile
              title="Certificate authority root certificate"
              name="cacert"
              mimeType="application/x-x509-ca-cert"
              description="Certificate file (.crt)"
              bind:file={caCert}
            />
          {/if}

          <ProfileAuthor bind:author />
          <ProfileIdPrefix bind:idPrefix />

          {#if authName && password}
            <hr />
            <GeneratedCredentials {authName} {password} />
          {/if}
        </div>

        <div
          class="flex items-center justify-center space-x-4 px-4 py-4 bg-orange-50 text-right sm:px-6"
        >
          <div class="mr-auto">
            <ResetButton on:resetform={resetForm} />
          </div>
          <CopyUrlButton on:copyurl={copyUrl} />
          <DownloadButton />
        </div>
      </div>
    </form>
  </div>
</main>

<Footer />
