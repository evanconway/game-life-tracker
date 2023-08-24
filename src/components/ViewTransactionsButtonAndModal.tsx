import { Dialog } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { selectScoreTransactionsByPlayerIds } from "../state/scoreTransactionSlice";
import ScoreTransaction from "./ScoreTransaction";
import { DialogPaperSX } from "../utilsAndConstants";

interface ViewTransactionsButtonAndModalProps {
    playerIds: EntityId[],
    buttonText: string,
}

const ViewTransactionsButtonAndModal = ({ playerIds, buttonText }: ViewTransactionsButtonAndModalProps) => {
    const [open, setOpen] = useState(false);
    const transactions = useAppSelector(s => selectScoreTransactionsByPlayerIds(s, playerIds));

    return <div>
        <Button onClick={() => setOpen(true)}>{buttonText}</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <div style={{
                overflowY: "auto",
                padding: "0 8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}>
                {transactions.map(t => t === undefined ? null : <ScoreTransaction transactionId={t.id}/>)}
            </div>
            <Button
                sx={{ alignSelf: "end" }}
                onClick={() => setOpen(false)}
            >close</Button>
        </Dialog>
    </div>;
};

export default ViewTransactionsButtonAndModal;
