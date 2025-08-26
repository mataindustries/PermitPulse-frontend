export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size, height: size,
        border: '2px solid #2e3846',
        borderTopColor: '#8ab4ff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}
    />
  );
}
