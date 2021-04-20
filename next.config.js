module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_URL: process.env.NEXT_PUBLIC_BACKEND_URL
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.NEXT_PUBLIC_API_URL
  },
}
