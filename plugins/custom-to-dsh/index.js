// custom-to-dsh — host half. Pure client-side skinning plugin: all styling,
// DOM patches, and settings live in client.js, so the host side only registers
// the plugin identity cleanly.

const name = "custom-to-dsh";

function apply() {
  // Nothing happens on the host side.
}

export default { name, apply };
