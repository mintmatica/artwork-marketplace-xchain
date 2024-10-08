import { client } from "@/consts/client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { balanceOf, getNFT as getERC1155 } from "thirdweb/extensions/erc1155";
import { getNFT as getERC721 } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { NftAttributes } from "./NftAttributes";
import { CreateListing } from "./CreateListing";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import dynamic from "next/dynamic";
import { NftDetails } from "./NftDetails";
import RelatedListings from "./RelatedListings";

const CancelListingButton = dynamic(() => import("./CancelListingButton"), {
  ssr: false,
});
const BuyFromListingButton = dynamic(() => import("./BuyFromListingButton"), {
  ssr: false,
});

type Props = {
  tokenId: bigint;
};

export function Token(props: Props) {
  const {
    type,
    nftContract,
    allAuctions,
    isLoading,
    contractMetadata,
    isRefetchingAllListings,
    listingsInSelectedCollection,
  } = useMarketplaceContext();
  const { tokenId } = props;
  const account = useActiveAccount();

  const { data: nft, isLoading: isLoadingNFT } = useReadContract(
    type === "ERC1155" ? getERC1155 : getERC721,
    {
      tokenId: BigInt(tokenId),
      contract: nftContract,
      includeOwner: true,
    }
  );

  const { data: ownedQuantity1155 } = useReadContract(balanceOf, {
    contract: nftContract,
    owner: account?.address!,
    tokenId: tokenId,
    queryOptions: {
      enabled: !!account?.address && type === "ERC1155",
    },
  });

  const listings = (listingsInSelectedCollection || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
        nftContract.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );

  const auctions = (allAuctions || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
        nftContract.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );

  const allLoaded = !isLoadingNFT && !isLoading && !isRefetchingAllListings;

  const ownedByYou =
    nft?.owner?.toLowerCase() === account?.address.toLowerCase();

  return (
    <Flex direction="column">
      <Box mt="24px" mx="auto">
        <Flex
          direction={{ lg: "row", base: "column" }}
          justifyContent={{ lg: "center", base: "space-between" }}
          gap={{ lg: 20, base: 5 }}
        >
          <Flex direction="column" w={{ lg: "45vw", base: "90vw" }} gap="5">
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              style={{ width: "max-content", height: "auto"}}
            />

            <Accordion allowMultiple allowToggle defaultIndex={[0, 1, 2]}>
              {nft?.metadata.description && (
                
                <AccordionItem>
                  <Text>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                      <Heading as='h3' size='md' noOfLines={1}>{nft.metadata.name} </Heading> 
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={4}>
                    <Text pb={4}>{nft.metadata.description}</Text>
                    {listings.length > 0 ? (
                    <TableContainer>
                      <Table
                       
                        size="sm"
                        variant="simple"
                        overflow="auto"
                        sx={{ "th, td": { borderBottom: "none" } }}
                      >
                        <Thead>
                          <Tr>
                            <Th>Price</Th>
                            {type === "ERC1155" && <Th>Qty</Th>}
                            <Th>{""}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {listings.map((item) => {
                            const listedByYou =
                              item.creatorAddress.toLowerCase() ===
                              account?.address.toLowerCase();
                            return (
                              <Tr key={item.id.toString()}>
                                <Td>
                                  <Text>
                                    {item.currencyValuePerToken.displayValue}{" "}
                                    {item.currencyValuePerToken.symbol}
                                  </Text>
                                </Td>
                                {type === "ERC1155" && (
                                  <Td>
                                    <Text>{item.quantity.toString()}</Text>
                                  </Td>
                                )}

                                {account && (
                                  <Td>
                                    {!listedByYou ? (
                                      <BuyFromListingButton
                                        account={account}
                                        listing={item}
                                      />
                                    ) : (
                                      <CancelListingButton
                                        account={account}
                                        listingId={item.id}
                                      />
                                    )}
                                  </Td>
                                )}
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text>This item is not listed for sale</Text>
                  )}
                  </AccordionPanel>
                </AccordionItem>
              )}
            
              {nft?.metadata?.attributes &&
                // @ts-ignore TODO FIx later
                nft?.metadata?.attributes.length > 0 && (
                  <NftAttributes attributes={nft.metadata.attributes} />
                )}
              {nft && <NftDetails nft={nft} />}
            </Accordion>
          </Flex>
          <Box w={{ lg: "45vw", base: "90vw" }}>
            <Accordion
              sx={{ container: {} }}
              defaultIndex={[0, 1]}
              allowMultiple
            >
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                    <Heading as='h3' size='md' noOfLines={1}>
                      Listings ({listings.length})
                    </Heading>  
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  {listings.length > 0 ? (
                    <TableContainer>
                      <Table
                        size="sm"
                        variant="simple"
                        overflow="auto"
                        sx={{ "th, td": { borderBottom: "none" } }}
                      >
                        <Thead>
                          <Tr>
                            <Th>Price</Th>
                            {type === "ERC1155" && <Th px={1}>Qty</Th>}
                            <Th>Expiration</Th>
                            <Th px={1}>From</Th>
                            <Th>{""}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {listings.map((item) => {
                            const listedByYou =
                              item.creatorAddress.toLowerCase() ===
                              account?.address.toLowerCase();
                            return (
                              <Tr key={item.id.toString()}>
                                <Td>
                                  <Text>
                                    {item.currencyValuePerToken.displayValue}{" "}
                                    {item.currencyValuePerToken.symbol}
                                  </Text>
                                </Td>
                                {type === "ERC1155" && (
                                  <Td px={1}>
                                    <Text>{item.quantity.toString()}</Text>
                                  </Td>
                                )}
                                <Td>
                                  <Text>
                                    {getExpiration(item.endTimeInSeconds)}
                                  </Text>
                                </Td>
                                <Td px={1}>
                                  <Text>
                                    {item.creatorAddress.toLowerCase() ===
                                    account?.address.toLowerCase()
                                      ? "You"
                                      : shortenAddress(item.creatorAddress)}
                                  </Text>
                                </Td>
                                {account && (
                                  <Td>
                                    {!listedByYou ? (
                                      <BuyFromListingButton
                                        account={account}
                                        listing={item}
                                      />
                                    ) : (
                                      <CancelListingButton
                                        account={account}
                                        listingId={item.id}
                                      />
                                    )}
                                  </Td>
                                )}
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text>This item is not listed for sale</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>

              <RelatedListings excludedListingId={listings[0]?.id ?? -1n} />
            </Accordion>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

function getExpiration(endTimeInSeconds: bigint) {
  // Get the current date and time
  const currentDate = new Date();

  // Convert seconds to milliseconds (bigint)
  const milliseconds: bigint = endTimeInSeconds * 1000n;

  // Calculate the future date by adding milliseconds to the current date
  const futureDate = new Date(currentDate.getTime() + Number(milliseconds));

  // Format the future date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
