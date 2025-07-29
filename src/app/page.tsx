'use client'

import Image from "next/image";
import {
  Box,
  VStack,
  HStack,
  Button,
  Link,
  Text,
  Code,
  Flex,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      alignSelf="flex-end"
      mt={2}
    />
  );
}

export default function Home() {
  return (
    <Flex minH="100vh" direction="column" justify="space-between" align="center" py={8} px={4}>
      <VStack as="main" spacing={8} w="full" maxW="lg" align="center">
        <ColorModeToggle />
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <VStack as="ol" spacing={2} align="start" w="full">
          <Text as="li">
            Get started by editing <Code>src/app/page.tsx</Code>.
          </Text>
          <Text as="li">Save and see your changes instantly.</Text>
        </VStack>
        <Button colorScheme="teal" size="lg" mt={4}>
          Chakra Button
        </Button>
        <HStack spacing={4} pt={4}>
          <Link
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            isExternal
            display="flex"
            alignItems="center"
            px={4}
            py={2}
            bg="teal.500"
            color="white"
            borderRadius="md"
            _hover={{ bg: "teal.600" }}
            fontWeight="bold"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              style={{ marginRight: 8 }}
            />
            Deploy now
          </Link>
          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            isExternal
            px={4}
            py={2}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.50" }}
            fontWeight="bold"
          >
            Read our docs
          </Link>
        </HStack>
      </VStack>
      <HStack as="footer" spacing={8} pt={8} pb={4}>
        <Link
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          isExternal
          display="flex"
          alignItems="center"
          fontWeight="medium"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            style={{ marginRight: 6 }}
          />
          Learn
        </Link>
        <Link
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          isExternal
          display="flex"
          alignItems="center"
          fontWeight="medium"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            style={{ marginRight: 6 }}
          />
          Examples
        </Link>
        <Link
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          isExternal
          display="flex"
          alignItems="center"
          fontWeight="medium"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            style={{ marginRight: 6 }}
          />
          Go to nextjs.org →
        </Link>
      </HStack>
    </Flex>
  );
}
