import {Box, Button, Typography} from "@mui/material";
import type {GameGridSlot} from "../../types/GameGridSlot";

const defaultBgColor = "#2E3A3C";

interface GameGridSlotViewProps {
    slot?: GameGridSlot;
    onClick?: () => void;
}

export default function GameGridSlotView({slot, onClick}: GameGridSlotViewProps) {
    const {text, backgroundColor: slotBgColor, seedText, chipColor, showChip} = slot ?? {};

    const handleSlotClick = () => {
        if (slot) {
            onClick?.();
        }
    }

    const backgroundColor = slotBgColor ?? defaultBgColor;

    return (
        <Button sx={{m: 0, p: 0, color: "#FFF"}} onClick={handleSlotClick}>
            <Box display="flex" position="relative" flexDirection="column"
                 justifyContent={seedText ? "space-between" : "center"} alignItems="center"
                 width={{xs: 75, sm: 90, md: 124}} p={0.5} borderRadius={1.5}
                 sx={{
                     aspectRatio: 1.1,
                     containerType: 'size',
                     overflow: 'hidden',
                 }}
                 border={chipColor === 'gold' ? "3px solid #F2C255" : `3px solid ${backgroundColor}`}
                 bgcolor={backgroundColor ?? defaultBgColor} textAlign="center">
                {showChip && chipColor && (
                    <Box position="absolute" top={0} right={0}>
                        <img src={`/images/chips/${chipColor}-chip.png`} alt={`${chipColor} poker chip`}/>
                    </Box>
                )}
                <Typography fontSize="24cqh" lineHeight="normal" pt={0.5}>{text}</Typography>
                {seedText && (
                    <Box width="90%" bgcolor="#172325" borderRadius={1}
                         boxShadow="1.354px 1.354px 0 0 rgba(0, 0, 0, 0.40);">
                        <Typography fontSize={{xs: 14, sm: 28}} lineHeight={'normal'} pt={0.5}>{seedText}</Typography>
                    </Box>
                )}
            </Box>
        </Button>
    )
}
