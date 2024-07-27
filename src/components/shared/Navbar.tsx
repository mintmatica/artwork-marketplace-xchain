"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { blo } from "blo";
import { FaRegMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { Wallet, createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { SideMenu } from "./SideMenu";

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const defaultwallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
  ];
  const { colorMode } = useColorMode();
  return (
    <Box py="30px" px={{ base: "20px", lg: "50px" }}>
      <Flex direction="row" justifyContent="space-between">
        <Box my="auto">
          <Heading my="inherit"
            as={Link}
            href="/"
            _hover={{ textDecoration: "none" }}
            bgGradient="linear(to-l, #80D0C7, #0093E9)"
            bgClip="text"
            size="lg"
            fontWeight="bold"
          >
            {/* Replace this with your own branding */}
            marketplace.pantaleone.net
          </Heading>
          <Heading
            as={Link}
            href="/"
            _hover={{ textDecoration: "none" }}
            size="xs"
            fontWeight="light"
            noOfLines={4}
          >
            {/* Replace this with your own branding */}
            The latest AI tools, agents, automation scripts and NFT artwork.
          </Heading>
        </Box>
        <Box display={{ lg: "block", base: "none" }}>
          <ToggleThemeButton />
          {account && wallet ? (
            <ProfileButton address={account.address} wallet={wallet} />
          ) : (
            <ConnectButton
              autoConnect={{ timeout: 15000 }} 
              client={client}
              theme={colorMode}
              connectButton={{ label: "Sign In", style: { height: "56px" }, }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false
              }}
              showAllWallets= {false}
              wallets= {defaultwallets}
            />
          )}
        </Box>
        <SideMenu />
      </Flex>
    </Box>
  );
}

function ProfileButton({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) {
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const { colorMode } = useColorMode();
  const defaultwallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
  ];

  return (
    <Menu>
      <MenuButton as={Button} height="56px">
        <Flex direction="row" gap="5">
          <Box my="auto">
            <FiUser size={30} />
          </Box>
          <Image
            src={ensAvatar ?? blo(address as `0x${string}`)}
            height="40px"
            rounded="8px"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem display="flex">
          <Box mx="auto">
            <ConnectButton
              autoConnect={{ timeout: 15000 }} 
              client={client}
              theme={colorMode}
              connectButton={{ label: "Sign In", style: { height: "56px" }, }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false
              }}
              showAllWallets= {false}
              wallets= {defaultwallets}
            />
          </Box>
        </MenuItem>
        <MenuItem as={Link} href="/profile" _hover={{ textDecoration: "none" }}>
          View Profile {ensName ? `(${ensName})` : ""}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (wallet) disconnect(wallet);
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
      {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
    </Button>
  );
}
