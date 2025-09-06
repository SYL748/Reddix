import * as React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

type Props = {
    placeholder?: string
}

export default function SearchBar({ placeholder = "Search…" }: Props) {
    const [currInput, setInput] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleSearch = () => {
        if (currInput.trim() === "") return
        navigate(`/search?order=newest&search=${encodeURIComponent(currInput)}`)
        inputRef.current?.blur()
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSearch()
        }
    }

    return (
        <TextField
            fullWidth
            size="small"
            placeholder={placeholder}
            value={currInput}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                width: "100%",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    "&:hover": {
                        backgroundColor: "gray.light",
                    },
                    "&.Mui-focused": {
                        backgroundColor: "#fff",
                    },
                    "&:hover:not(.Mui-focused) fieldset": {
                        borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "primary",
                    },
                }
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="search"
                            edge="start"
                            size="small"
                            onClick={handleSearch}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

