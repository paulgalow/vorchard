# Vorchard

![License](https://img.shields.io/github/license/paulgalow/vorchard)

Web application to create VPN configuration profiles for iOS, iPadOS and macOS devices

## Questions and Answers

### What is a configuration profile?

> A configuration profile is an XML file (ending in .mobileconfig) that consists of payloads that load settings and authorization information onto Apple devices. Configuration profiles automate the configuration of settings, accounts, restrictions, and credentials. These files can be created by an MDM solution or Apple Configurator, or they can be created manually. – [Apple Documentation](https://support.apple.com/guide/deployment/intro-to-mdm-depc0aadd3fe/web)

### What to do with the downloaded configuration profile?

You can install the profile on your Apple devices using [AirDrop](https://support.apple.com/HT203106). Organizations might prefer to install the profile using their [MDM](https://support.apple.com/guide/deployment/intro-to-mdm-depc0aadd3fe/web) solution.

### Is this safe? How can I trust you?

You can't. However, no data is sent to any server. Everything runs locally in your browser. You can go offline, generate the profile and close the browser tab if you like.

### Why can't I enter a password for my username?

I needed a way to quickly generate lots of passwords. Vorchard automatically generates a long random password for you using the browser's [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto).

### Why add random characters to a username?

This aims to make it harder for an attacker to guess your username.

### Which VPN settings are applied in the profile?

My focus was to set common, secure defaults. For IKEv2 this means AES-256-GCM with SHA2-512 and Diffie Hellmann groups of 31 (Elliptic Curve 25519) for both phases 1 and 2.
