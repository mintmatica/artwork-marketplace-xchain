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
    address: "0x5e0bC9627466CDBBA3Eb5520651DA129AEaf7883",
    chain: polygon,
    title: "Mini Color Drips",
    thumbnailUrl:
      "https://pantaleone-net.s3.us-west-1.amazonaws.com/photo-t5mfrqgo.png",
    type: "ERC721",
  },
  // {
  //   address: "0x0B11A6E240535e9C1A2e86edd5986CED268C6dba",
  //   chain: polygon,
  //   title: "Gallium Bricks",
  //   thumbnailUrl:
  //     "https://ipfs.io/ipfs/bafybeiferhpauqakzlholexbnf27fipllesicn7ltndi3azhojalobjcym/gallium-triangle.png",
  //   type: "ERC721",
  // },
];
