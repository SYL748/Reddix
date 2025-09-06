import { Button, Stack } from "@mui/material";
import type { Order } from "../types/Order";

export default function SortButtons({
    value,
    onChange,
}: {
    value: Order;
    onChange: (o: Order) => void;
}) {
    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant={value === "popularity" ? "contained" : "outlined"}
                onClick={() => onChange("popularity")}
                sx={{ textTransform: "none" }}
            >
                Popularity
            </Button>
            <Button
                variant={value === "newest" ? "contained" : "outlined"}
                onClick={() => onChange("newest")}
                sx={{ textTransform: "none" }}
            >
                Newest
            </Button>
            <Button
                variant={value === "oldest" ? "contained" : "outlined"}
                onClick={() => onChange("oldest")}
                sx={{ textTransform: "none" }}
            >
                Oldest
            </Button>
        </Stack>
    );
}