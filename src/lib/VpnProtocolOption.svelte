<script lang="ts">
  export let VPN_PROTOCOLS: VpnProtocol[];
  export let selectedVpnProtocol: string;
</script>

<div class="w-1/2">
  <label
    for="vpn-protocol"
    class="block text-sm font-medium text-gray-700 truncate">VPN protocol</label
  >
  <select
    name="vpn-protocol"
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  >
    {#each VPN_PROTOCOLS as protocol}
      {@const isSelectedAndSupported =
        protocol.id === selectedVpnProtocol && protocol.status === "supported"}
      <option
        value={protocol.id}
        selected={isSelectedAndSupported}
        disabled={protocol.status !== "supported"}>{protocol.name}</option
      >
    {/each}
  </select>
</div>
