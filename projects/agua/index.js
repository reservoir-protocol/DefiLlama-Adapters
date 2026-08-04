// Agua issues ERC4626 carry vaults. Each vault is listed here as its own pool;
// DefiLlama sums them into the combined Agua TVL. To add a new vault, append its
// address to the relevant chain array and it will show up alongside the rest.
const vaults = {
  ethereum: [
    '0xa98b4a70e17e55045cde4972b95bc2e8cec22a0f', // aguaUSDCgc - Agua Global Carry Vault (USDC)
  ],
}

// erc4626Sum reads asset()/totalAssets() on each vault and books the value under
// the underlying stablecoin (which DefiLlama prices), not the share token.
Object.keys(vaults).forEach(chain => {
  module.exports[chain] = {
    tvl: async (api) => api.erc4626Sum({ calls: vaults[chain], isOG4626: true }),
  }
})

module.exports.methodology =
  'TVL is the total assets deposited across Agua carry vaults (ERC4626), counted as the underlying stablecoin.'
