function downloadFile(data: string, name: string) {
  // Create blob from data
  const blob = new Blob([data], { type: "octet-stream" });
  const href = URL.createObjectURL(blob);

  // Create link element to trigger download
  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display: none",
    download: name + ".vpn.mobileconfig",
  });

  // Trigger click to download file
  a.click();
  // Revoke URL to purge it from memory
  URL.revokeObjectURL(href);
}

async function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(<string>reader.result);
    reader.onerror = () => reject(new Error("Error reading file"));

    reader.readAsBinaryString(file);
  });
}

export { downloadFile, readFile };
