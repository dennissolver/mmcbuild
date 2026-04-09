export function StagingBanner() {
  if (process.env.NEXT_PUBLIC_ENV !== "staging") return null;

  return (
    <div className="bg-teal-600 text-white text-center text-sm py-1.5 font-medium z-50 relative">
      Staging environment — not for production use
    </div>
  );
}
