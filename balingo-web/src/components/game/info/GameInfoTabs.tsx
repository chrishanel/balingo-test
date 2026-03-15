import {Box, Tab, Tabs, Typography} from "@mui/material";
import {type ReactNode, type SyntheticEvent, useState} from "react";

function GameInfoTabText({text, isItalic}: { text: string, isItalic?: boolean }) {
    return (
        <Typography variant="body1" fontStyle={isItalic ? "italic" : "normal"}>{text}</Typography>
    )
}

export default function GameInfoTabs() {
    const [selectedTab, setSelectedTab] = useState(0)

    const getTabContents = (index: number): ReactNode => {
        switch (index) {
            case 0:
                return (
                    <ol>
                        <li>
                            <GameInfoTabText
                                text="Capture objectives to make a row, column, or diagonal line of 5 objectives"/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="If your opponent performs the same objective at a higher stake, they steal it"/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="If you make a line and any objective isn’t gold stake, your opponent has 5 minutes to
                            disrupt it"/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="Once all 25 squares are captured, if no line is formed, lockout rules take effect (also with
                            a 5 minute timer)"/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="If more than half the board is claimed and no objective is claimed or stolen for 15 minutes,
                            the game goes to sudden death - next objective wins"/>
                        </li>
                    </ol>
                )
            case 1:
                return (
                    <span>Info about the controls will be in here.</span>
                )
            case 2:
                return (
                    <ul>
                        <li>
                            <GameInfoTabText
                                text="Balingo is a WIP prototype designed by Chris Hanel, inspired by many iterations of Bingo
                            across the speedrunning community. If all goes well, the intention is to make this a proper
                            Balatro Mod with auto-tracking and more features that are both player-friendly and a better
                            viewing experience for spectators."/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="Developer: Michael Fazio"/>
                        </li>
                        <li>
                            <GameInfoTabText
                                text="Special Thanks: Ben Pelc, Zac Gallen, and definitely *not* Pablo Lopez's UCL."/>
                        </li>
                    </ul>
                )
        }
    }

    const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
        setSelectedTab(newIndex)
    }

    return (
        <Box>
            <Box>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Rules"/>
                    <Tab label="Controls"/>
                    <Tab label="About"/>
                </Tabs>
            </Box>
            <Box textAlign="left" mt={1} p={1} width="100%" maxWidth={800}>
                {getTabContents(selectedTab)}
            </Box>
        </Box>
    )
}

