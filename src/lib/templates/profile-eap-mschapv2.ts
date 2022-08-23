import { createUuid } from "../utils/strings";

// prettier-ignore
const renderTemplate = (username: string, authName: string, authPassword: string, server: string, connectionName: string, author: string, id: string) => {
  const ikeV2PayloadUuid = createUuid();

  return `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>PayloadContent</key>
    <array>
      <dict>
        <key>VPNType</key>
        <string>IKEv2</string>
        <key>UserDefinedName</key>
        <string>${connectionName}</string>
        <key>IKEv2</key>
        <dict>
          <key>AuthName</key>
          <string>${authName}</string>
          <key>AuthPassword</key>
          <string>${authPassword}</string>
          <key>AuthenticationMethod</key>
          <string>Certificate</string>
          <key>ChildSecurityAssociationParameters</key>
          <dict>
            <key>DiffieHellmanGroup</key>
            <integer>31</integer>
            <key>EncryptionAlgorithm</key>
            <string>AES-256-GCM</string>
            <key>IntegrityAlgorithm</key>
            <string>SHA2-512</string>
            <key>LifeTimeInMinutes</key>
            <integer>480</integer>
          </dict>
          <key>EnablePFS</key>
          <integer>1</integer>
          <key>EnableCertificateRevocationCheck</key>
          <integer>1</integer>
          <key>ExtendedAuthEnabled</key>
          <integer>1</integer>
          <key>EnforceRoutes</key>
          <integer>0</integer>
          <!-- IncludeAllNetworks: Disable to retain access to local subnets (router, etc.) -->
          <key>IncludeAllNetworks</key>
          <integer>0</integer>
          <key>DisconnectOnIdle</key>
          <integer>0</integer>
          <key>IKESecurityAssociationParameters</key>
          <dict>
            <key>DiffieHellmanGroup</key>
            <integer>31</integer>
            <key>EncryptionAlgorithm</key>
            <string>AES-256-GCM</string>
            <key>IntegrityAlgorithm</key>
            <string>SHA2-512</string>
            <key>LifeTimeInMinutes</key>
            <integer>60</integer>
          </dict>
          <key>RemoteAddress</key>
          <string>${server}</string>
          <key>RemoteIdentifier</key>
          <string>${server}</string>
          <key>LocalIdentifier</key>
          <string>${username}</string>
          <key>UseConfigurationAttributeInternalIPSubnet</key>
          <integer>0</integer>
        </dict>
        <key>PayloadDescription</key>
        <string>Configures VPN settings</string>
        <key>PayloadDisplayName</key>
        <string>VPN</string>
        <key>PayloadIdentifier</key>
        <string>com.apple.vpn.managed.${ikeV2PayloadUuid}</string>
        <key>PayloadType</key>
        <string>com.apple.vpn.managed</string>
        <key>PayloadUUID</key>
        <string>${ikeV2PayloadUuid}</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
      </dict>
    </array>
    <key>PayloadDescription</key>
    <string>VPN access for ${username}</string>
    <key>PayloadDisplayName</key>
    <string>VPN IPsec</string>
    <key>PayloadIdentifier</key>
    <string>${id}.${username}.${createUuid()}</string>
    <key>PayloadOrganization</key>
    <string>${author}</string>
    <key>PayloadRemovalDisallowed</key>
    <false />
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${createUuid()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
  </dict>
</plist>
`.trimStart();
}

export default renderTemplate;
