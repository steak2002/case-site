//ForecastTabBar.tsx
// Displays a tab bar for weather forecast options: today, next week (i.e. coming 7 days)
// Ghost buttons for each tab
// Non active tab has opacity 0.5

import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export interface ForecastTabBarProps {
    activeTab: "today" | "next week";
    onTabClick: (tab: "today" | "next week") => void;
}

const ForecastTabBar: React.FC<ForecastTabBarProps> = ({ activeTab, onTabClick }) => {
    return (
        <Flex width={"100%"}>
            <Button
                fontWeight={"extrabold"}
                variant="ghost"
                opacity={activeTab === "today" ? 1 : 0.5}
                onClick={() => onTabClick("today")}
            >
                today
            </Button>
            <Button
                fontWeight={"extrabold"}
                variant="ghost"
                opacity={activeTab === "next week" ? 1 : 0.5}
                onClick={() => onTabClick("next week")}
            >
                next week
            </Button>
        </Flex>
    );
};

export default ForecastTabBar;
