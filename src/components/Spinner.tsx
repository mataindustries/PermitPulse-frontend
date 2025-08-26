export default function Spinner({ size = 16 }: { size?: number }) {
  const s = size;
  const stroke = Math.max(2, Math.floor(size / 8));
  return (
    <svg
      width={s} height={s} viewBox="0 0 50 50" role="img" aria-label="loading"
      style={{ display:'inline-block', verticalAlign:'middle' }}
    >
      <circle
        cx="25" cy="25" r="20"
        fill="none" stroke="#2e3846" strokeWidth={stroke}
        opacity="0.4"
      />
      <path
        d="M25 5 a20 20 0 0 1 0 40"
        fill="none" stroke="#8ab4ff" strokeWidth={stroke} strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
