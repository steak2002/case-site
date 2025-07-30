import { useColorMode, IconButton } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ColorModeToggle() {
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