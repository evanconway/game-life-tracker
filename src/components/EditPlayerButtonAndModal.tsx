import { Modal, Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerUpdate, selectPlayerById } from "../state/playerSlice";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";

interface EditPlayerModalProps {
    playerId: EntityId,
}

const EditPlayerButtonAndModal = ({ playerId }: EditPlayerModalProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    const playerName = player === undefined ? "unknown player" : player.name;
    const selectedPlayerScore = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));
    const score = selectedPlayerScore === null ? 0 : selectedPlayerScore;

    const [newSettings, setNewSettings] = useState({
        playerName,
        score,
    });

    const newNameValid = newSettings.playerName !== "";
    const newScoreValid = newSettings.score === Math.floor(newSettings.score);

    return <>
        <Button onClick={() => setOpen(true)} sx={{ alignSelf: "end" }}>Edit</Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={{
                backgroundColor: "#aaa",
                padding: "16px",
                margin: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label><Typography>Player Name: </Typography></label>
                        <input type="text" value={newSettings.playerName} onChange={e => {
                            setNewSettings({ ...newSettings, playerName: e.target.value });
                        }}/>
                    </div>
                    <Typography sx={{ textAlign: "right", color: "#f00", visibility: newNameValid ? "hidden" : "visible" }}>name cannot be empty</Typography>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label><Typography>Player Score: </Typography></label>
                        <input type="number" value={newSettings.score} onChange={e => {
                            setNewSettings({ ...newSettings, score: Number(e.target.value) });
                        }}/>
                    </div>
                    <Typography sx={{ textAlign: "right", color: "#f00", visibility: newScoreValid ? "hidden" : "visible" }}>score must be integer</Typography>
                </div>
                <Button disabled={!(newNameValid && newScoreValid)} sx={{ alignSelf: "end" }} onClick={() => {
                    if (newSettings.score !== score) dispatch(scoreTransactionAdd({
                        playerId,
                        type: "set",
                        value: newSettings.score,
                    }));
                    if (newSettings.playerName !== playerName) dispatch(playerUpdate({
                        id: playerId,
                        changes: { name: newSettings.playerName },
                    }));
                    setOpen(false);
                }}>save and close</Button>
            </div>
        </Modal>
    </>;
};

export default EditPlayerButtonAndModal;
