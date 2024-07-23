import type { Chain } from "thirdweb";
import { polygon } from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

/**
 * You need a marketplace contract on each of the chain you want to support
 * Only list one marketplace contract address for each chain
 */
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0x9E030FC60AecEd66D5dc630c315DBABE29902196",
    chain: polygon,
  },
];
