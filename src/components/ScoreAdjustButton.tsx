import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { scoreTransactionInProgressSet, selectScoreTransactionInProgressByPlayerId } from "../state/scoreTransactionInProgressSlice";
import { Orientation, restartCSSAnimationOnElementById } from "../utilsAndConstants";

interface ScoreAdjustButtonProps {
    playerId: EntityId,
    type: "increment" | "decrement",
    orientation: Orientation,
}

const ScoreAdjustButton = ({ playerId, type, orientation }: ScoreAdjustButtonProps) => {
    const dispatch = useAppDispatch();
    const selectedInProgressTransaction = useAppSelector(s => selectScoreTransactionInProgressByPlayerId(s, playerId))?.scoreTransaction;
    const inProgressTransaction = selectedInProgressTransaction !== null && selectedInProgressTransaction !== undefined ? selectedInProgressTransaction : null;
    const value = type === "increment" ? 1 : -1;
    const id = `playerid-${playerId}-score-${type}-button`;

    return <button
        id={id}
        className="player-score-adjust-button"
        style={{
            margin: 0,
            padding: 0,
            position: "absolute",
            opacity: 0,
            cursor: "pointer",
            backgroundColor: "#fff",
            width: orientation === "row" ? "100%" : "50%",
            height: orientation === "row" ? "50%" : "100%",
            left: orientation === "row" ? "0%" : type === "increment" ? "50%" : "0%",
            top: orientation === "row" ? type === "increment" ? "0%" : "50%" : "0%",
        }}
        onClick={() => {
            restartCSSAnimationOnElementById(id, "1s pulse");
            dispatch(scoreTransactionInProgressSet({
                playerId,
                scoreTransaction: {
                    type: "change",
                    value: inProgressTransaction === null ? value : inProgressTransaction.value + value,
                }
            }));
        }}
    />;
};

export default ScoreAdjustButton;
