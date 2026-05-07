export function Logo({ className }: { className?: string }) {
  return (
    <div className={`logo-mark select-none leading-none ${className ?? ""}`} aria-label="Mr. Fapc">
      <div className="logo-mister">MISTER</div>
      <div className="logo-fapc">FAPC</div>
    </div>
  );
}
