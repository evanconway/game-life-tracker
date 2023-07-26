import { useAppDispatch, useAppSelector } from "../hooks";
import { playerAdd, selectPlayerAllIds } from "../state/playerSlice";

const Options = () => {
    const dispatch = useAppDispatch();
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));

    return <div style={{ padding: "8px" }}>
        <button onClick={() => {
            dispatch(playerAdd({
                name: `Player ${playerIds.length + 1}`,
                score: 40,
                backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                inProgressTransaction: null,
            }))
        }}>Add Player</button>
    </div>;
};

export default Options;