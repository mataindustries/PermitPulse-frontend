export default function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid #2e3a46",
          borderTopColor: "#4e9bff",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin {to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
