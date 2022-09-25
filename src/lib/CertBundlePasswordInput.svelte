<div>
  <label
    for="certbundlepassword"
    class="block text-sm font-medium text-gray-700"
    >Certificate bundle password</label
  >
  <input
    type="password"
    name="certbundlepassword"
    id="certbundlepassword"
    minlength="1"
    maxlength="200"
    pattern="^[\w|\.-]+$"
    inputmode="text"
    placeholder="my-certificate-bundle-password-here"
    data-lpignore="true"
    required
    class="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
