import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import { toEther } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

export default function RelatedListings({
  excludedListingId,
}: {
  excludedListingId: bigint;
}) {
  const { nftContract, allValidListings } = useMarketplaceContext();
  const listings = allValidListings?.filter(
    (o) =>
      o.id !== excludedListingId &&
      o.assetContractAddress.toLowerCase() === nftContract.address.toLowerCase()
  );
  if (!listings || !listings.length) return <></>;
  return (
    <AccordionItem>
      <Text>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
          <Heading as='h3' size='sm' noOfLines={1}> 
            More from this NFT collection
          </Heading>  
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>
        <Box
          display="flex"
          overflowX="auto"
          whiteSpace="nowrap"
          padding="4"
          width="100%"
          gap="15px"
        >
          {listings?.map((item) => (
            <Box
              key={item.id.toString()}
              rounded="12px"
              as={Link}
              href={`/collection/${nftContract.chain.id}/${
                nftContract.address
              }/token/${item.asset.id.toString()}`}
              _hover={{ textDecoration: "none" }}
              minW={250}
            >
              <Flex direction="column">
                <MediaRenderer
                  client={client}
                  src={item.asset.metadata.image}
                />
                <Text as="b" fontSize="lg" mt="4px">{item.asset.metadata?.name ?? "Unknown item"}</Text>
                <Text fontSize="sm" mt="5px">Price</Text>
                <Text as="b" fontSize="sm">
                  {toEther(item.pricePerToken)}{" "}
                  {item.currencyValuePerToken.symbol}
                </Text>
              </Flex>
            </Box>
          ))}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}
