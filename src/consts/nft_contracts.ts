import type { Chain } from "thirdweb";
import { polygon } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0xAd55d0b5043B7b88321bA8542051C90c86A1553E",
    chain: polygon,
    title: "Ceramic Color Drips",
    thumbnailUrl:
      "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeicqeuohkmkxkfppm25x4dllievly3orupqzodzjg5rbf2n2zcvtbi/ceramic-color-ribbons.png",
    type: "ERC721",
  },
  {
    address: "0x0B11A6E240535e9C1A2e86edd5986CED268C6dba",
    chain: polygon,
    title: "Gallium Bricks",
    thumbnailUrl:
      "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeiferhpauqakzlholexbnf27fipllesicn7ltndi3azhojalobjcym/gallium-triangle.png",
    type: "ERC721",
  },
];
