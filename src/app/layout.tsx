'use client'

import { Flex, Box } from "@chakra-ui/react";
import { Navbar } from "@/shared/components/Navbar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Flex minH="100vh" direction="column">
            <Navbar />
            <Box as="main" flex="1">
              {children}
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
