"use client";
import { MediaRenderer, useReadContract } from "thirdweb/react";
import { getNFT as getNFT721 } from "thirdweb/extensions/erc721";
import { getNFT as getNFT1155 } from "thirdweb/extensions/erc1155";
import { client } from "@/consts/client";
import { Box, Flex, Heading, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { ListingGrid } from "./ListingGrid";
import { AllNftsGrid } from "./AllNftsGrid";

export function Collection() {
  // `0` is Listings, `1` is `Auctions`
  const [tabIndex, setTabIndex] = useState<number>(0);
  const {
    type,
    nftContract,
    isLoading,
    contractMetadata,
    listingsInSelectedCollection,
    supplyInfo,
  } = useMarketplaceContext();

  // In case the collection doesn't have a thumbnail, we use the image of the first NFT
  const { data: firstNFT, isLoading: isLoadingFirstNFT } = useReadContract(
    type === "ERC721" ? getNFT721 : getNFT1155,
    {
      contract: nftContract,
      tokenId: 0n,
      queryOptions: {
        enabled: isLoading || !!contractMetadata?.image,
      },
    }
  );

  const thumbnailImage =
    contractMetadata?.image || firstNFT?.metadata.image || "";
  return (
    <>
      <Box mt="5px">
        <Flex direction="column" gap="2">
          <MediaRenderer
            client={client}
            src={thumbnailImage}
            alt={contractMetadata?.name}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "20px",
              width: "480px",
              height: "320px",
            }}
          />
          <Heading mx="auto" as="h1" size="2xl">
            {contractMetadata?.name || "Loading NFT's..."}
          </Heading>
          {contractMetadata?.description && (
            <Text
              maxW={{ lg: "500px", base: "300px" }}
              mx="auto"
              textAlign="center"
            >
              {contractMetadata.description}
            </Text>
          )}

          <Tabs
            variant="soft-rounded"
            size="lg"
            mx="auto"
            mt="10px"
            mb="5px"
            p="10px"
            onChange={(index) => setTabIndex(index)}
            isLazy
          >
            <TabList>
              <Tab>Listings ({listingsInSelectedCollection.length || 0})</Tab>
              <Tab>
                All items{" "}
                {supplyInfo
                  ? `(${(
                      supplyInfo.endTokenId -
                      supplyInfo.startTokenId +
                      1n
                    ).toString()})`
                  : ""}
              </Tab>
              {/* Support for English Auctions coming soon */}
              {/* <Tab>Auctions ({allAuctions?.length || 0})</Tab> */}
            </TabList>
          </Tabs>
        </Flex>
      </Box>
      <Flex direction="column">
        {tabIndex === 0 && <ListingGrid />}
        {tabIndex === 1 && <AllNftsGrid />}
      </Flex>
    </>
  );
}
