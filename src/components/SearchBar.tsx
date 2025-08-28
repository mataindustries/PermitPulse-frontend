export default function SearchBar({
  value,
  onChange,
  placeholder = "Search address, status, permit…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        flex: 1,
        minWidth: 160,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #1f2732",
        background: "#0b1118",
        color: "#e9f0ff",
      }}
    />
  );
}
